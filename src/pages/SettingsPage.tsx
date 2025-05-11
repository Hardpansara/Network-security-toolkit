import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from '@/contexts/ThemeContext';
import {
  Settings,
  Bell,
  Shield,
  Clock,
  Save,
  RefreshCw,
  Wifi,
  MonitorCheck,
  Database,
  Download
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { apiService } from '@/services/apiService';

const SettingsPage: React.FC = () => {
  // Get the theme context
  const { theme, setTheme } = useTheme();
  
  const [scanning, setScanning] = useState({
    autoScan: true,
    scanInterval: '12',
    deepScan: false,
    scanPorts: true,
    osDetection: true
  });
  
  const [notifications, setNotifications] = useState({
    enableNotifications: true,
    newDeviceAlerts: true,
    securityThreats: true,
    statusUpdates: false,
    scanCompletion: true
  });
  
  const [security, setSecurity] = useState({
    autoBlock: false,
    threatAnalysis: true,
    saveHistory: true,
    anonymousData: false
  });
  
  const [display, setDisplay] = useState({
    darkMode: theme === 'dark',
    compactView: false,
    showIPs: true,
    showMACs: true,
    showHostnames: true
  });

  // Load settings from localStorage when component mounts
  useEffect(() => {
    const loadSettings = () => {
      const savedScanning = localStorage.getItem('scanningSettings');
      const savedNotifications = localStorage.getItem('notificationSettings');
      const savedSecurity = localStorage.getItem('securitySettings');
      const savedDisplay = localStorage.getItem('displaySettings');
      const savedRetention = localStorage.getItem('retentionPeriod');
      
      if (savedScanning) setScanning(JSON.parse(savedScanning));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
      if (savedSecurity) setSecurity(JSON.parse(savedSecurity));
      if (savedDisplay) {
        const parsedDisplay = JSON.parse(savedDisplay);
        // Sync dark mode with theme context
        setDisplay({...parsedDisplay, darkMode: theme === 'dark'});
      }
      if (savedRetention) setRetentionPeriod(savedRetention);
    };
    
    loadSettings();
  }, [theme]);
  
  // Effect to update dark mode when theme changes externally
  useEffect(() => {
    setDisplay(prev => ({...prev, darkMode: theme === 'dark'}));
  }, [theme]);

  // Effect to apply display settings to the app
  useEffect(() => {
    if (display.compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }

    // Apply other display settings to be used by components
    localStorage.setItem('showIPs', display.showIPs.toString());
    localStorage.setItem('showMACs', display.showMACs.toString());
    localStorage.setItem('showHostnames', display.showHostnames.toString());
  }, [display]);

  // Effect to apply scanning settings to the api service
  useEffect(() => {
    if (scanning) {
      apiService.setConfig({
        autoScan: scanning.autoScan,
        scanInterval: parseInt(scanning.scanInterval || '12'),
        deepScan: scanning.deepScan,
        scanPorts: scanning.scanPorts,
        osDetection: scanning.osDetection
      });
    }
  }, [scanning]);

  // Effect to apply security settings
  useEffect(() => {
    if (security) {
      // Apply security settings to api service
      apiService.setSecurityConfig({
        autoBlock: security.autoBlock,
        threatAnalysis: security.threatAnalysis,
        saveHistory: security.saveHistory,
        anonymousData: security.anonymousData
      });
    }
  }, [security]);
  
  const { toast } = useToast();
  
  // History retention state
  const [retentionPeriod, setRetentionPeriod] = useState('1month');
  
  const handleSave = () => {
    // Save all settings to localStorage
    localStorage.setItem('scanningSettings', JSON.stringify(scanning));
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    localStorage.setItem('securitySettings', JSON.stringify(security));
    localStorage.setItem('displaySettings', JSON.stringify(display));
    localStorage.setItem('retentionPeriod', retentionPeriod);
    
    // Apply theme change if needed
    if (display.darkMode && theme !== 'dark') {
      setTheme('dark');
    } else if (!display.darkMode && theme !== 'light') {
      setTheme('light');
    }
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
  };

  // Function to reset display settings
  const resetDisplaySettings = () => {
    const defaultDisplay = {
      darkMode: false,
      compactView: false,
      showIPs: true,
      showMACs: true,
      showHostnames: true
    };
    setDisplay(defaultDisplay);
    if (defaultDisplay.darkMode !== (theme === 'dark')) {
      setTheme(defaultDisplay.darkMode ? 'dark' : 'light');
    }
  };

  // Function to handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDisplay({...display, darkMode: checked});
    setTheme(checked ? 'dark' : 'light');
  };

  // Function to export all settings
  const exportSettings = () => {
    const allData = {
      scanning,
      notifications,
      security,
      display,
      retentionPeriod,
      scanHistory: localStorage.getItem('scanHistory')
    };
    
    const dataStr = JSON.stringify(allData, null, 4);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileName = `network-guardian-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
    
    toast({
      title: "Settings exported",
      description: "Your settings have been exported successfully",
    });
  };

  // Function to import settings from file
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          if (e.target?.result) {
            const settings = JSON.parse(e.target.result as string);
            
            if (settings.scanning) setScanning(settings.scanning);
            if (settings.notifications) setNotifications(settings.notifications);
            if (settings.security) setSecurity(settings.security);
            if (settings.display) {
              setDisplay(settings.display);
              // Apply theme
              setTheme(settings.display.darkMode ? 'dark' : 'light');
            }
            if (settings.retentionPeriod) setRetentionPeriod(settings.retentionPeriod);
            if (settings.scanHistory) localStorage.setItem('scanHistory', settings.scanHistory);
            
            // Save all the imported settings
            handleSave();
            
            toast({
              title: "Settings imported",
              description: "Your settings have been imported successfully",
            });
          }
        } catch (error) {
          console.error("Error importing settings:", error);
          toast({
            title: "Import failed",
            description: "Failed to import settings. The file may be corrupted.",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(file);
    }
  };
  
  // Create a ref for the file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure application preferences and network scanning options
          </p>
        </div>
        
        <Tabs defaultValue="scanning">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-none md:flex">
            <TabsTrigger value="scanning" className="flex gap-2 items-center">
              <Wifi className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Scanning</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Shield className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="flex gap-2 items-center">
              <MonitorCheck className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Display</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scanning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Network Scanning Options</CardTitle>
                <CardDescription>Configure how the application scans your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoScan">Automatic Scanning</Label>
                    <p className="text-sm text-muted-foreground">
                      Periodically scan your network for devices
                    </p>
                  </div>
                  <Switch 
                    id="autoScan" 
                    checked={scanning.autoScan}
                    onCheckedChange={(checked) => setScanning({...scanning, autoScan: checked})}
                  />
                </div>
                
                {scanning.autoScan && (
                  <div className="space-y-2">
                    <Label htmlFor="scanInterval">Scan Interval (hours)</Label>
                    <Input 
                      id="scanInterval"
                      type="number"
                      value={scanning.scanInterval}
                      onChange={(e) => setScanning({...scanning, scanInterval: e.target.value})}
                      min="1"
                      max="24"
                    />
                    <p className="text-xs text-muted-foreground">
                      How frequently the application should scan your network
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="deepScan">Deep Scanning</Label>
                    <p className="text-sm text-muted-foreground">
                      Perform more thorough but slower network scans
                    </p>
                  </div>
                  <Switch 
                    id="deepScan" 
                    checked={scanning.deepScan}
                    onCheckedChange={(checked) => setScanning({...scanning, deepScan: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="scanPorts">Port Scanning</Label>
                    <p className="text-sm text-muted-foreground">
                      Check for open ports on detected devices
                    </p>
                  </div>
                  <Switch 
                    id="scanPorts" 
                    checked={scanning.scanPorts}
                    onCheckedChange={(checked) => setScanning({...scanning, scanPorts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="osDetection">Operating System Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Identify the operating system of detected devices
                    </p>
                  </div>
                  <Switch 
                    id="osDetection" 
                    checked={scanning.osDetection}
                    onCheckedChange={(checked) => setScanning({...scanning, osDetection: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setScanning({
                    autoScan: true,
                    scanInterval: '12',
                    deepScan: false,
                    scanPorts: true,
                    osDetection: true
                  })}
                >
                  Reset
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
                <CardDescription>Manage your network scan history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>History Retention Period</Label>
                  <ToggleGroup 
                    type="single" 
                    value={retentionPeriod}
                    onValueChange={(value) => {
                      if (value) setRetentionPeriod(value);
                    }}
                    className="flex justify-between"
                  >
                    <ToggleGroupItem value="1week" className="flex-1">1 Week</ToggleGroupItem>
                    <ToggleGroupItem value="1month" className="flex-1">1 Month</ToggleGroupItem>
                    <ToggleGroupItem value="3months" className="flex-1">3 Months</ToggleGroupItem>
                    <ToggleGroupItem value="forever" className="flex-1">Forever</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      // Clear scan history
                      localStorage.removeItem('scanHistory');
                      toast({
                        title: "Scan history cleared",
                        description: "All scan history has been removed",
                      });
                    }}
                  >
                    Clear Scan History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the application to send notifications
                    </p>
                  </div>
                  <Switch 
                    id="enableNotifications" 
                    checked={notifications.enableNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, enableNotifications: checked})}
                  />
                </div>
                
                {notifications.enableNotifications && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newDeviceAlerts">New Device Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when new devices connect to your network
                        </p>
                      </div>
                      <Switch 
                        id="newDeviceAlerts" 
                        checked={notifications.newDeviceAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, newDeviceAlerts: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="securityThreats">Security Threats</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when security threats are detected
                        </p>
                      </div>
                      <Switch 
                        id="securityThreats" 
                        checked={notifications.securityThreats}
                        onCheckedChange={(checked) => setNotifications({...notifications, securityThreats: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="statusUpdates">Status Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Periodic updates about network status
                        </p>
                      </div>
                      <Switch 
                        id="statusUpdates" 
                        checked={notifications.statusUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, statusUpdates: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="scanCompletion">Scan Completion</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when network scan completes
                        </p>
                      </div>
                      <Switch 
                        id="scanCompletion" 
                        checked={notifications.scanCompletion}
                        onCheckedChange={(checked) => setNotifications({...notifications, scanCompletion: checked})}
                      />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security features and data handling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBlock">Auto-block Suspicious Devices</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically block devices that show suspicious activity
                    </p>
                  </div>
                  <Switch 
                    id="autoBlock" 
                    checked={security.autoBlock}
                    onCheckedChange={(checked) => setSecurity({...security, autoBlock: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="threatAnalysis">Threat Analysis</Label>
                    <p className="text-sm text-muted-foreground">
                      Analyze network traffic for potential security threats
                    </p>
                  </div>
                  <Switch 
                    id="threatAnalysis" 
                    checked={security.threatAnalysis}
                    onCheckedChange={(checked) => setSecurity({...security, threatAnalysis: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="saveHistory">Save Scan History</Label>
                    <p className="text-sm text-muted-foreground">
                      Store the results of network scans for future reference
                    </p>
                  </div>
                  <Switch 
                    id="saveHistory" 
                    checked={security.saveHistory}
                    onCheckedChange={(checked) => setSecurity({...security, saveHistory: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymousData">Share Anonymous Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Contribute anonymous data to improve threat detection
                    </p>
                  </div>
                  <Switch 
                    id="anonymousData" 
                    checked={security.anonymousData}
                    onCheckedChange={(checked) => setSecurity({...security, anonymousData: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage your stored data and backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full"
                  onClick={() => {
                    // Export data functionality
                    const allData = {
                      scanning,
                      notifications,
                      security,
                      display,
                      retentionPeriod,
                      scanHistory: localStorage.getItem('scanHistory')
                    };
                    
                    const dataStr = JSON.stringify(allData);
                    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
                    const exportFileName = `network-guardian-data-${new Date().toISOString()}.json`;
                    
                    const linkElement = document.createElement('a');
                    linkElement.setAttribute('href', dataUri);
                    linkElement.setAttribute('download', exportFileName);
                    linkElement.click();
                    
                    toast({
                      title: "Data exported",
                      description: "Your data has been exported successfully",
                    });
                  }}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full"
                  onClick={() => {
                    // This would normally open a file input dialog
                    toast({
                      title: "Import data",
                      description: "Please select a data file to import",
                    });
                  }}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
                <Button variant="destructive" className="w-full"
                  onClick={() => {
                    // Delete all data
                    localStorage.clear();
                    toast({
                      title: "Data deleted",
                      description: "All data has been removed from this device",
                    });
                    
                    // Reset all states to default
                    setScanning({
                      autoScan: true,
                      scanInterval: '12',
                      deepScan: false,
                      scanPorts: true,
                      osDetection: true
                    });
                    
                    setNotifications({
                      enableNotifications: true,
                      newDeviceAlerts: true,
                      securityThreats: true,
                      statusUpdates: false,
                      scanCompletion: true
                    });
                    
                    setSecurity({
                      autoBlock: false,
                      threatAnalysis: true,
                      saveHistory: true,
                      anonymousData: false
                    });
                    
                    setDisplay({
                      darkMode: theme === 'dark',
                      compactView: false,
                      showIPs: true,
                      showMACs: true,
                      showHostnames: true
                    });
                    
                    setRetentionPeriod('1month');
                  }}
                >
                  Delete All Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Display Options</CardTitle>
                <CardDescription>Customize the application appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme for the application
                    </p>
                  </div>
                  <Switch 
                    id="darkMode" 
                    checked={display.darkMode}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compactView">Compact View</Label>
                    <p className="text-sm text-muted-foreground">
                      Display more items with less spacing
                    </p>
                  </div>
                  <Switch 
                    id="compactView" 
                    checked={display.compactView}
                    onCheckedChange={(checked) => setDisplay({...display, compactView: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showIPs">Show IP Addresses</Label>
                    <p className="text-sm text-muted-foreground">
                      Display IP addresses in device lists
                    </p>
                  </div>
                  <Switch 
                    id="showIPs" 
                    checked={display.showIPs}
                    onCheckedChange={(checked) => setDisplay({...display, showIPs: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showMACs">Show MAC Addresses</Label>
                    <p className="text-sm text-muted-foreground">
                      Display MAC addresses in device lists
                    </p>
                  </div>
                  <Switch 
                    id="showMACs" 
                    checked={display.showMACs}
                    onCheckedChange={(checked) => setDisplay({...display, showMACs: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showHostnames">Show Hostnames</Label>
                    <p className="text-sm text-muted-foreground">
                      Display device hostnames when available
                    </p>
                  </div>
                  <Switch 
                    id="showHostnames" 
                    checked={display.showHostnames}
                    onCheckedChange={(checked) => setDisplay({...display, showHostnames: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={resetDisplaySettings}
                >
                  Reset
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6 flex flex-col md:flex-row md:justify-between gap-4 items-center">
          <div>
            <h3 className="text-lg font-semibold">Network Guardian</h3>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button 
              variant="outline"
              onClick={exportSettings}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Settings
            </Button>
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Database className="mr-2 h-4 w-4" />
              Import Settings
            </Button>
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".json"
              onChange={importSettings}
            />
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Checking for updates",
                  description: "Looking for the latest version..."
                });
                
                // Simulate check
                setTimeout(() => {
                  toast({
                    title: "No updates available",
                    description: "You're running the latest version (1.0.0)"
                  });
                }, 2000);
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Check for Updates
            </Button>
            <Button 
              variant="secondary"
              onClick={() => {
                toast({
                  title: "Advanced Settings",
                  description: "This feature is coming soon"
                });
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Advanced Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
