
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Shield, Wifi, Database, AlertTriangle, Activity, History, ExternalLink, Lock, Search, WifiOff, House, Briefcase, BookOpen, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const FeatureSection = ({ icon: Icon, title, description, isReversed = false }) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center mb-16`}>
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-16 w-16 text-primary" />
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const FeaturesPage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl font-bold mb-6">Secure Your Network with Confidence</h1>
              <p className="text-xl mb-4 text-muted-foreground">
                In today's digital world, wireless networks are essential for communication, business, and personal convenience. However, with increasing connectivity comes the risk of cyber threats, unauthorized access, and data breaches.
              </p>
              <p className="mb-4 text-muted-foreground">
                Attackers can exploit weak security settings, hijack networks, and monitor sensitive information. Businesses and individuals must stay vigilant against these threats, ensuring that their networks are secure.
              </p>
              <p className="mb-6 text-muted-foreground">
                Network Guardian is a comprehensive cybersecurity solution designed to empower users with the ability to monitor, analyze, and secure their wireless networks effortlessly.
              </p>
              <Link to="#features-section">
                <Button size="lg" className="mt-2">Explore Features</Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-card rounded-lg overflow-hidden shadow-xl border border-border/50 w-full max-w-md aspect-video flex items-center justify-center">
                <Shield className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Network Security is Important */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why is Network Security Important?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Cybercrime is evolving, with hackers using advanced tactics to infiltrate networks. Here are some major security risks:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Unauthorized Access</h3>
                <p className="text-muted-foreground">
                  Hackers can connect to unsecured networks, stealing personal data or launching attacks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Hidden Malware</h3>
                <p className="text-muted-foreground">
                  Compromised devices may introduce malware into a network, causing serious security threats.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Data Interception</h3>
                <p className="text-muted-foreground">
                  Cybercriminals can intercept unencrypted communications, compromising sensitive information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features-section" className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Designed for efficiency, accessibility, and robust security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardContent className="pt-8 pb-6 h-full flex flex-col items-center">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-Time Network Scanning</h3>
                <p className="text-muted-foreground text-center">
                  Instantly detect all connected devices on your network, monitor active IPs, and assess potential threats.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="pt-8 pb-6 h-full flex flex-col items-center">
                <Search className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Device Identification & Analysis</h3>
                <p className="text-muted-foreground text-center">
                  Gain insights into connected devices, their MAC addresses, open ports, and running services.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="pt-8 pb-6 h-full flex flex-col items-center">
                <WifiOff className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Threat Detection & Response</h3>
                <p className="text-muted-foreground text-center">
                  Secure your network by identifying unauthorized users and protecting your data from potential threats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              A streamlined process for easy security management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Scan Your Network</h3>
              <p className="text-muted-foreground">
                Instantly list all connected devices, identifying potential vulnerabilities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Analyze Threats</h3>
              <p className="text-muted-foreground">
                Evaluate suspicious devices, open ports, and running services for security risks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Secure Your Network</h3>
              <p className="text-muted-foreground">
                Disconnect unauthorized users and implement security measures instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who Can Benefit?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Ideal for individuals, businesses, and cybersecurity professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <House className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Use</h3>
              <p className="text-muted-foreground">
                Keep home networks secure from intruders and unauthorized access.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Businesses can monitor corporate networks and prevent unauthorized breaches.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Education & Training</h3>
              <p className="text-muted-foreground">
                Ideal for cybersecurity students and professionals looking to practice ethical hacking techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Network Security Features</h2>
          
          <FeatureSection 
            icon={Wifi}
            title="Network Scanning"
            description="Automatically discover and monitor all devices connected to your network. Perform deep scans to identify devices, operating systems, and open ports. Get a comprehensive view of your network infrastructure."
          />
          
          <FeatureSection 
            icon={Database}
            title="Device Management"
            description="Track and manage all devices with detailed information including IP addresses, MAC addresses, manufacturers, and connection history. Identify unknown devices and take action when necessary."
            isReversed={true}
          />
          
          <FeatureSection 
            icon={AlertTriangle}
            title="Threat Detection"
            description="Identify potential security threats on your network in real-time. Get alerts about suspicious activities, unauthorized access attempts, and potential vulnerabilities."
          />
          
          <FeatureSection 
            icon={Shield}
            title="Security Management"
            description="Implement protection measures and manage security policies. Block suspicious devices, analyze threats, and maintain a secure network environment."
            isReversed={true}
          />
          
          <FeatureSection 
            icon={Activity}
            title="Real-time Monitoring"
            description="Monitor network activity in real-time with intuitive visualizations and dashboards. Track bandwidth usage, connection statistics, and device status."
          />
          
          <FeatureSection 
            icon={History}
            title="Historical Data Analysis"
            description="Access historical data for trend analysis and security audits. Review connection history, security events, and network changes over time."
            isReversed={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your network?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Get started with Network Guardian today and take control of your network security
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="flex items-center gap-2">
              <span>Access Dashboard</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </FrontLayout>
  );
};

export default FeaturesPage;
