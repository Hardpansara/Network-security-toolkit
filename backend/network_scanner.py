
import time
import nmap
import socket
import sqlite3
import subprocess
from flask import Flask, jsonify, render_template, send_from_directory, request, send_file
from datetime import datetime
import requests
import asyncio
import platform
import re
import aiohttp
import nest_asyncio
import os
import json
import csv
import io

# Apply nest_asyncio to fix event loop issues
nest_asyncio.apply()

app = Flask(__name__)

# Add CORS support
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response

# Streaming-related ports
STREAMING_PORTS = {554: "RTSP", 1935: "RTMP", 8080: "HTTP-Alt", 8000: "HTTP-Alt", 
                   443: "HTTPS", 80: "HTTP", 3478: "STUN", 5349: "TURN", 
                   5000: "AirPlay", 5060: "SIP", 5061: "SIP-TLS", 16384: "RTP", 
                   32767: "RTP", 1900: "UPnP", 2869: "DLNA"}

# General ports for scanning
GENERAL_PORTS = "20,21,22,23,25,80,139,443,445,554,587,8000,8080,8888"

# Store scan history (you might want to use a database in production)
scan_history = []

def create_db():
    conn = sqlite3.connect('network_devices.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS devices
                 (ip TEXT, mac TEXT, hostname TEXT, first_seen TEXT, last_seen TEXT,
                 PRIMARY KEY (mac))''')
    c.execute('''CREATE TABLE IF NOT EXISTS scans
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  timestamp TEXT,
                  devices_count INTEGER,
                  open_ports_count INTEGER)''')
    conn.commit()
    conn.close()

def add_device_to_db(ip, mac, hostname):
    conn = sqlite3.connect('network_devices.db')
    c = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute('''INSERT INTO devices (ip, mac, hostname, first_seen, last_seen)
                 VALUES (?, ?, ?, ?, ?)
                 ON CONFLICT(mac) DO UPDATE SET last_seen=?''', 
              (ip, mac, hostname, now, now, now))
    conn.commit()
    conn.close()

def view_devices():
    conn = sqlite3.connect('network_devices.db')
    c = conn.cursor()
    c.execute('SELECT * FROM devices')
    rows = c.fetchall()
    conn.close()
    return [{"ip": row[0], "mac": row[1], "hostname": row[2], 
             "first_seen": row[3], "last_seen": row[4]} for row in rows]

def fast_network_scan(ip_range):
    scanner = nmap.PortScanner()
    scanner.scan(hosts=ip_range, arguments='-sn --host-timeout 30s')
    return scanner.all_hosts()

def scan_ports(ips, ports):
    scanner = nmap.PortScanner()
    scanner.scan(hosts=" ".join(ips), arguments=f"-T4 -p {ports} --open --host-timeout 30s")
    port_results = {}
    for ip in scanner.all_hosts():
        open_ports = []
        for port in scanner[ip]['tcp'].keys():
            if scanner[ip]['tcp'][port]['state'] == 'open':
                service_name = STREAMING_PORTS.get(port, scanner[ip]['tcp'][port].get('name', 'Unknown'))
                open_ports.append({"port": port, "service": service_name})
        port_results[ip] = open_ports if open_ports else []
    return port_results

async def get_mac_from_arp(ip):
    try:
        proc = await asyncio.create_subprocess_shell(
            "arp -a",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        arp_table = {}
        for line in stdout.decode().splitlines():
            match = re.search(r"(\d+\.\d+\.\d+\.\d+)\s+([0-9a-fA-F:-]{17})", line)
            if match:
                arp_ip, mac = match.groups()
                arp_table[arp_ip] = mac.replace('-', ':').upper()
        
        if ip in arp_table:
            return arp_table[ip]

        ping_cmd = f"ping -n 1 {ip}" if platform.system() == "Windows" else f"ping -c 1 {ip}"
        await asyncio.create_subprocess_shell(
            ping_cmd,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        await asyncio.sleep(2)

        proc = await asyncio.create_subprocess_shell(
            "arp -a",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        for line in stdout.decode().splitlines():
            match = re.search(r"(\d+\.\d+\.\d+\.\d+)\s+([0-9a-fA-F:-]{17})", line)
            if match:
                arp_ip, mac = match.groups()
                if arp_ip == ip:
                    return mac.replace('-', ':').upper()
        return "N/A"
    except Exception as e:
        print(f"MAC lookup error: {e}")
        return "N/A"

async def get_mac_manufacturer(mac):
    if mac in ("N/A", "00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF"):
        return "Unknown"
    
    try:
        formatted_mac = mac.replace(":", "").replace("-", "").upper()
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"https://api.macvendors.com/{formatted_mac}",
                timeout=aiohttp.ClientTimeout(total=3)
            ) as response:
                return (await response.text()).strip() if response.status == 200 else "Unknown"
    except Exception as e:
        print(f"Manufacturer lookup error: {e}")
        return "Unknown"

async def get_hostname(ip):
    try:
        loop = asyncio.get_event_loop()
        try:
            hostname = await loop.run_in_executor(
                None, 
                lambda: socket.gethostbyaddr(ip)[0].split('.')[0]
            )
            if hostname: return hostname
        except (socket.herror, socket.gaierror):
            pass

        scanner = nmap.PortScanner()
        await loop.run_in_executor(
            None,
            lambda: scanner.scan(ip, arguments='-sn --host-timeout 15s')
        )
        if ip in scanner.all_hosts():
            return scanner[ip].hostname() or "Unknown"
        
        if platform.system() == "Windows":
            proc = await asyncio.create_subprocess_shell(
                f'nbtstat -A {ip}',
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, _ = await proc.communicate()
            match = re.search(r"<00>\s+UNIQUE\s+([^\s]+)", stdout.decode())
            if match: return match.group(1)
        
        return "Unknown"
    except Exception as e:
        print(f"Hostname error: {e}")
        return "Unknown"

def get_bssid():
    try:
        if platform.system() == "Windows":
            result = subprocess.run(
                ["netsh", "wlan", "show", "interfaces"], 
                capture_output=True, 
                text=True, 
                shell=True
            )
            for line in result.stdout.split('\n'):
                if "BSSID" in line:
                    parts = line.split(':', 1)
                    if len(parts) > 1:
                        return parts[1].strip().upper()
        else:
            result = subprocess.run(
                ["iwconfig"], 
                capture_output=True, 
                text=True
            )
            for line in result.stdout.split('\n'):
                if "Access Point" in line:
                    ap_part = line.split("Access Point: ")[1]
                    return ap_part.split()[0].strip().upper()
        return "Unknown"
    except Exception as e:
        print(f"BSSID error: {e}")
        return "Unknown"

def get_local_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(('8.8.8.8', 80))
            return s.getsockname()[0]
    except Exception as e:
        print(f"Local IP error: {e}")
        return None

def get_network_range(local_ip):
    return f"{local_ip}/24"

async def get_netbios_info(ip):
    try:
        proc = await asyncio.create_subprocess_exec(
            "nmap", "-sU", "-p", "137", "--script", "nbstat.nse", "--host-timeout", "30s", ip,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        
        netbios_data = {}
        nbstat_section = re.search(r'Host script results:.*?\n\n', stdout.decode(), re.DOTALL)
        if nbstat_section:
            for line in nbstat_section.group().split('\n'):
                if 'NetBIOS name' in line:
                    netbios_data['name'] = line.split(': ')[-1].strip()
                elif 'User name' in line:
                    netbios_data['user'] = line.split(': ')[-1].strip()
                elif 'NetBIOS MAC' in line:
                    netbios_data['mac'] = line.split(': ')[-1].strip().replace('-', ':').upper()
        return netbios_data if netbios_data else "No NetBIOS data"
    except Exception as e:
        print(f"NetBIOS error: {e}")
        return "Error"

async def get_smb_port(ip):
    try:
        scanner = nmap.PortScanner()
        await asyncio.get_event_loop().run_in_executor(
            None, 
            lambda: scanner.scan(ip, arguments="-p 445 --host-timeout 15s")
        )
        if ip in scanner.all_hosts() and scanner[ip]['tcp'].get(445):
            state = scanner[ip]['tcp'][445]['state']
            return f"SMB ({state})"
        return "SMB (Not Detected)"
    except Exception as e:
        print(f"SMB check error: {e}")
        return "Error"

async def get_traceout(ip):
    try:
        cmd = ["tracert", "-d", "-w", "2", ip] if platform.system() == "Windows" else ["traceroute", "-n", "-w", "1", ip]
        proc = await asyncio.create_subprocess_shell(
            " ".join(cmd),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        return stdout.decode().strip()[:500]
    except Exception as e:
        print(f"Traceroute error: {e}")
        return "Error"

async def get_ttl(ip):
    try:
        cmd = ['ping', '-n', '1', ip] if platform.system() == 'Windows' else ['ping', '-c', '1', ip]
        proc = await asyncio.create_subprocess_shell(
            ' '.join(cmd),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, _ = await proc.communicate()
        ttl_match = re.search(r'ttl=(\d+)', stdout.decode().lower())
        return ttl_match.group(1) if ttl_match else "Unknown"
    except Exception as e:
        print(f"TTL error: {e}")
        return "Unknown"

async def get_os(ip):
    try:
        scanner = nmap.PortScanner()
        await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: scanner.scan(ip, arguments="-O --osscan-limit --host-timeout 2m")
        )
        if ip in scanner.all_hosts() and scanner[ip].get('osmatch'):
            best_os = max(scanner[ip]['osmatch'], key=lambda x: int(x['accuracy']))
            return f"{best_os['name']} ({best_os['accuracy']}%)"
        return "Unknown"
    except Exception as e:
        print(f"OS detection error: {e}")
        return "Error"

async def scan_connected_devices(ip_range):
    try:
        discovered_ips = fast_network_scan(ip_range)
        if not discovered_ips:
            return []

        port_results = scan_ports(discovered_ips, GENERAL_PORTS)
        streaming_results = scan_ports(discovered_ips, ",".join(map(str, STREAMING_PORTS.keys())))

        devices = []
        bssid = get_bssid()
        
        for ip in discovered_ips:
            mac = await get_mac_from_arp(ip)
            hostname = await get_hostname(ip)
            manufacturer = await get_mac_manufacturer(mac)
            
            device = {
                'ip': ip,
                'mac': mac,
                'hostname': hostname,
                'manufacturer': manufacturer,
                'bssid': bssid,
                'open_ports': port_results.get(ip, []),
                'streaming_ports': streaming_results.get(ip, []),
                'netbios': await get_netbios_info(ip),
                'smb_port': await get_smb_port(ip),
                'traceout': await get_traceout(ip),
                'ttl': await get_ttl(ip),
                'os': await get_os(ip)
            }
            add_device_to_db(ip, mac, hostname)
            devices.append(device)
        
        return devices
    except Exception as e:
        print(f"Scan error: {e}")
        return []

# API routes for the frontend React app
@app.route('/hosts', methods=['GET'])
def handle_hosts():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        local_ip = get_local_ip()
        if not local_ip:
            return jsonify({"error": "Could not determine local IP"}), 500

        devices = loop.run_until_complete(
            scan_connected_devices(get_network_range(local_ip))
        )

        with sqlite3.connect('network_devices.db') as conn:
            total_ports = sum(len(d.get('open_ports', [])) for d in devices)
            conn.execute('''INSERT INTO scans 
                         (timestamp, devices_count, open_ports_count)
                         VALUES (?, ?, ?)''',
                      (datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                      len(devices),
                      total_ports))
        
        return jsonify({
            "current_ip": local_ip,
            "network_range": get_network_range(local_ip),
            "devices": devices if devices else []  # Always return array
        })
        
    except Exception as e:
        return jsonify({  # Return empty devices array on error
            "error": str(e),
            "devices": []
        }), 500
    finally:
        loop.close()

@app.route('/view_devices')
def show_devices():
    return jsonify(view_devices())

# Add a new endpoint to get latest scan data
@app.route('/latest-scan')
def get_latest_scan():
    with sqlite3.connect('network_devices.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''SELECT * FROM scans 
                       ORDER BY timestamp DESC LIMIT 1''')
        latest = cursor.fetchone()
        return jsonify({
            'timestamp': latest[1],
            'devices': latest[2],
            'ports': latest[3]
        }) if latest else jsonify({})

