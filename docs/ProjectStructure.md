
# Network Guardian Toolkit - Project Structure

This document provides a comprehensive overview of the project structure, tech stack, and architecture decisions for the Network Guardian Toolkit application.

## Project Overview

The Network Guardian Toolkit is a comprehensive network security monitoring application that allows users to:
- Scan networks for connected devices
- Monitor threats and security vulnerabilities
- Track device history and network traffic
- Visualize security data through charts and reports
- Receive recommendations for improving network security

## Tech Stack

### Frontend
- **React (18.3.1)** - Core UI library for building component-based interfaces
- **TypeScript** - For type safety and improved developer experience
- **Vite** - Fast, modern build tool for efficient development
- **React Router DOM (6.26.2)** - For client-side routing between different views
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Component library built on Radix UI primitives for accessible, customizable UI elements
- **Lucide React (0.462.0)** - Icon library with a consistent design system
- **Recharts (2.12.7)** - For data visualization components
- **Tanstack Query (5.56.2)** - For data fetching, caching, and state management
- **React Hook Form (7.53.0)** - For form management
- **Zod (3.23.8)** - For schema validation

### Backend
- **Python Flask** - Lightweight web server for API endpoints
- **python-nmap** - For network scanning functionality
- **SQLite** - For data persistence
- **asyncio** - For asynchronous operations

## File Structure

```
/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components
│   │   ├── dashboard/            # Dashboard-specific components
│   │   │   ├── NetworkMap.tsx    # Network visualization component
│   │   │   ├── StatusOverview.tsx # Network status overview component
│   │   │   └── ThreatsPanel.tsx  # Security threats panel
│   │   ├── devices/              # Device-related components
│   │   │   ├── DeviceDetailsDialog.tsx # Device details modal
│   │   │   └── DeviceList.tsx    # List of detected devices
│   │   ├── layout/               # Layout components
│   │   │   ├── DashboardLayout.tsx # Dashboard page wrapper
│   │   │   ├── FrontLayout.tsx   # Marketing site layout
│   │   │   ├── Navbar.tsx        # Top navigation bar
│   │   │   └── Sidebar.tsx       # Application sidebar navigation
│   │   └── ui/                   # UI components (from shadcn/ui)
│   │       ├── button.tsx        # Button component
│   │       ├── card.tsx          # Card container component
│   │       ├── dialog.tsx        # Modal dialog component
│   │       ├── tabs.tsx          # Tabs component
│   │       └── ...               # Many other UI components
│   ├── contexts/                 # React contexts for state management
│   │   └── ThemeContext.tsx      # Theme (light/dark) management
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx        # Hook for responsive design
│   │   └── use-toast.ts          # Hook for toast notifications
│   ├── lib/                      # Utility functions
│   │   └── utils.ts              # General utility functions
│   ├── pages/                    # Application pages/routes
│   │   ├── front/                # Marketing website pages
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   ├── AboutPage.tsx     # About page
│   │   │   ├── FeaturesPage.tsx  # Features showcase
│   │   │   └── ...               # Other marketing pages
│   │   ├── Index.tsx             # Main dashboard page
│   │   ├── DevicesPage.tsx       # Devices management page
│   │   ├── NetworkPage.tsx       # Network monitoring page
│   │   ├── SecurityPage.tsx      # Security settings page
│   │   ├── ThreatsPage.tsx       # Threats monitoring page
│   │   └── ...                   # Other application pages
│   ├── services/                 # Service layer
│   │   └── apiService.ts         # API client for backend communication
│   ├── App.tsx                   # Main application component with routes
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global CSS styles
├── backend/                      # Backend Python code
│   ├── network_scanner.py        # Network scanning functionality
│   ├── run.bat                   # Windows startup script
│   └── run.sh                    # Unix startup script
├── public/                       # Static assets
├── README.md                     # Project documentation
└── package.json                  # NPM dependencies and scripts
```

