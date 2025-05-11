
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { apiService, NetworkDevice } from '@/services/apiService';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  LockKeyhole, 
  Wifi, 
  AlertTriangle, 
  RefreshCw, 
  Loader2, 
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface SecurityIssue {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedDevices?: string[];
}

const SecurityPage: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [securityScore, setSecurityScore] = useState(0);
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const { toast } = useToast();

  const runSecurityScan = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.getNetworkScan();
      setDevices(result.devices || []);
      processSecurityData(result.devices || []);
      setLastScan(new Date().toLocaleString());
      toast({
        title: "Security scan complete",
        description: "Your network security has been assessed",
      });
    } catch (error) {
      console.error('Error running security scan:', error);
      toast({
        title: "Scan failed",
        description: "Could not complete the security scan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processSecurityData = (devices: NetworkDevice[]) => {
    // Calculate security score
    let score = 100;
    const issues: SecurityIssue[] = [];

    // Critical ports check (e.g., Telnet, SSH, SMB, etc.)
    const criticalPorts = [23, 22, 445, 3389];
    const vulnerableDevices = devices.filter(device => 
      device.open_ports?.some(port => criticalPorts.includes(port.port))
    );
    
    if (vulnerableDevices.length > 0) {
      score -= 25;
      issues.push({
        title: "Critical ports exposed",
        description: "Some devices have sensitive network ports exposed, which can be entry points for attackers.",
        severity: "critical",
        affectedDevices: vulnerableDevices.map(d => d.ip)
      });
    }

    // Check for unknown devices
    const unknownDevices = devices.filter(device => 
      device.hostname === "Unknown" || !device.hostname
    );
    
    if (unknownDevices.length > 0) {
      score -= 15;
      issues.push({
        title: "Unidentified devices",
        description: "Some devices on your network couldn't be identified. These could be unauthorized devices.",
        severity: "high",
        affectedDevices: unknownDevices.map(d => d.ip)
      });
    }

    // Check for excessive open ports
    const excessivePortsThreshold = 5;
    const devicesWithManyPorts = devices.filter(device => 
      (device.open_ports?.length || 0) > excessivePortsThreshold
    );
    
    if (devicesWithManyPorts.length > 0) {
      score -= 10;
      issues.push({
        title: "Excessive open ports",
        description: `Some devices have more than ${excessivePortsThreshold} open ports, increasing attack surface.`,
        severity: "medium",
        affectedDevices: devicesWithManyPorts.map(d => d.ip)
      });
    }

    // Add general security recommendations
    issues.push({
      title: "Regular password updates",
      description: "Remember to change your router and device passwords periodically for better security.",
      severity: "low"
    });

    setSecurityScore(Math.max(0, Math.min(100, score)));
    setSecurityIssues(issues);
  };

  useEffect(() => {
    runSecurityScan();
  }, []);

  const getScoreColor = () => {
    if (securityScore >= 80) return "text-security-safe";
    if (securityScore >= 50) return "text-security-alert";
    return "text-security-danger";
  };

  const getScoreIcon = () => {
    if (securityScore >= 80) return <ShieldCheck className={`h-8 w-8 ${getScoreColor()}`} />;
    if (securityScore >= 50) return <ShieldAlert className={`h-8 w-8 ${getScoreColor()}`} />;
    return <ShieldX className={`h-8 w-8 ${getScoreColor()}`} />;
  };

  const getScoreStatus = () => {
    if (securityScore >= 80) return "Good";
    if (securityScore >= 50) return "Needs attention";
    return "At risk";
  };

  const getIssueColor = (severity: string) => {
    switch (severity) {
      case 'critical': return "bg-security-danger text-white";
      case 'high': return "bg-security-alert text-white";
      case 'medium': return "bg-amber-500 text-white";
      default: return "bg-security-neutral text-white";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Security Center</h1>
            <p className="text-muted-foreground">
              Monitor and improve your network security
            </p>
          </div>
          <Button 
            onClick={runSecurityScan}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Scan Now
          </Button>
        </div>

        {lastScan && (
          <p className="text-sm text-muted-foreground">Last scan: {lastScan}</p>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getScoreIcon()}
                  <span className={`text-2xl font-bold ${getScoreColor()}`}>
                    {securityScore}
                  </span>
                </div>
                <Badge 
                  variant={securityScore >= 80 ? "default" : securityScore >= 50 ? "outline" : "destructive"}
                >
                  {getScoreStatus()}
                </Badge>
              </div>
              <Progress value={securityScore} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {securityScore >= 80 
                  ? "Your network security is in good condition." 
                  : securityScore >= 50 
                    ? "Your network has some security issues to address."
                    : "Your network is at significant security risk."
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network Shield Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LockKeyhole className="h-5 w-5 text-security-safe" />
                  <span>WPA3 Encryption</span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-security-safe" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-security-safe" />
                  <span>Router Firewall</span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-security-safe" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-security-alert" />
                  <span>Default Passwords</span>
                </div>
                <XCircle className="h-5 w-5 text-security-alert" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Devices Scanned</span>
                  <span>{devices.length}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Issues Detected</span>
                  <span>{securityIssues.filter(i => i.severity !== 'low').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical Issues</span>
                  <span className="text-security-danger">
                    {securityIssues.filter(i => i.severity === 'critical').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-6">Security Issues & Recommendations</h2>
        
        <div className="space-y-4">
          {securityIssues.map((issue, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-1 w-full ${getIssueColor(issue.severity)}`}></div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">{issue.title}</CardTitle>
                  <Badge variant="outline" className={issue.severity === 'critical' ? 'border-security-danger text-security-danger' : issue.severity === 'high' ? 'border-security-alert text-security-alert' : 'border-muted text-muted-foreground'}>
                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                  </Badge>
                </div>
                <CardDescription>{issue.description}</CardDescription>
              </CardHeader>
              {issue.affectedDevices && issue.affectedDevices.length > 0 && (
                <CardContent>
                  <p className="text-sm mb-1">Affected devices:</p>
                  <div className="flex flex-wrap gap-2">
                    {issue.affectedDevices.slice(0, 5).map((device, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {device}
                      </Badge>
                    ))}
                    {issue.affectedDevices.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{issue.affectedDevices.length - 5} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          
          {securityIssues.length === 0 && !isLoading && (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                <ShieldCheck className="h-12 w-12 text-security-safe mb-4" />
                <h3 className="text-xl font-medium">All Secure!</h3>
                <p className="text-muted-foreground mt-2">
                  No security issues were detected on your network.
                </p>
              </CardContent>
            </Card>
          )}
          
          {isLoading && (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityPage;
