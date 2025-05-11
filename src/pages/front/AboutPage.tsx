
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Shield, Users, LockKeyhole, Zap, CheckCircle2, Globe, Database, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section with animated gradient */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted relative overflow-hidden hero-pattern">
        <div className="blob w-72 h-72 top-1/4 -left-12 opacity-30"></div>
        <div className="blob w-96 h-96 bottom-1/4 right-0 animation-delay-2000 opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 animated-gradient-text inline-block">About Our Product</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Secure. Monitor. Protect. Discover how Network Guardian empowers you with advanced network security tools.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 bg-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 animated-gradient-text inline-block">Our Mission</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                At Network Guardian, our mission is to provide individuals and organizations with powerful, 
                easy-to-use tools that help them understand, monitor, and secure their networks.
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                We believe that network security should be accessible to everyone, not just IT professionals. 
                That's why we've created a toolkit that combines advanced security features with an intuitive 
                interface that anyone can use.
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                In today's interconnected world, digital threats are evolving rapidly. From unauthorized network access 
                to sophisticated malware attacks, the security landscape demands constant vigilance. Our platform is designed 
                to provide that vigilance without requiring specialized knowledge.
              </p>
              <p className="text-lg text-muted-foreground">
                Our goal is to empower users with the knowledge and tools they need to protect their digital 
                lives and maintain the integrity of their networks in an increasingly connected world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover-lift">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Protection</h3>
                  <p className="text-muted-foreground text-center">
                    Safeguarding networks against unauthorized access and security threats
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover-lift">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Accessibility</h3>
                  <p className="text-muted-foreground text-center">
                    Making network security accessible to users of all technical levels
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover-lift">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <LockKeyhole className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Privacy</h3>
                  <p className="text-muted-foreground text-center">
                    Respecting user privacy while providing comprehensive security solutions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6 hover-lift">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Innovation</h3>
                  <p className="text-muted-foreground text-center">
                    Constantly evolving our solutions to address emerging security challenges
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center animated-gradient-text inline-block">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Comprehensive Analysis</h3>
                <p className="text-muted-foreground">
                  We provide detailed insights into your network infrastructure, identifying all connected devices 
                  and potential vulnerabilities with precision and accuracy.
                </p>
              </div>
              
              <div className="text-center bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-time Monitoring</h3>
                <p className="text-muted-foreground">
                  Our toolkit continuously monitors your network for suspicious activities and unauthorized access attempts, 
                  alerting you when potential threats are detected so you can respond promptly.
                </p>
              </div>
              
              <div className="text-center bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Proactive Protection</h3>
                <p className="text-muted-foreground">
                  Beyond detection, we offer tools that help you proactively secure your network, preventing security 
                  breaches before they occur and maintaining your digital safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted to-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-10 text-center animated-gradient-text inline-block mx-auto">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Device Discovery</h3>
                  <p className="text-muted-foreground">Automatically identify all devices connected to your network with detailed information.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Vulnerability Scanner</h3>
                  <p className="text-muted-foreground">Detect potential security weaknesses in your network infrastructure.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Intrusion Detection</h3>
                  <p className="text-muted-foreground">Receive alerts when unauthorized devices attempt to access your network.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Traffic Analysis</h3>
                  <p className="text-muted-foreground">Monitor data flow to identify unusual patterns that might indicate security threats.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Firewall Management</h3>
                  <p className="text-muted-foreground">Control network access with advanced firewall rules and configurations.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Security Reports</h3>
                  <p className="text-muted-foreground">Generate comprehensive reports on network health and security status.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">Control access permissions for different network users and devices.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover-lift">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Mobile Compatibility</h3>
                  <p className="text-muted-foreground">Monitor your network security from anywhere using our mobile-responsive interface.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/features">
              <Button size="lg" className="gap-2">
                <Shield className="h-5 w-5" />
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-white text-shadow">Ready to Secure Your Network?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start protecting your digital assets today with Network Guardian's comprehensive security toolkit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
                Launch Dashboard
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default AboutPage;
