import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiService, NetworkDevice } from '@/services/apiService';
import { useToast } from "@/hooks/use-toast";
import { 
  Network, 
  Wifi, 
  Radio, 
  Loader2, 
  AlertTriangle, 
  Search, 
  RefreshCw,
  Smartphone,
  Laptop,
  Router
} from 'lucide-react';

interface DeviceCardProps {
  device: NetworkDevice;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const getDeviceIcon = () => {
    const hostname = device.hostname?.toLowerCase() || '';
    
    if (hostname.includes('phone') || hostname.includes('mobile') || hostname.includes('android') || hostname.includes('iphone')) {
      return <Smartphone className="w-8 h-8 text-primary" />;
    } else if (hostname.includes('laptop') || hostname.includes('desktop') || hostname.includes('pc')) {
      return <Laptop className="w-8 h-8 text-primary" />;
    } else if (hostname.includes('router') || hostname.includes('gateway') || hostname.includes('modem')) {
      return <Router className="w-8 h-8 text-primary" />;
    } else {
      return <Wifi className="w-8 h-8 text-primary" />;
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {getDeviceIcon()}
            <div>
              <h3 className="font-medium">{device.hostname || 'Unknown Device'}</h3>
              <p className="text-sm text-muted-foreground">{device.ip}</p>
              <p className="text-xs text-muted-foreground">{device.mac}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Manufacturer</span>
            <span className="text-sm">{device.manufacturer || 'Unknown'}</span>
          </div>
        </div>
        
        <div className="mt-4 border-t border-border/50 pt-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Open Ports</span>
              <p>{device.open_ports?.length || 0}</p>
            </div>
            <div>
              <span className="text-muted-foreground">OS</span>
              <p>{device.os || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NetworkTopology: React.FC<{devices: NetworkDevice[]}> = ({ devices }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[300px] relative bg-secondary/20 rounded-lg border border-border/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Router className="w-10 h-10 text-primary-foreground" />
            </div>

            {/* Lines connecting router to devices */}
            {devices.slice(0, 8).map((device, index) => {
              const angle = (Math.PI * 2 / Math.min(8, devices.length)) * index;
              const x = Math.cos(angle) * 120;
              const y = Math.sin(angle) * 120;
              
              return (
                <React.Fragment key={device.ip || index}>
                  <div 
                    className="absolute w-0.5 bg-primary/40" 
                    style={{
                      left: '40px',
                      top: '40px',
                      height: '120px',
                      transformOrigin: 'top',
                      transform: `rotate(${angle * (180 / Math.PI)}deg)`
                    }}
                  />
                  <div 
                    className="absolute w-12 h-12 bg-secondary rounded-full flex items-center justify-center"
                    style={{
                      left: `${x + 34}px`,
                      top: `${y + 34}px`,
                    }}
                  >
                    {device.hostname?.includes('phone') ? (
                      <Smartphone className="w-6 h-6 text-primary" />
                    ) : (
                      <Laptop className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
            <p className="text-xs text-muted-foreground">Devices on your network</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold flex items-center">
              <Wifi className="w-5 h-5 mr-2" />
              2.4GHz / 5GHz WiFi
            </div>
            <p className="text-xs text-muted-foreground">Wireless network</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Signal Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <div className="h-4 w-1 bg-primary rounded-sm"></div>
              <div className="h-5 w-1 bg-primary rounded-sm"></div>
              <div className="h-6 w-1 bg-primary rounded-sm"></div>
              <div className="h-7 w-1 bg-primary rounded-sm"></div>
              <div className="h-8 w-1 bg-primary/30 rounded-sm"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Good signal quality</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const NetworkPage: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<NetworkDevice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('Never');
  const { toast } = useToast();
  
  const fetchNetworkDevices = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const result = await apiService.getNetworkScan(forceRefresh);
      setDevices(result.devices || []);
      setFilteredDevices(result.devices || []);
      
      const timestamp = apiService.getLastScanTimestamp();
      if (timestamp) {
        setLastUpdated(new Date(timestamp).toLocaleTimeString());
      }
      
      if (forceRefresh) {
        toast({
          title: "Data Refreshed",
          description: "Network device data has been updated"
        });
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast({
        title: "Error",
        description: "Failed to fetch network devices",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNetworkDevices();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDevices(devices);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredDevices(devices.filter(device => 
        device.hostname?.toLowerCase().includes(term) || 
        device.ip?.toLowerCase().includes(term) ||
        device.mac?.toLowerCase().includes(term) ||
        device.manufacturer?.toLowerCase().includes(term)
      ));
    }
  }, [searchTerm, devices]);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Network Overview</h1>
          <p className="text-muted-foreground">
            View and analyze your network topology and connected devices
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            <Button 
              onClick={() => fetchNetworkDevices(true)}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Refresh Data
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="map">
          <TabsList>
            <TabsTrigger value="map">
              <Network className="mr-2 h-4 w-4" />
              Network Map
            </TabsTrigger>
            <TabsTrigger value="devices">
              <Radio className="mr-2 h-4 w-4" />
              Connected Devices
            </TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="p-1">
            <NetworkTopology devices={devices} />
          </TabsContent>
          <TabsContent value="devices" className="p-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredDevices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDevices.map((device, idx) => (
                  <DeviceCard key={device.ip || idx} device={device} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No devices found</h3>
                <p className="text-sm text-muted-foreground">
                  No devices matching your search criteria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NetworkPage;
