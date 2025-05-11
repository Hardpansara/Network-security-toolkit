
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Wifi, Database, AlertTriangle, ArrowRight, ExternalLink, Lock, Users, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section with animated blobs */}
      <section className="py-24 px-4 bg-gradient-to-br from-background to-muted relative overflow-hidden hero-pattern">
        {/* Animated blobs */}
        <div className="blob w-72 h-72 top-1/4 -left-12 opacity-30"></div>
        <div className="blob w-96 h-96 top-1/3 right-0 animation-delay-2000 opacity-20"></div>
        <div className="blob w-64 h-64 bottom-0 left-1/3 animation-delay-4000 opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-security-DEFAULT animate-pulse-slow" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 animated-gradient-text">Secure Your Network with Confidence</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground">
            Network Guardian provides advanced monitoring and protection for your wireless networks, keeping your digital assets safe from threats
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-lg hover-lift bg-gradient-to-r from-primary to-accent">
                Access Dashboard
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 hover-lift backdrop-blur-sm">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section with hover animations */}
      <section className="py-16 px-4 bg-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 animated-gradient-text inline-block">Why Choose Network Guardian?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive solution provides everything you need to secure your network infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center feature-card p-6 rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Protection</h3>
              <p className="text-muted-foreground">
                Comprehensive security features to monitor, detect, and respond to network threats in real-time
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center feature-card p-6 rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-700">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-muted-foreground">
                Intuitive interface that makes complex network management accessible to users of all technical levels
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center feature-card p-6 rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-1500">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proactive Alerts</h3>
              <p className="text-muted-foreground">
                Stay informed with instant notifications about potential security threats and network changes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights with animation */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted to-muted/30 relative">
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4 animated-gradient-text inline-block mx-auto">Key Features</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover the powerful tools that make Network Guardian the ultimate choice for network security
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center h-full bg-card/80 backdrop-blur-sm border border-border/50 feature-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <Wifi className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Network Scanning</h3>
                <p className="text-muted-foreground flex-grow">
                  Automatically discover and monitor all devices connected to your network with comprehensive scanning capabilities
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4 hover-lift">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center h-full bg-card/80 backdrop-blur-sm border border-border/50 feature-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <Database className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Device Management</h3>
                <p className="text-muted-foreground flex-grow">
                  Track and manage all devices with detailed information including IP addresses, MAC addresses, and device history
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4 hover-lift">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center h-full bg-card/80 backdrop-blur-sm border border-border/50 feature-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Threat Detection</h3>
                <p className="text-muted-foreground flex-grow">
                  Identify and alert about potential security threats on your network with advanced threat intelligence
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4 hover-lift">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center h-full bg-card/80 backdrop-blur-sm border border-border/50 feature-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security Management</h3>
                <p className="text-muted-foreground flex-grow">
                  Implement protection measures and manage security policies to maintain a secure network environment
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4 hover-lift">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Advanced Security Features</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our toolkit is built with state-of-the-art security technology to provide comprehensive protection for your network.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Intrusion Detection</h3>
                    <p className="text-muted-foreground">Detect and block unauthorized access attempts as they happen</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Network Traffic Analysis</h3>
                    <p className="text-muted-foreground">Monitor data flow and identify suspicious patterns</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">User Access Control</h3>
                    <p className="text-muted-foreground">Manage who can access your network and what they can do</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
              <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50">
                <div className="radar-simulation h-80 w-full bg-gradient-radial from-background/20 to-background rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary/30 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-primary/30 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-primary/30 rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute w-1/2 h-1 bg-primary/20 animate-radar-scan origin-left"></div>
                  </div>
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-security-safe rounded-full pulse-slow"></div>
                  <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-security-alert rounded-full pulse-slow"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-security-neutral rounded-full pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with improved cards */}
      <section className="py-16 px-4 bg-muted relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4 animated-gradient-text inline-block mx-auto">What Our Users Say</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Don't just take our word for it - hear from our satisfied users
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover-lift">
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map((n) => (
                  <span key={n} className="text-security-alert">★</span>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-6">
                "Network Guardian has transformed how we manage our company's network security. The real-time monitoring and threat detection have given us peace of mind."
              </p>
              <div>
                <p className="font-semibold">Michael T.</p>
                <p className="text-sm text-muted-foreground">IT Director, TechSolutions Inc.</p>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover-lift">
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map((n) => (
                  <span key={n} className="text-security-alert">★</span>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-6">
                "As someone with limited technical knowledge, I found Network Guardian incredibly user-friendly while still providing powerful protection for my home network."
              </p>
              <div>
                <p className="font-semibold">Sarah J.</p>
                <p className="text-sm text-muted-foreground">Small Business Owner</p>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover-lift">
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map((n) => (
                  <span key={n} className="text-security-alert">★</span>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-6">
                "The detailed analytics and reporting features have helped us identify and address security vulnerabilities we didn't even know existed."
              </p>
              <div>
                <p className="font-semibold">David L.</p>
                <p className="text-sm text-muted-foreground">Network Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with gradient and animation */}
      <section className="py-20 px-4 bg-gradient-to-br from-card to-card/70 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-shadow">Ready to secure your network?</h2>
            <p className="text-xl mb-10 text-muted-foreground">
              Get started with Network Guardian today and take control of your network security with our comprehensive toolkit
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent flex items-center gap-2 px-8 shadow-lg hover-lift">
                  <span>Access Dashboard</span>
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button size="lg" variant="outline" className="px-8 hover-lift">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default HomePage;
