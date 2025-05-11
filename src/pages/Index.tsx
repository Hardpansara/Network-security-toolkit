
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusOverview from '@/components/dashboard/StatusOverview';
import NetworkMap from '@/components/dashboard/NetworkMap';
import DeviceList from '@/components/devices/DeviceList';
import ThreatsPanel from '@/components/dashboard/ThreatsPanel';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { apiService } from '@/services/apiService';

const Index: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Never');
  const { toast } = useToast();

  useEffect(() => {
    // On first load, check if there's already cached data
    const timestamp = apiService.getLastScanTimestamp();
    if (timestamp) {
      setLastUpdated(new Date(timestamp).toLocaleTimeString());
    } else {
      // Perform initial scan if no cached data
      performScan();
    }
  }, []);

  const performScan = async () => {
    setIsScanning(true);
    try {
      // Force a refresh of the network scan
      await apiService.triggerScan();
      
      // Update the last updated timestamp
      const timestamp = apiService.getLastScanTimestamp();
      setLastUpdated(new Date(timestamp).toLocaleTimeString());
      
      toast({
        title: "Scan Complete",
        description: "Network scan has been completed successfully",
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        title: "Scan Failed",
        description: "Failed to complete network scan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Network Security Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            <Button 
              onClick={performScan} 
              disabled={isScanning}
              className="gap-2"
            >
              {isScanning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isScanning ? "Scanning..." : "Scan Network"}
            </Button>
          </div>
        </div>
        
        <StatusOverview />
        
        <div className="grid gap-4 md:grid-cols-3">
          <NetworkMap />
          <ThreatsPanel />
        </div>
        
        <DeviceList disableScan={true} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
