import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { apiService, NetworkDevice } from '@/services/apiService';
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Server, 
  Camera, 
  Laptop, 
  Smartphone, 
  Wifi, 
  Router,
  Lock, 
  ExternalLink,
  Info,
  Eye,
  EyeOff,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Search,
  Printer,
  Tv,
  Network,
  Globe,
  Cpu
} from 'lucide-react';

interface SuspiciousDeviceInfo {
  type: string;
  description: string;
  risk: 'high' | 'medium' | 'low';
  indicators: string[];
  icon: React.ReactNode;
}

interface SecurityRecommendation {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  steps?: string[];
}

const DeviceThreatsPage: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [suspiciousDevices, setSuspiciousDevices] = useState<NetworkDevice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const suspiciousDeviceTypes: SuspiciousDeviceInfo[] = [
    {
      type: 'Hidden Camera',
      description: 'Covert surveillance cameras that may be streaming video from your premises without authorization.',
      risk: 'high',
      indicators: [
        'Open RTSP (554) ports',
        'HTTP/HTTPS web interfaces on uncommon ports',
        'Constant data transmission',
        'Manufacturer names like Hikvision, Dahua, AXIS'
      ],
      icon: <Camera className="h-6 w-6 text-security-danger" />
    },
    {
      type: 'Rogue Access Point',
      description: 'Unauthorized WiFi access points that can intercept network traffic or provide unauthorized access.',
      risk: 'high',
      indicators: [
        'Unexpected SSID broadcast',
        'Unusual MAC address',
        'Hostnames containing terms like "AP" or "Access"',
        'Open ports 80, 443, 22'
      ],
      icon: <Wifi className="h-6 w-6 text-security-danger" />
    },
    {
      type: 'Data Exfiltration Server',
      description: 'Devices configured to collect and transmit data outside your network.',
      risk: 'high',
      indicators: [
        'Open FTP ports (21)',
        'High outbound traffic',
        'Unusual operating system',
        'Generic hostnames or missing hostname'
      ],
      icon: <Server className="h-6 w-6 text-security-danger" />
    },
    {
      type: 'Network Sniffer',
      description: 'Devices configured in promiscuous mode to capture all network traffic.',
      risk: 'medium',
      indicators: [
        'Unusual MAC addresses',
        'High network utilization without visible activity',
        'Unknown manufacturer',
        'Generic or missing hostname'
      ],
      icon: <Eye className="h-6 w-6 text-security-alert" />
    },
    {
      type: 'Compromised IoT Device',
      description: 'Smart devices that have been infected with malware or have security vulnerabilities.',
      risk: 'medium',
      indicators: [
        'Unusual port activity (23, 2323 for Telnet)',
        'Unexpected outbound connections',
        'IoT device connecting to unusual domains',
        'Outdated firmware'
      ],
      icon: <Smartphone className="h-6 w-6 text-security-alert" />
    },
    {
      type: 'Botnet-Infected Device',
      description: 'These devices have been compromised and are now part of a botnet, used to launch attacks like DDoS or spread malware.',
      risk: 'high',
      indicators: [
        'Random spikes in CPU/network usage',
        'Frequent connections to blacklisted IPs',
        'Sudden changes in device behavior',
        'Communication over non-standard ports'
      ],
      icon: <Cpu className="h-6 w-6 text-security-danger" />
    },
    {
      type: 'Man-in-the-Middle (MITM) Device',
      description: 'Attackers may place rogue devices between you and the network to intercept, modify, or redirect your traffic.',
      risk: 'high',
      indicators: [
        'ARP spoofing (multiple devices claiming the same IP)',
        'Duplicate IP warnings',
        'Certificates mismatch on HTTPS sites',
        'Unexpected DNS changes'
      ],
      icon: <Network className="h-6 w-6 text-security-danger" />
    },
    {
      type: 'Fake Network Infrastructure',
      description: 'Malicious devices can impersonate infrastructure services like DNS or DHCP to redirect traffic or assign wrong settings.',
      risk: 'high',
      indicators: [
        'Unexpected default gateways or DNS servers',
        'Network instability',
        'Devices unable to connect or loading incorrect pages',
        'DNS resolution failures'
      ],
      icon: <Globe className="h-6 w-6 text-security-danger" />
    },
    {
      type: 'Unsecured Printers / Scanners',
      description: 'Office equipment often comes with open ports and default credentials, making them easy entry points.',
      risk: 'medium',
      indicators: [
        'Open ports 9100, 515, 631 (printer services)',
        'Unchanged default credentials',
        'Devices with embedded web servers',
        'Accessible admin panels'
      ],
      icon: <Printer className="h-6 w-6 text-security-alert" />
    },
    {
      type: 'Misconfigured Smart TV or Media Device',
      description: 'Smart TVs, streaming boxes, or voice assistants might be sending telemetry data or exposing open services.',
      risk: 'medium',
      indicators: [
        'Open DLNA, SSDP, or media sharing ports (1900, 8200, 7000)',
        'Excessive traffic to external servers',
        'Device responding to multicast requests',
        'Unnecessary services enabled'
      ],
      icon: <Tv className="h-6 w-6 text-security-alert" />
    }
  ];

  const securityRecommendations: SecurityRecommendation[] = [
    {
      title: 'Disable Unnecessary Services',
      description: 'Turn off services and features that are not actively being used to reduce attack surface.',
      priority: 'critical',
      icon: <EyeOff className="h-5 w-5" />,
      steps: [
        'Disable Remote Desktop (RDP) if not needed',
        'Turn off file sharing if not required',
        'Disable Universal Plug and Play (UPnP) on your router',
        'Turn off printer and media sharing when not in use',
        'Disable Bluetooth and WiFi when not needed'
      ]
    },
    {
      title: 'Disable Developer Mode',
      description: 'Developer modes on devices often bypass security controls and should be disabled when not actively developing.',
      priority: 'high',
      icon: <Laptop className="h-5 w-5" />,
      steps: [
        'Turn off Developer Mode on Android devices',
        'Disable Developer Mode in Windows settings',
        'Remove development certificates from iOS devices',
        'Disable USB debugging options'
      ]
    },
    {
      title: 'Update Firmware Regularly',
      description: 'Keep all network devices and IoT products updated with the latest security patches.',
      priority: 'critical',
      icon: <RefreshCw className="h-5 w-5" />,
      steps: [
        'Check for router firmware updates monthly',
        'Enable automatic updates for IoT devices where available',
        'Create a schedule to check for updates on devices without auto-update',
        'Replace devices that no longer receive security updates'
      ]
    },
    {
      title: 'Change Default Credentials',
      description: 'Many network intrusions happen through devices with default passwords.',
      priority: 'critical',
      icon: <Lock className="h-5 w-5" />,
      steps: [
        'Change default passwords on ALL network devices',
        'Use unique passwords for each device',
        'Document credentials in a secure password manager',
        'Enable two-factor authentication where available'
      ]
    },
    {
      title: 'Segment Your Network',
      description: 'Create separate network segments for different types of devices to prevent lateral movement.',
      priority: 'medium',
      icon: <Router className="h-5 w-5" />,
      steps: [
        'Create a separate guest WiFi network',
        'Put IoT devices on their own VLAN if possible',
        'Use a separate network for sensitive operations',
        'Consider a dedicated VLAN for work devices'
      ]
    },
    {
      title: 'Regular Network Scans',
      description: 'Periodically scan your network to identify unauthorized devices and services.',
      priority: 'high',
      icon: <AlertTriangle className="h-5 w-5" />,
      steps: [
        'Perform weekly network scans',
        'Document all authorized devices',
        'Investigate any unknown devices immediately',
        'Monitor for unusual traffic patterns'
      ]
    }
  ];

  const scanForSuspiciousDevices = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const result = await apiService.getNetworkScan(forceRefresh);
      setDevices(result.devices || []);
      
      const suspicious = (result.devices || []).filter(device => {
        const hasSuspiciousPorts = device.open_ports?.some(port => 
          [21, 23, 554, 8080, 8443, 8554, 2323].includes(port.port)
        );
        
        const hasGenericHostname = !device.hostname || 
          device.hostname === 'Unknown' || 
          device.hostname.includes('ESP') || 
          device.hostname.includes('Camera');
        
        const hasSuspiciousManufacturer = device.manufacturer?.includes('Unknown') || 
          device.manufacturer?.includes('Dahua') || 
          device.manufacturer?.includes('Hikvision') || 
          device.manufacturer?.includes('Foscam');
        
        const hasUnusualOS = device.os?.includes('Embedded') || 
          device.os?.includes('Unknown');
        
        return hasSuspiciousPorts || 
          (hasGenericHostname && (hasSuspiciousManufacturer || hasUnusualOS));
      });
      
      setSuspiciousDevices(suspicious);
      setLastScan(new Date().toLocaleString());
      
      if (forceRefresh) {
        toast({
          title: "Threat scan complete",
          description: `Found ${suspicious.length} potentially suspicious devices`,
        });
      }
    } catch (error) {
      console.error('Error scanning for suspicious devices:', error);
      toast({
        title: "Scan failed",
        description: "Could not complete the suspicious device scan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scanForSuspiciousDevices();
  }, []);

  const renderRiskBadge = (risk: 'high' | 'medium' | 'low') => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-orange-400 text-orange-400">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-400 text-green-400">Low Risk</Badge>;
    }
  };

  const renderPriorityBadge = (priority: 'critical' | 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-400 text-yellow-400">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-400 text-green-400">Low</Badge>;
    }
  };

  const filteredRecommendations = searchQuery.trim() === '' 
    ? securityRecommendations 
    : securityRecommendations.filter(rec => 
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rec.steps && rec.steps.some(step => step.toLowerCase().includes(searchQuery.toLowerCase())))
      );

  const securityResources = [
    {
      title: "Home Router Security Guide",
      icon: <Router className="h-5 w-5" />,
      content: [
        "Update firmware regularly to patch security vulnerabilities",
        "Change default admin credentials with strong, unique passwords",
        "Enable WPA3 encryption for your WiFi network when available",
        "Create a separate guest network for visitors and IoT devices",
        "Disable WPS (WiFi Protected Setup) as it can be easily compromised",
        "Use a strong WiFi password with a mix of characters, numbers, and symbols",
        "Disable remote management unless absolutely necessary",
        "Enable the router's firewall and configure it properly",
        "Check connected devices regularly for unauthorized connections"
      ]
    },
    {
      title: "IoT Device Security Checklist",
      icon: <Smartphone className="h-5 w-5" />,
      content: [
        "Change default passwords on all IoT devices immediately after setup",
        "Update firmware regularly as manufacturers release security patches",
        "Disable unused features and services to reduce attack surface",
        "Place IoT devices on a separate network/VLAN isolated from sensitive devices",
        "Disable Universal Plug and Play (UPnP) for devices that don't need it",
        "Research device security before purchasing (check security track record)",
        "Review app permissions requested by IoT device companion apps",
        "Consider privacy implications of devices with cameras and microphones",
        "Unplug or disconnect smart devices when not in use for extended periods"
      ]
    },
    {
      title: "Network Monitoring Best Practices",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "Monitor network traffic for unusual patterns or spikes in data usage",
        "Set up alerts for unauthorized access attempts and suspicious activities",
        "Keep logs of network activity for at least 90 days for forensic purposes",
        "Conduct regular network scans to identify all connected devices",
        "Use traffic analysis tools to identify potential data exfiltration",
        "Monitor bandwidth usage by device to detect anomalies",
        "Check for unusual connection times (devices active during odd hours)",
        "Set up notifications for new devices connecting to your network",
        "Use a network intrusion detection system (IDS) for continuous monitoring"
      ]
    },
    {
      title: "Identifying Rogue Devices",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "Document all authorized devices with MAC addresses and device names",
        "Look for devices with generic names, missing information, or suspicious manufacturer details",
        "Scan for common surveillance device ports (554 RTSP, 80/443 HTTP/HTTPS, 23 Telnet)",
        "Examine devices with unusually high network activity or constant data transmission",
        "Check for unauthorized access points with similar SSIDs to your network",
        "Investigate devices that connect to unknown external servers frequently",
        "Look for hidden cameras using network scanning and physical inspection",
        "Use specialized tools like WiFi analyzers to detect unauthorized wireless devices",
        "Consider RF detectors for identifying wireless bugs and surveillance equipment"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Device Threats</h1>
            <p className="text-muted-foreground">
              Identify potentially harmful devices and secure your network
            </p>
          </div>
          <Button 
            onClick={() => scanForSuspiciousDevices(true)}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <AlertTriangle className="h-4 w-4" />}
            Scan for Suspicious Devices
          </Button>
        </div>

        {lastScan && (
          <p className="text-sm text-muted-foreground">Last scan: {lastScan}</p>
        )}

        <Tabs defaultValue="suspicious">
          <TabsList>
            <TabsTrigger value="suspicious">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Suspicious Devices
            </TabsTrigger>
            <TabsTrigger value="types">
              <Info className="mr-2 h-4 w-4" />
              Threat Types
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Security Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="suspicious" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Potential Security Threats</CardTitle>
                <CardDescription>
                  Devices that might pose a security risk to your network
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : suspiciousDevices.length > 0 ? (
                  <div className="space-y-4">
                    {suspiciousDevices.map((device, index) => (
                      <Card key={index} className="bg-security-danger/5 border-security-danger/20">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <ShieldAlert className="h-8 w-8 text-security-danger" />
                              <div>
                                <h3 className="font-medium">{device.hostname || 'Unknown Device'}</h3>
                                <p className="text-sm text-security-danger">IP: {device.ip}</p>
                                <p className="text-xs text-muted-foreground">MAC: {device.mac}</p>
                              </div>
                            </div>
                            <Badge variant="destructive">Suspicious</Badge>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Suspicious indicators:</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                                {device.open_ports?.some(port => [21, 23, 554, 8080, 8443, 8554, 2323].includes(port.port)) && (
                                  <li>Suspicious ports detected</li>
                                )}
                                {(!device.hostname || device.hostname === 'Unknown') && (
                                  <li>Generic or missing hostname</li>
                                )}
                                {(!device.manufacturer || device.manufacturer === 'Unknown') && (
                                  <li>Unknown manufacturer</li>
                                )}
                                {device.manufacturer?.includes('Dahua') || device.manufacturer?.includes('Hikvision') && (
                                  <li>Known surveillance equipment manufacturer</li>
                                )}
                                {device.os?.includes('Embedded') && (
                                  <li>Embedded operating system</li>
                                )}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1">Recommendation:</h4>
                              <p className="text-sm text-muted-foreground">
                                Investigate this device. If it's not a recognized part of your network, 
                                consider isolating or blocking it immediately.
                              </p>
                              <div className="mt-2">
                                <Button variant="outline" size="sm" className="text-xs">
                                  Investigate Device
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShieldCheck className="mx-auto h-10 w-10 text-security-safe mb-2" />
                    <h3 className="text-xl font-medium">No Suspicious Devices Detected</h3>
                    <p className="text-muted-foreground mt-2">
                      Your network appears to be free of suspicious devices at this time.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Network Status</CardTitle>
                <CardDescription>
                  Overview of your network security related to device threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Suspicious Device Risk</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Risk Level</span>
                        <span className={suspiciousDevices.length > 0 ? "text-security-danger" : "text-security-safe"}>
                          {suspiciousDevices.length > 0 ? "At Risk" : "Secure"}
                        </span>
                      </div>
                      <Progress 
                        value={suspiciousDevices.length > 0 ? 100 - (suspiciousDevices.length * 20) : 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Devices Scanned</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{devices.length}</span>
                      <span className="text-sm text-muted-foreground">total devices</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Suspicious Ratio</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        {devices.length > 0 ? Math.round((suspiciousDevices.length / devices.length) * 100) : 0}%
                      </span>
                      <span className="text-sm text-muted-foreground">of devices</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="types" className="space-y-4">
            {suspiciousDeviceTypes.map((deviceType, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    {deviceType.icon}
                    <CardTitle className="ml-2">{deviceType.type}</CardTitle>
                  </div>
                  {renderRiskBadge(deviceType.risk)}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{deviceType.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Common Indicators:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                      {deviceType.indicators.map((indicator, idx) => (
                        <li key={idx}>{indicator}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {deviceType.type === 'Botnet-Infected Device' && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Investigation Tip:</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor destination IPs for suspicious geolocations. Use tools like WHOIS or VirusTotal to assess IP reputation.
                      </p>
                    </div>
                  )}
                  
                  {deviceType.type === 'Man-in-the-Middle (MITM) Device' && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Investigation Tip:</h4>
                      <p className="text-sm text-muted-foreground">
                        Use packet sniffers (like Wireshark) to detect duplicate ARP responses or analyze TLS certificates.
                      </p>
                    </div>
                  )}
                  
                  {deviceType.type === 'Fake Network Infrastructure' && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Investigation Tip:</h4>
                      <p className="text-sm text-muted-foreground">
                        Check your router's DHCP lease table or run ipconfig /all (Windows) / ifconfig + cat /etc/resolv.conf (Linux) to verify expected settings.
                      </p>
                    </div>
                  )}
                  
                  {deviceType.type === 'Unsecured Printers / Scanners' && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Investigation Tip:</h4>
                      <p className="text-sm text-muted-foreground">
                        Try accessing the web interface and change default passwords. Disable unnecessary services.
                      </p>
                    </div>
                  )}
                  
                  {deviceType.type === 'Misconfigured Smart TV or Media Device' && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Investigation Tip:</h4>
                      <p className="text-sm text-muted-foreground">
                        Use nmap or your toolkit to detect unusual media services or UPnP-related ports.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader>
                <CardTitle>How to Investigate Suspicious Devices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">1. Check for Open Ports</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the Security tab to scan for open ports on suspicious devices. 
                    Pay special attention to ports 21 (FTP), 23 (Telnet), 554 (RTSP), and 
                    any web server ports (80, 443, 8080).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">2. Monitor Network Traffic</h3>
                  <p className="text-sm text-muted-foreground">
                    Watch for devices that transmit large amounts of data, especially during periods 
                    when you're not actively using the network. Constant outbound traffic could 
                    indicate surveillance or data exfiltration.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">3. Check Web Interfaces</h3>
                  <p className="text-sm text-muted-foreground">
                    Try accessing the IP address of suspicious devices in a web browser 
                    (e.g., <code>http://192.168.1.x</code>). Many surveillance devices expose 
                    control panels or configuration interfaces.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">4. Isolate Suspicious Devices</h3>
                  <p className="text-sm text-muted-foreground">
                    If you can't identify a device or confirm it should be on your network, 
                    consider isolating it through your router's settings or blocking its MAC address.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search security recommendations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            {filteredRecommendations.map((recommendation, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    {recommendation.icon}
                    <CardTitle className="ml-2">{recommendation.title}</CardTitle>
                  </div>
                  {renderPriorityBadge(recommendation.priority)}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{recommendation.description}</p>
                  
                  {recommendation.steps && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommended steps:</h4>
                      <ul className="space-y-2">
                        {recommendation.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-security-safe flex-shrink-0" />
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <Card>
              <CardHeader>
                <CardTitle>Additional Security Resources</CardTitle>
                <CardDescription>Comprehensive guides to secure your network and devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {securityResources.map((resource, index) => (
                    <div key={index} className="mb-6">
                      <Button variant="outline" className="justify-start w-full mb-3">
                        {resource.icon}
                        <span className="ml-2 font-medium">{resource.title}</span>
                      </Button>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <ul className="space-y-2">
                          {resource.content.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-security-safe flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DeviceThreatsPage;