## Key Components and Their Purpose

### Layout Components
- **DashboardLayout**: Wraps all dashboard pages, providing consistent structure with sidebar and navbar
- **FrontLayout**: Provides layout for marketing/front pages
- **Sidebar**: Navigation menu for the dashboard
- **Navbar**: Top navigation with user controls, search, and mobile menu trigger

### Dashboard Components
- **StatusOverview**: Shows network health status, threat counts, and unauthorized devices
- **NetworkMap**: Visualizes the network topology and connections between devices
- **ThreatsPanel**: Displays security threats with severity levels and recommendations

### Device Components
- **DeviceList**: Shows all detected devices on the network with status indicators
- **DeviceDetailsDialog**: Modal for detailed device information and actions

### Page Components
- **Index (Dashboard)**: Main dashboard with security overview
- **DevicesPage**: Inventory of all devices detected on the network
- **NetworkPage**: Network monitoring and configuration
- **SecurityPage**: Security settings and configurations
- **ThreatsPage**: Detailed security threat monitoring
- **DeviceThreatsPage**: Device-specific security threats
- **Statistics**: Data visualization and security analytics

### Service Layer
- **apiService**: Communicates with the backend API for network scanning and threat detection

## Architecture Decisions

### Frontend Architecture
1. **Component-Based Structure**: The application follows a component-based architecture, with reusable UI components organized by functionality.

2. **Responsive Design**: All components are built with responsiveness in mind, using Tailwind's utility classes and the `useIsMobile` hook for adaptive layouts.

3. **Theme Support**: Dark/light mode theming is implemented using a context provider.

4. **Data Fetching Strategy**: 
   - TanStack Query for data fetching, caching, and state management
   - Centralized API service for all backend communication
   - Local storage for user preferences and settings

5. **Routing Strategy**:
   - React Router with nested routes
   - Clear separation between marketing (front/) and application pages

### Backend Architecture
1. **Python Flask API**: Lightweight web server exposing endpoints for:
   - Network scanning
   - Device detection
   - Threat analysis
   - Security recommendations

2. **Data Storage**:
   - SQLite for persistent storage of device history, scan results, and settings

## Key Features Implementation

### Network Scanning
- Implemented using python-nmap for device discovery and port scanning
- Results are cached in the frontend using TanStack Query
- Auto-scan functionality with configurable intervals

### Threat Detection
- Analyzes open ports, unknown devices, and behavioral patterns
- Calculates security scores based on detected vulnerabilities
- Provides recommendation actions for each threat

### Security Visualization
- Network map showing device connections
- Charts displaying threat trends and security metrics
- Status indicators for quick assessment of network health

### Device Management
- Tracks device history and behavioral changes
- Detects unauthorized or suspicious devices
- Provides detailed information about each device

## Development Workflow

The application uses Vite for fast development with hot module replacement. The standard workflow includes:

1. **Development**: `npm run dev` starts the development server
2. **Backend**: Running the Python backend server from the `/backend` directory
3. **Deployment**: The app can be deployed through Lovable or other hosting services

## Design System

The application uses a custom design system built on Tailwind CSS with:

- **Color Palette**: Security-focused palette with clear indicators (danger, warning, safe, neutral)
- **Component Library**: Extended shadcn/ui components for consistent UI
- **Typography**: Clear hierarchy with appropriate sizing for dashboard readability
- **Icons**: Consistent use of Lucide React icons throughout the interface

## Extensibility

The app is designed to be extensible with:

1. **Pluggable Components**: New visualizations or panels can be added to the dashboard
2. **Modular Threat Detection**: New threat types can be added to the detection system
3. **API Extensibility**: The backend can be extended with additional scanning capabilities

## Security Considerations

1. **Admin Privileges**: Backend scanner requires admin/root privileges for deep scanning
2. **Data Privacy**: Settings for anonymous data collection
3. **Secure Connections**: API communications should be secured in production
