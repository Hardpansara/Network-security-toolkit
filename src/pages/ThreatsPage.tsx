import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Terminal, 
  RefreshCw, 
  Loader2, 
  ChevronDown, 
  ChevronRight,
  Shield,
  Unlock,
  Network,
  Fingerprint,
  Users
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiService, NetworkDevice, NetworkScanResult } from '@/services/apiService';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ThreatItemProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
  expanded?: boolean;
  onToggle?: () => void;
}

const ThreatItem: React.FC<ThreatItemProps> = ({ 
  title, 
  description, 
  severity, 
  time,
  expanded = false,
  onToggle
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return "text-security-danger";
      case 'medium': return "text-security-alert";
      case 'low': return "text-security-neutral";
      default: return "text-security-neutral";
    }
  };

  const getSeverityBg = () => {
    switch (severity) {
      case 'high': return "bg-security-danger/20";
      case 'medium': return "bg-security-alert/20";
      case 'low': return "bg-security-neutral/20";
      default: return "bg-security-neutral/20";
    }
  };

  return (
    <div className={`p-3 rounded-md mb-3 transition-all ${getSeverityBg()}`}>
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 p-0"
            onClick={onToggle}
          >
            {expanded ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </Button>
          <AlertTriangle className={`h-4 w-4 ${getSeverityColor()}`} />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
      {expanded && (
        <div className="ml-9 mt-2">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="mt-2">
            <Button variant="outline" size="sm" className="text-xs h-7">
              Investigate Threat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const ThreatAttackMap: React.FC<{attacks: any[]}> = ({ attacks }) => {
  return (
    <div className="relative w-full h-[300px] bg-secondary/10 rounded-lg border border-border overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="worldMap" patternUnits="userSpaceOnUse" width="600" height="300">
              <path d="M150,25L150,25L160,30L170,30L180,35L190,40L200,45L200,50L210,55L220,55L240,55L250,55L260,60L270,65L275,70L280,75L290,80L300,85" fill="none" stroke="#666" strokeWidth="0.5" />
              <path d="M310,95L320,100L330,105L340,110L350,115L360,120L370,125L380,130L390,135L400,140L410,145L420,150L430,155" fill="none" stroke="#666" strokeWidth="0.5" />
              <path d="M150,160L160,165L170,170L180,175L190,180L200,185L210,190L220,195L230,200L240,205L250,210" fill="none" stroke="#666" strokeWidth="0.5" />
              <circle cx="200" cy="100" r="1.5" fill="#666" />
              <circle cx="300" cy="120" r="1.5" fill="#666" />
              <circle cx="250" cy="150" r="1.5" fill="#666" />
              <circle cx="350" cy="180" r="1.5" fill="#666" />
              <circle cx="150" cy="90" r="1.5" fill="#666" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldMap)" />
        </svg>
      </div>
      
      {attacks.map((attack, index) => (
        <div 
          key={index} 
          className="absolute"
          style={{
            left: `${attack.sourceX}%`,
            top: `${attack.sourceY}%`,
          }}
        >
          <div className={`absolute w-[200px] h-[1px] origin-left ${attack.severity === 'high' ? 'bg-security-danger' : attack.severity === 'medium' ? 'bg-security-alert' : 'bg-security-neutral'}`}
            style={{
              transform: `rotate(${attack.angle}deg)`,
            }}
          >
            <div className={`animate-pulse absolute right-0 top-[-3px] w-2 h-2 rounded-full ${attack.severity === 'high' ? 'bg-security-danger' : attack.severity === 'medium' ? 'bg-security-alert' : 'bg-security-neutral'}`}></div>
          </div>
        </div>
      ))}
      
      <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Network className="w-4 h-4 text-white" />
          </div>
          <div className="animate-ping absolute -inset-1 rounded-full bg-primary opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

const ThreatsPage: React.FC = () => {
  const [securityScore, setSecurityScore] = useState(100);
  const [threats, setThreats] = useState<{
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    time: string;
  }[]>([]);
  const [expandedThreats, setExpandedThreats] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Never');
  const { toast } = useToast();

  const toggleThreat = (index: number) => {
    if (expandedThreats.includes(index)) {
      setExpandedThreats(expandedThreats.filter(i => i !== index));
    } else {
      setExpandedThreats([...expandedThreats, index]);
    }
  };

  const fetchThreats = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const scanResult = await apiService.getNetworkScan(forceRefresh);
      const devices = scanResult.devices || [];
      
      const newThreats: {
        title: string;
        description: string;
        severity: 'low' | 'medium' | 'high';
        time: string;
      }[] = [];
      
      let score = 100;
      
      const criticalPorts = [22, 23, 25, 445, 3389];
      
      devices.forEach((device) => {
        if (device.open_ports && device.open_ports.length > 0) {
          const hasCriticalPort = device.open_ports.some(p => criticalPorts.includes(p.port));
          
          if (hasCriticalPort) {
            score -= 15;
            const criticalPort = device.open_ports.find(p => criticalPorts.includes(p.port));
            newThreats.push({
              title: `Critical Port Detected`,
              description: `Port ${criticalPort?.port} (${criticalPort?.service}) is open on ${device.hostname || device.ip}. This port is commonly targeted by attackers and should be closed if not required.`,
              severity: 'high',
              time: 'Now'
            });
          } else if (device.open_ports.length > 5) {
            score -= 10;
            newThreats.push({
              title: `Excessive Open Ports`,
              description: `${device.hostname || device.ip} has ${device.open_ports.length} open ports, increasing its attack surface. Consider closing unnecessary ports.`,
              severity: 'medium',
              time: 'Now'
            });
          } else {
            score -= 5;
            newThreats.push({
              title: `Open Ports Detected`,
              description: `${device.open_ports.length} open ports on ${device.hostname || device.ip}. While not critical, open ports can be potential entry points.`,
              severity: 'low',
              time: 'Now'
            });
          }
        }
      });
      
      const unknownDevices = devices.filter(d => d.hostname === 'Unknown' || d.manufacturer === 'Unknown');
      if (unknownDevices.length > 0) {
        score -= 10;
        newThreats.push({
          title: "Unknown Devices Detected",
          description: `${unknownDevices.length} devices with unidentified hostname or manufacturer are connected to your network. These could be unauthorized devices.`,
          severity: 'medium',
          time: 'Now'
        });
      }
      
      if (newThreats.length === 0) {
        newThreats.push({
          title: "Network appears secure",
          description: "No significant threats were detected during the scan. Continue monitoring your network regularly.",
          severity: 'low',
          time: 'Now'
        });
      }
      
      setSecurityScore(Math.max(0, Math.min(100, score)));
      setThreats(newThreats);
      
      const timestamp = apiService.getLastScanTimestamp();
      if (timestamp) {
        setLastUpdated(new Date(timestamp).toLocaleTimeString());
      }
      
      if (forceRefresh) {
        toast({
          title: "Threat scan complete",
          description: `Found ${newThreats.length} potential security issues`,
        });
      }
    } catch (error) {
      console.error("Error fetching threats:", error);
      toast({
        title: "Scan failed",
        description: "Could not complete the threat assessment",
        variant: "destructive"
      });
      
      setThreats([{
        title: "Scan Error",
        description: "Could not complete security assessment. Please try again later.",
        severity: 'medium',
        time: 'Now'
      }]);
      setSecurityScore(50);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  const attacks = [
    { sourceX: 20, sourceY: 30, angle: 45, severity: 'high' },
    { sourceX: 70, sourceY: 20, angle: 180, severity: 'medium' },
    { sourceX: 80, sourceY: 80, angle: 270, severity: 'low' },
    { sourceX: 10, sourceY: 60, angle: 0, severity: 'medium' },
  ];

  const commonThreats = [
    { name: "Unauthorized Access", icon: <Unlock className="h-4 w-4" />, count: 12 },
    { name: "Malware Infection", icon: <Terminal className="h-4 w-4" />, count: 8 },
    { name: "Phishing Attempts", icon: <Fingerprint className="h-4 w-4" />, count: 24 },
    { name: "Brute Force", icon: <Shield className="h-4 w-4" />, count: 16 },
    { name: "Data Exfiltration", icon: <Users className="h-4 w-4" />, count: 3 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Security Threats</h1>
            <p className="text-muted-foreground">
              Monitor and address potential security threats
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            <Button
              onClick={() => fetchThreats(true)}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh Analysis
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current Threats</TabsTrigger>
            <TabsTrigger value="dashboard">Threat Dashboard</TabsTrigger>
            <TabsTrigger value="map">Attack Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Network Security Score</CardTitle>
                <ShieldAlert className="h-5 w-5 text-security-alert" />
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Security Rating</span>
                    <span className="font-medium">{securityScore}/100</span>
                  </div>
                  <Progress 
                    value={securityScore} 
                    className={cn(
                      "h-2 bg-secondary",
                      securityScore > 70 ? "bg-security-safe" : 
                      securityScore > 40 ? "bg-security-alert" : 
                      "bg-security-danger"
                    )}
                  />
                </div>
                
                <div className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : threats.length > 0 ? (
                    threats.map((threat, index) => (
                      <ThreatItem 
                        key={index}
                        title={threat.title}
                        description={threat.description}
                        severity={threat.severity}
                        time={threat.time}
                        expanded={expandedThreats.includes(index)}
                        onToggle={() => toggleThreat(index)}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center py-4 text-security-safe">
                      <ShieldCheck className="h-5 w-5 mr-2" />
                      <span>No threats detected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Threats Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{threats.length}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                  <div className="mt-2 h-1 w-full bg-secondary">
                    <div 
                      className="h-1 bg-security-alert" 
                      style={{ width: `${Math.min(100, threats.length * 20)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Threat Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-security-danger"></div>
                        <span className="text-xs">High</span>
                      </div>
                      <div className="text-lg font-semibold">{threats.filter(t => t.severity === 'high').length}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-security-alert"></div>
                        <span className="text-xs">Medium</span>
                      </div>
                      <div className="text-lg font-semibold">{threats.filter(t => t.severity === 'medium').length}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-3 w-3 rounded-full bg-security-neutral"></div>
                        <span className="text-xs">Low</span>
                      </div>
                      <div className="text-lg font-semibold">{threats.filter(t => t.severity === 'low').length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Latest Threat</CardTitle>
                </CardHeader>
                <CardContent>
                  {threats.length > 0 ? (
                    <div>
                      <Badge variant="outline" className={
                        threats[0].severity === 'high' 
                          ? 'border-security-danger text-security-danger' 
                          : threats[0].severity === 'medium'
                            ? 'border-security-alert text-security-alert'
                            : 'border-muted text-muted-foreground'
                      }>
                        {threats[0].severity}
                      </Badge>
                      <p className="text-sm font-medium mt-2">{threats[0].title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{threats[0].time}</p>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No threats detected</div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Threat Types</CardTitle>
                <CardDescription>Historical threat activity by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonThreats.map((threat, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-1/2 flex items-center">
                        <div className="mr-2 p-2 bg-secondary rounded-full">
                          {threat.icon}
                        </div>
                        <span className="text-sm font-medium">{threat.name}</span>
                      </div>
                      <div className="w-1/2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${(threat.count / 25) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{threat.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Live Attack Map</CardTitle>
                <CardDescription>Visualize current attack vectors targeting your network</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreatAttackMap attacks={attacks} />
                
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Attack Attempts</span>
                    <span className="text-2xl font-semibold">1,284</span>
                    <Badge className="w-fit mt-1">+12% this week</Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Top Source</span>
                    <span className="text-2xl font-semibold">192.168.x.x</span>
                    <span className="text-xs text-muted-foreground">Internal network</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Blocked Attacks</span>
                    <span className="text-2xl font-semibold">99.7%</span>
                    <Badge variant="outline" className="w-fit mt-1">High efficiency</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ThreatsPage;
