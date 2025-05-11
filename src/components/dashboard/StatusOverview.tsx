
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services/apiService';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'secure' | 'warning' | 'danger' | 'neutral';
  icon: React.ElementType;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, status, icon: Icon }) => {
  const statusColors = {
    secure: 'text-security-safe',
    warning: 'text-security-alert',
    danger: 'text-security-danger',
    neutral: 'text-security-neutral',
  };

  return (
    <Card className="security-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${statusColors[status]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`mt-2 ${status === 'secure' ? 'status-secure' : status === 'warning' ? 'status-warning' : status === 'danger' ? 'status-danger' : 'status-neutral'}`}>
          {status === 'secure' ? 'Secure' : status === 'warning' ? 'Warning' : status === 'danger' ? 'Critical' : 'Unknown'}
        </div>
      </CardContent>
    </Card>
  );
};

const StatusOverview: React.FC = () => {
  const [networkStatus, setNetworkStatus] = useState<{ status: 'secure' | 'warning' | 'danger' | 'neutral', value: string }>({ 
    status: 'neutral', 
    value: 'Unknown' 
  });
  const [threatsDetected, setThreatsDetected] = useState(0);
  const [unauthorizedDevices, setUnauthorizedDevices] = useState(0);
  
  useEffect(() => {
    const fetchNetworkStatus = async () => {
      try {
        // Get latest scan data
        const scanData = await apiService.getNetworkScan();
        
        // Calculate threats - count devices with open ports
        const devicesWithOpenPorts = scanData.devices.filter(
          device => device.open_ports && device.open_ports.length > 0
        ).length;
        setThreatsDetected(devicesWithOpenPorts);
        
        // Calculate potentially unauthorized devices
        // This is a simplification - in a real app, you'd compare against known devices
        const unknownDevices = scanData.devices.filter(
          device => device.hostname === 'Unknown' || device.manufacturer === 'Unknown'
        ).length;
        setUnauthorizedDevices(unknownDevices);
        
        // Set overall network status based on threats
        if (devicesWithOpenPorts === 0 && unknownDevices === 0) {
          setNetworkStatus({ status: 'secure', value: 'Secure' });
        } else if (devicesWithOpenPorts > 0 && unknownDevices === 0) {
          setNetworkStatus({ status: 'warning', value: 'Warning' });
        } else if (unknownDevices > 0) {
          setNetworkStatus({ status: 'danger', value: 'Critical' });
        }
      } catch (error) {
        console.error('Error fetching network status:', error);
        setNetworkStatus({ status: 'neutral', value: 'Unknown' });
      }
    };
    
    fetchNetworkStatus();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatusCard
        title="Network Status"
        value={networkStatus.value}
        status={networkStatus.status}
        icon={Shield}
      />
      <StatusCard
        title="Threats Detected"
        value={threatsDetected}
        status={threatsDetected > 0 ? 'warning' : 'secure'}
        icon={AlertTriangle}
      />
      <StatusCard
        title="Unauthorized Devices"
        value={unauthorizedDevices}
        status={unauthorizedDevices > 0 ? 'danger' : 'secure'}
        icon={WifiOff}
      />
    </div>
  );
};

export default StatusOverview;
