
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NetworkDevice } from '@/services/apiService';
import { Laptop, Radio, Shield, ShieldAlert, Wifi } from 'lucide-react';

interface DeviceDetailsDialogProps {
  device: NetworkDevice | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeviceDetailsDialog: React.FC<DeviceDetailsDialogProps> = ({
  device,
  isOpen,
  onClose
}) => {
  if (!device) return null;

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

  // Helper function to safely convert values to string
  const safeToString = (value: unknown): string => {
    if (value === null || value === undefined) {
      return 'Not available';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            {device.hostname || 'Unknown Device'}
            {getSecurityStatus(device)}
          </DialogTitle>
          <DialogDescription>
            {device.ip} - {device.manufacturer || 'Unknown Manufacturer'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="flex-1">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ports">Ports</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[50vh]">
            <TabsContent value="overview" className="space-y-4 p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">IP Address</div>
                    <div>{device.ip}</div>
                    
                    <div className="text-muted-foreground">MAC Address</div>
                    <div>{device.mac}</div>
                    
                    <div className="text-muted-foreground">Hostname</div>
                    <div>{device.hostname || 'Unknown'}</div>
                    
                    <div className="text-muted-foreground">Operating System</div>
                    <div>{device.os || 'Unknown'}</div>
                    
                    <div className="text-muted-foreground">Manufacturer</div>
                    <div>{device.manufacturer || 'Unknown'}</div>
                    
                    <div className="text-muted-foreground">BSSID</div>
                    <div>{device.bssid || 'N/A'}</div>

                    <div className="text-muted-foreground">TTL</div>
                    <div>{device.ttl || 'Unknown'}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Network Status</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Open Ports</div>
                    <div>{device.open_ports?.length || 0}</div>
                    
                    <div className="text-muted-foreground">Streaming Ports</div>
                    <div>{device.streaming_ports?.length || 0}</div>
                    
                    <div className="text-muted-foreground">SMB Status</div>
                    <div>{device.smb_port || 'Not detected'}</div>
                    
                    <div className="text-muted-foreground">NetBIOS</div>
                    <div>
                      {typeof device.netbios === 'object' && device.netbios ? 
                        Object.entries(device.netbios).map(([key, value]) => (
                          <div key={key}>{key}: {safeToString(value)}</div>
                        )) : 
                        (safeToString(device.netbios) || 'Not detected')}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ports" className="space-y-4 p-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Open Ports</h3>
                {device.open_ports && device.open_ports.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {device.open_ports.map((port, index) => (
                      <div key={index} className="border rounded-md p-2 flex justify-between">
                        <span>{port.port}</span>
                        <Badge variant="outline">{port.service}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No open ports detected</p>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Streaming Ports</h3>
                {device.streaming_ports && device.streaming_ports.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {device.streaming_ports.map((port, index) => (
                      <div key={index} className="border rounded-md p-2 flex justify-between">
                        <span>{port.port}</span>
                        <Badge variant="outline">{port.service}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No streaming ports detected</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4 p-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Traceroute</h3>
                <div className="border rounded-md p-2 bg-secondary/20">
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                    {safeToString(device.traceout) || 'No traceroute data available'}
                  </pre>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Full Technical Details</h3>
                <div className="border rounded-md p-2 bg-secondary/20">
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(device, null, 2)}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailsDialog;

