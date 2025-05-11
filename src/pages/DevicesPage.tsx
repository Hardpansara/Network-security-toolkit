
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DeviceList from '@/components/devices/DeviceList';

const DevicesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Network Devices</h1>
          <p className="text-muted-foreground">
            View and manage devices connected to your network
          </p>
        </div>
        <DeviceList />
      </div>
    </DashboardLayout>
  );
};

export default DevicesPage;