@app.route('/total-devices')
def total_devices():
    with sqlite3.connect('network_devices.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(DISTINCT mac) FROM devices')
        return jsonify({'total_devices': cursor.fetchone()[0]})

@app.route('/scan-history')
def get_scan_history():
    with sqlite3.connect('network_devices.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT timestamp, devices_count, open_ports_count FROM scans ORDER BY timestamp DESC')
        return jsonify([{
            'timestamp': row[0],
            'devices': row[1],
            'ports': row[2]
        } for row in cursor.fetchall()])

@app.route('/upload-scan-data', methods=['POST'])
def upload_scan_data():
    try:
        file = request.files['file']
        if file and file.filename.endswith('.json'):
            # Read the JSON file
            scan_data = json.loads(file.read())
            return jsonify({'success': True, 'data': scan_data})
        else:
            return jsonify({'success': False, 'error': 'Please upload a valid JSON file'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/get-scan-history')
def get_scan_history_api():
    return jsonify(scan_history)

@app.route('/download-history-csv')
def download_history_csv():
    si = io.StringIO()
    cw = csv.writer(si)
    
    # Write headers
    cw.writerow(['Date', 'Time', 'Total Devices', 'Active Devices', 'Open Ports', 'Security Score'])
    
    # Write scan history data
    for scan in scan_history:
        scan_time = datetime.strptime(scan['timestamp'], '%Y-%m-%d %H:%M:%S')
        cw.writerow([
            scan_time.strftime('%Y-%m-%d'),
            scan_time.strftime('%H:%M:%S'),
            scan['total_devices'],
            scan['active_devices'],
            scan['open_ports'],
            scan['security_score']
        ])
    
    output = si.getvalue()
    si.close()
    
    return send_file(
        io.BytesIO(output.encode('utf-8')),
        mimetype='text/csv',
        as_attachment=True,
        download_name=f'network_scan_history_{datetime.now().strftime("%Y%m%d_%H%M")}.csv'
    )

@app.route('/add-to-history', methods=['POST'])
def add_to_history():
    scan_data = request.json
    scan_history.append({
        'timestamp': datetime.now().isoformat(),
        'total_devices': scan_data['total_devices'],
        'active_devices': scan_data['active_devices'],
        'open_ports': scan_data['open_ports'],
        'security_score': scan_data['security_score']
    })
    return jsonify({'success': True})

@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error="Endpoint not found"), 404

if __name__ == "__main__":
    create_db()
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
