
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiService, ScanHistoryItem, DeviceHistoryItem } from '@/services/apiService';

const StatisticsPage: React.FC = () => {
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [deviceHistory, setDeviceHistory] = useState<DeviceHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const scanData = await apiService.getScanHistory();
      setScanHistory(scanData);
      
      const deviceData = await apiService.getDeviceHistory();
      setDeviceHistory(deviceData);
      
      toast({
        title: "Data Refreshed",
        description: "Statistics have been updated",
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch statistics data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generatePieChartData = () => {
    if (!scanHistory.length) return [];
    
    // Get latest scan data
    const latestScan = scanHistory[0];
    
    return [
      { name: 'Devices', value: latestScan.devices, color: '#8884d8' },
      { name: 'Open Ports', value: latestScan.ports, color: '#82ca9d' }
    ];
  };

  const exportData = () => {
    // Generate CSV data
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Devices,Ports\n" +
      scanHistory.map(item => {
        return `${item.timestamp},${item.devices},${item.ports}`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "network_statistics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Statistics data has been exported as CSV"
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Network Statistics</h1>
            <p className="text-muted-foreground">
              Analytics and historical data of your network
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={exportData}
              disabled={isLoading || scanHistory.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device Activity Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Device Activity</CardTitle>
              <CardDescription>
                Number of devices detected over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64"> {/* Reduced height */}
                {scanHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={scanHistory.slice().reverse()}
                      margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                        }}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip 
                        formatter={(value) => [value, 'Devices']}
                        labelFormatter={(value) => `Time: ${new Date(value).toLocaleTimeString()}`}
                      />
                      <Line type="monotone" dataKey="devices" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <p className="text-muted-foreground">No data available</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Port Activity Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Open Ports</CardTitle>
              <CardDescription>
                Number of open ports detected over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64"> {/* Reduced height */}
                {scanHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scanHistory.slice().reverse()}
                      margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                        }}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip 
                        formatter={(value) => [value, 'Ports']}
                        labelFormatter={(value) => `Time: ${new Date(value).toLocaleTimeString()}`}
                      />
                      <Bar dataKey="ports" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <p className="text-muted-foreground">No data available</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Devices to Ports Ratio */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Latest Scan Summary</CardTitle>
              <CardDescription>
                Distribution of devices vs. open ports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64"> {/* Reduced height */}
                {scanHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={generatePieChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {generatePieChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    ) : (
                      <p className="text-muted-foreground">No data available</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Device History */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Device History</CardTitle>
              <CardDescription>
                First and last seen times for network devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-auto"> {/* Reduced height */}
                {deviceHistory.length > 0 ? (
                  <div className="space-y-2">
                    {deviceHistory.slice(0, 10).map((device, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{device.hostname || device.ip}</p>
                          <p className="text-xs text-muted-foreground">{device.mac}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            First: {new Date(device.first_seen).toLocaleString()}
                          </Badge>
                          <Badge variant="outline" className="block">
                            Last: {new Date(device.last_seen).toLocaleString()}
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
                      <p className="text-muted-foreground">No device history available</p>
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

export default StatisticsPage;
