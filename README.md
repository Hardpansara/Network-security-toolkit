
# Network Guardian Toolkit

A comprehensive network security monitoring tool that allows you to scan your network, detect devices, monitor threats, and analyze security vulnerabilities.

## Project info

**URL**: https://lovable.dev/projects/21ef615f-38ff-4bd1-8a81-b8e6562a870b

## Features

- Real-time network scanning and device detection
- Security threat analysis and monitoring
- Port scanning and vulnerability assessment
- Device history tracking
- Network traffic monitoring
- Security recommendations
- Data visualization and reporting

## Backend Requirements

The Network Guardian Toolkit uses a Python Flask backend for network scanning. To run the backend:

1. Make sure you have Python 3.7+ installed
2. Install the required dependencies:
```sh
pip install -r requirements.txt
```
3. Run the backend server:
```sh
python backend/network_scanner.py
```

Note: The backend requires administrator/root privileges to perform network scanning operations.

### Required System Dependencies

- nmap (Network Mapper) must be installed on your system
- For Windows users: WinPcap or Npcap is required

## Frontend Development

Follow these steps to run the frontend:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

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

## How to Deploy

1. Start the backend server (see Backend Requirements)
2. Deploy the frontend through Lovable or your preferred hosting service
3. Make sure the API_BASE_URL in src/services/apiService.ts points to your backend server

## Custom Domain Setup

To connect a domain, navigate to Project > Settings > Domains in Lovable and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Security Notice

This tool is designed for network administrators and security professionals to monitor their own networks. 
Using this tool to scan networks without permission is unauthorized and potentially illegal.
