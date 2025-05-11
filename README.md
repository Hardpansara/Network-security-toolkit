# Network Guardian Toolkit

A comprehensive network security monitoring tool that allows you to scan your network, detect devices, monitor threats, and analyze security vulnerabilities.

---

## 🔍 What is Network Guardian?

Network Guardian is your personal network security assistant that helps you understand and protect your home or office network. Think of it as a security camera system for your internet connection—it watches who comes in and out of your network and alerts you if something suspicious happens.

---

## 🚀 Features

- **Real-time Network Scanning**: Detect all devices connected to your network.
- **Device Information**: Identify known and unknown devices.
- **Security Threat Analysis**: Monitor for potential security risks.
- **Port Scanning**: Assess open ports and potential vulnerabilities.
- **Device History Tracking**: Keep a log of device connections over time.
- **Network Traffic Monitoring**: Visualize and analyze network traffic.
- **Security Recommendations**: Receive actionable advice to enhance network security.
- **Data Visualization**: Understand your network through intuitive charts and graphs.

---

## 🛠️ Backend Requirements

The Network Guardian Toolkit uses a Python Flask backend for network scanning.

### Prerequisites

- Python 3.7 or higher
- `nmap` installed on your system
- For Windows users: WinPcap or Npcap is required

1. Install the required dependencies:
```sh
pip install -r requirements.txt
```
2. Run the backend server:
```sh
python backend/network_scanner.py
```

Note: The backend requires administrator/root privileges to perform network scanning operations.

## Frontend Development

Follow these steps to run the frontend:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/Hardpansara/Network-security-toolkit.git

# Step 2: Navigate to the project directory.
cd Network-security-toolkit

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Technologies Used

### Frontend
- React with TypeScript
- Vite for fast builds
- shadcn-ui for component library
- Tailwind CSS for styling
- Recharts for data visualization

### Backend
- Python Flask for the API server
- python-nmap for network scanning
- SQLite for data storage
- asyncio for asynchronous operations


## 📖 User Guide

### How Does It Work?

1. **Installation**: Install on your computer (Windows, Mac, or Linux).
2. **First Scan**: Press **"Scan Network"** to find all connected devices.
3. **Monitoring**: The app keeps watching your network for any changes.
4. **Alerts**: Get notifications if:
   - Unknown devices connect
   - Security risks are detected
   - Devices start behaving strangely

---

### Common Questions

- **Is it safe to use?**  
  Yes! Network Guardian only looks at devices on your own network. It's like having a security guard that only watches your property.

- **Will it slow down my internet?**  
  No. The app uses minimal resources and won't affect your internet speed.

- **Do I need technical knowledge?**  
  No! The interface is designed to be user-friendly. Everything is explained in simple terms with clear recommendations.

- **What should I do when I get an alert?**  
  The app provides step-by-step instructions for any security issues it finds. If you're unsure, there's a help section with detailed guides.

---

### 🛡️ Privacy & Data

- All data stays on your computer  
- No network information is sent to external servers  
- Your privacy is protected


## Security Notice

This tool is designed for network administrators and security professionals to monitor their own networks. 
Using this tool to scan networks without permission is unauthorized and potentially illegal.
