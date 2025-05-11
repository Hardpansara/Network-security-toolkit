
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Loader2, Bell, BellOff, Clock, Activity } from 'lucide-react';
import { apiService, NetworkDevice, ScanHistoryItem } from '@/services/apiService';

// Helper function to generate timestamps for demo data
const generateTimePoints = (count: number, interval = 5) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const time = new Date(now.getTime() - (count - i) * interval * 60000);
    return time.toLocaleTimeString();
  });
};

const MonitoringPage: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const { toast } = useToast();

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Get network scan results
      const scanResult = await apiService.getNetworkScan();
      setDevices(scanResult.devices || []);
      
      // Get scan history
      const history = await apiService.getScanHistory();
      setScanHistory(history);
    } catch (error) {
      console.error('Error fetching monitoring data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch monitoring data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Generate device count data based on scan history
  const generateDeviceCountData = () => {
    if (!scanHistory.length) return [];
    
    return scanHistory.slice(0, 12).reverse().map(scan => ({
      time: new Date(scan.timestamp).toLocaleTimeString(),
      devices: scan.devices
    }));
  };

  // Generate port count data based on scan history
  const generatePortCountData = () => {
    if (!scanHistory.length) return [];
    
    return scanHistory.slice(0, 12).reverse().map(scan => ({
      time: new Date(scan.timestamp).toLocaleTimeString(),
      ports: scan.ports
    }));
  };

  // Format data for CPU usage chart (example data when real monitoring isn't available)
  const generateCpuUsageData = () => {
    const timePoints = generateTimePoints(10);
    return timePoints.map((time, i) => ({
      time,
      usage: 15 + Math.random() * 30 // Random CPU usage between 15-45%
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Network Monitoring</h1>
            <p className="text-muted-foreground">
              Real-time monitoring and historical device activity
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
                id="alerts-mode"
              />
              <label htmlFor="alerts-mode" className="text-sm">
                {alertsEnabled ? (
                  <span className="flex items-center">
                    <Bell className="h-4 w-4 mr-1 text-green-500" />
                    Alerts On
                  </span>
                ) : (
                  <span className="flex items-center">
                    <BellOff className="h-4 w-4 mr-1 text-muted-foreground" />
                    Alerts Off
                  </span>
                )}
              </label>
            </div>
            <Button
              onClick={fetchData}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Auto-refresh interval: {refreshInterval} min</span>
            </div>
            <Slider
              value={[refreshInterval]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => setRefreshInterval(value[0])}
              className="mt-2"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Tabs defaultValue={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1h">1 Hour</TabsTrigger>
                <TabsTrigger value="6h">6 Hours</TabsTrigger>
                <TabsTrigger value="24h">24 Hours</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="w-full md:w-1/3 flex justify-end items-center space-x-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Active devices: <Badge variant="outline">{devices.length}</Badge>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device Count Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Device Activity</CardTitle>
              <CardDescription>
                Number of active devices over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {generateDeviceCountData().length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generateDeviceCountData()}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(value) => [`${value}`, 'Devices']} />
                      <Line 
                        type="monotone" 
                        dataKey="devices" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <p className="text-muted-foreground">No historical data available</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Open Ports Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Open Ports Activity</CardTitle>
              <CardDescription>
                Number of detected open ports over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {generatePortCountData().length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generatePortCountData()}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(value) => [`${value}`, 'Ports']} />
                      <Line 
                        type="monotone" 
                        dataKey="ports" 
                        stroke="#82ca9d" 
                        activeDot={{ r: 8 }} 
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <p className="text-muted-foreground">No historical data available</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CPU Usage Chart (Simulated) */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>System CPU Usage</CardTitle>
              <CardDescription>
                Monitoring server CPU utilization
              </CardDescription>
              <Badge className="mt-1" variant="outline">Simulated Data</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generateCpuUsageData()}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'CPU Usage']} />
                      <Line 
                        type="monotone" 
                        dataKey="usage" 
                        stroke="#ff7300" 
                        activeDot={{ r: 8 }} 
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest network events and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-auto">
                {!isLoading && devices.length > 0 ? (
                  <div className="space-y-3">
                    {devices.slice(0, 5).map((device, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{device.hostname || 'Unknown Device'}</p>
                          <p className="text-xs text-muted-foreground">{device.ip}</p>
                        </div>
                        <div>
                          <Badge variant="outline">
                            {device.open_ports?.length || 0} ports
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {scanHistory.slice(0, 3).map((scan, index) => (
                      <div key={`scan-${index}`} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">Network Scan</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(scan.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <Badge>
                            {scan.devices} devices
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <p className="text-muted-foreground">No recent activity</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MonitoringPage;
