import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiService, NetworkDevice } from '@/services/apiService';
import { 
  Search, 
  RefreshCw, 
  Download, 
  Loader2, 
  Wifi, 
  ShieldAlert, 
  Shield
} from 'lucide-react';
import DeviceDetailsDialog from './DeviceDetailsDialog';

interface DeviceListProps {
  disableScan?: boolean;
}

const DeviceList: React.FC<DeviceListProps> = ({ disableScan = false }) => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<NetworkDevice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof NetworkDevice>('ip');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchDevices = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const result = await apiService.getNetworkScan(forceRefresh);
      if (result.devices) {
        setDevices(result.devices);
        setFilteredDevices(result.devices);
      }
      
      if (forceRefresh) {
        toast({
          title: "Scan complete",
          description: `Found ${result.devices?.length || 0} devices on your network`
        });
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast({
        title: "Error",
        description: "Failed to scan network devices",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportDeviceData = () => {
    const dataStr = JSON.stringify({ data: { devices } }, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `network_scan_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export successful",
      description: "Device data has been exported as JSON"
    });
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = devices.filter(device => 
        device.hostname?.toLowerCase().includes(term) ||
        device.ip?.toLowerCase().includes(term) ||
        device.mac?.toLowerCase().includes(term) ||
        device.manufacturer?.toLowerCase().includes(term) ||
        device.os?.toLowerCase().includes(term)
      );
      setFilteredDevices(filtered);
    } else {
      setFilteredDevices(devices);
    }
  }, [searchTerm, devices]);

  const handleSort = (column: keyof NetworkDevice) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDeviceClick = (device: NetworkDevice) => {
    setSelectedDevice(device);
    setIsDialogOpen(true);
  };

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const aValue = a[sortColumn] || '';
    const bValue = b[sortColumn] || '';
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const getSecurityStatus = (device: NetworkDevice) => {
    const hasCriticalPort = device.open_ports?.some(port => 
      [21, 22, 23, 3389, 445, 135].includes(port.port)
    );
    
    if (hasCriticalPort) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <ShieldAlert className="h-3 w-3" /> At Risk
      </Badge>;
    }
    
    if ((device.open_ports?.length || 0) > 3) {
      return <Badge variant="outline" className="flex items-center gap-1 border-orange-400 text-orange-400">
        <Shield className="h-3 w-3" /> Warning
      </Badge>;
    }
    
    return <Badge variant="outline" className="flex items-center gap-1 border-green-400 text-green-400">
      <Shield className="h-3 w-3" /> Secure
    </Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={exportDeviceData}
            disabled={isLoading || devices.length === 0}
            className="whitespace-nowrap"
          >
            <Download className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
          {!disableScan && (
            <Button 
              onClick={() => fetchDevices(true)}
              disabled={isLoading}
              className="whitespace-nowrap"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh Data
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-secondary/50"
                onClick={() => handleSort('ip')}
              >
                IP Address {sortColumn === 'ip' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-secondary/50"
                onClick={() => handleSort('hostname')}
              >
                Hostname {sortColumn === 'hostname' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="hidden md:table-cell cursor-pointer hover:bg-secondary/50"
                onClick={() => handleSort('mac')}
              >
                MAC Address {sortColumn === 'mac' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="hidden md:table-cell cursor-pointer hover:bg-secondary/50"
                onClick={() => handleSort('manufacturer')}
              >
                Manufacturer {sortColumn === 'manufacturer' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="hidden md:table-cell">Open Ports</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Loading device data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : sortedDevices.length > 0 ? (
              sortedDevices.map((device, i) => (
                <TableRow 
                  key={device.ip || i} 
                  className="cursor-pointer hover:bg-secondary/30"
                  onClick={() => handleDeviceClick(device)}
                >
                  <TableCell>{device.ip}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      {device.hostname || 'Unknown'}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{device.mac}</TableCell>
                  <TableCell className="hidden md:table-cell">{device.manufacturer || 'Unknown'}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {device.open_ports?.length ? (
                      <Badge variant="outline">{device.open_ports.length}</Badge>
                    ) : (
                      <Badge variant="outline">0</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {getSecurityStatus(device)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Wifi className="h-10 w-10 mb-2" />
                    <p>No devices found</p>
                    {searchTerm && <p className="text-sm">Try adjusting your search</p>}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <DeviceDetailsDialog 
        device={selectedDevice} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
};

export default DeviceList;
