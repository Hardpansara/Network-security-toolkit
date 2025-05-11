import React, { useState } from 'react';
import { Shield, Settings, Bell, Menu, ExternalLink, X, AlertTriangle, Info, Check, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'alert' | 'info' | 'success';
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Security Alert',
    description: 'Unauthorized device detected on your network',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    type: 'alert',
    read: false
  },
  {
    id: '2',
    title: 'Scan Complete',
    description: 'Network vulnerability scan completed successfully',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    type: 'success',
    read: false
  },
  {
    id: '3',
    title: 'System Update',
    description: 'New security definitions have been installed',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    type: 'info',
    read: true
  },
  {
    id: '4',
    title: 'Port Scan Detected',
    description: 'Possible scanning activity from IP 192.168.1.45',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    type: 'alert',
    read: true
  },
  {
    id: '5',
    title: 'Device Status',
    description: 'Your router firmware is outdated and needs an update',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    type: 'info',
    read: true
  }
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="h-4 w-4 text-security-alert" />;
    case 'info':
      return <Info className="h-4 w-4 text-security-DEFAULT" />;
    case 'success':
      return <Check className="h-4 w-4 text-security-safe" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const Navbar: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-card/80 backdrop-blur-sm border-b border-border/50 px-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90vh] overflow-y-auto">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-security-DEFAULT" />
                    <span className="font-bold text-lg">Network Guardian</span>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </div>
                
                <div className="space-y-2">
                  <DrawerClose asChild>
                    <Link to="/dashboard" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard' ? 'bg-secondary' : ''}`}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/devices" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/devices' ? 'bg-secondary' : ''}`}
                      >
                        Devices
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/threats" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/threats' ? 'bg-secondary' : ''}`}
                      >
                        Threats
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/statistics" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/statistics' ? 'bg-secondary' : ''}`}
                      >
                        Statistics
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/security" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/security' ? 'bg-secondary' : ''}`}
                      >
                        Security
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/network" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/network' ? 'bg-secondary' : ''}`}
                      >
                        Network
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/monitoring" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/monitoring' ? 'bg-secondary' : ''}`}
                      >
                        Monitoring
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/settings" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/settings' ? 'bg-secondary' : ''}`}
                      >
                        Settings
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/help" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/help' ? 'bg-secondary' : ''}`}
                      >
                        Help
                      </Button>
                    </Link>
                  </DrawerClose>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/30">
                  <DrawerClose asChild>
                    <Link to="/" className="block w-full">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Main Site
                      </Button>
                    </Link>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-security-DEFAULT" />
          <span className="font-bold text-lg hidden md:inline-block">Network Guardian</span>
        </div>

        <div className="hidden md:flex items-center space-x-1 ml-6">
          <Link to="/dashboard">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard' ? 'bg-secondary' : ''}`}>Dashboard</Button>
          </Link>
          <Link to="/dashboard/devices">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard/devices' ? 'bg-secondary' : ''}`}>Devices</Button>
          </Link>
          <Link to="/dashboard/threats">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard/threats' ? 'bg-secondary' : ''}`}>Threats</Button>
          </Link>
          <Link to="/dashboard/statistics">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard/statistics' ? 'bg-secondary' : ''}`}>Statistics</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/" className="mr-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Main Site</span>
          </Button>
        </Link>
        
        <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-security-alert text-white text-xs">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-medium">Notifications</h3>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-8"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
            </div>
            
            {notifications.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-1">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 hover:bg-muted/50 rounded-md transition-colors ${notification.read ? 'opacity-70' : 'bg-muted/20'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className={`mt-0.5 p-1.5 rounded-full 
                            ${notification.type === 'alert' ? 'bg-security-alert/10' : 
                              notification.type === 'info' ? 'bg-security-DEFAULT/10' : 
                              'bg-security-safe/10'}`}
                          >
                            <NotificationIcon type={notification.type} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-security-alert"></span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{notification.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(notification.timestamp, 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="py-12 px-4 text-center">
                <Server className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            )}
            
            <div className="p-4 border-t border-border">
              <Link to="/dashboard/monitoring">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  View All Notifications
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        <Link to="/dashboard/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
