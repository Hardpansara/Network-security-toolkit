
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Twitter, Linkedin, Github, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface FrontLayoutProps {
  children: React.ReactNode;
}

const FrontLayout: React.FC<FrontLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center bg-card/80 backdrop-blur-sm border-b border-border/50 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-security-DEFAULT" />
            <span className="font-bold text-lg">Network Guardian</span>
          </div>
          
          {/* Mobile menu */}
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
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
                        <X className="h-5 w-5" />
                      </Button>
                    </DrawerClose>
                  </div>
                  
                  <div className="space-y-2">
                    <DrawerClose asChild>
                      <Link to="/" className="block w-full">
                        <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/' ? 'bg-secondary' : ''}`}>
                          Home
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to="/features" className="block w-full">
                        <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/features' ? 'bg-secondary' : ''}`}>
                          Features
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to="/about" className="block w-full">
                        <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/about' ? 'bg-secondary' : ''}`}>
                          About
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to="/about-us" className="block w-full">
                        <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/about-us' ? 'bg-secondary' : ''}`}>
                          About Us
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to="/contact-us" className="block w-full">
                        <Button variant="ghost" className={`w-full justify-start ${location.pathname === '/contact-us' ? 'bg-secondary' : ''}`}>
                          Contact Us
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to="/dashboard" className="block w-full">
                        <Button className="w-full justify-center mt-4">
                          Dashboard
                        </Button>
                      </Link>
                    </DrawerClose>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href="tel:+919876543210" className="text-foreground hover:text-primary transition-colors">+91 98765 43210</a>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href="mailto:info@networkguardian.in" className="text-foreground hover:text-primary transition-colors">info@networkguardian.in</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-foreground">GLS University, Ahmedabad, India</span>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <>
              {/* Desktop Navigation links */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link to="/">
                  <Button variant="ghost" className={location.pathname === '/' ? 'bg-secondary' : ''}>
                    Home
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="ghost" className={location.pathname === '/features' ? 'bg-secondary' : ''}>
                    Features
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" className={location.pathname === '/about' ? 'bg-secondary' : ''}>
                    About
                  </Button>
                </Link>
                <Link to="/about-us">
                  <Button variant="ghost" className={location.pathname === '/about-us' ? 'bg-secondary' : ''}>
                    About Us
                  </Button>
                </Link>
                <Link to="/contact-us">
                  <Button variant="ghost" className={location.pathname === '/contact-us' ? 'bg-secondary' : ''}>
                    Contact Us
                  </Button>
                </Link>
              </nav>
            </>
          )}
          
          {/* Dashboard link - always visible */}
          <Link to="/dashboard" className={isMobile ? "hidden" : ""}>
            <Button>
              Dashboard
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Enhanced Footer */}
      <footer className="bg-card py-10 border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/contact-us" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://twitter.com/" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://github.com/" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <address className="not-italic text-muted-foreground">
                  <p>GLS University, Law Garden</p>
                  <p>Ahmedabad, Gujarat, India</p>
                  <p className="mt-2">Email: info@networkguardian.in</p>
                  <p>Phone: +91 98765 43210</p>
                </address>
              </div>
            </div>
            
            {/* About / Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4">About Network Guardian</h3>
              <p className="text-muted-foreground mb-4">
                Network Guardian is a comprehensive security solution designed to protect your wireless networks from threats and unauthorized access. Our toolkit empowers you with real-time monitoring, analysis, and protection capabilities.
              </p>
            </div>
          </div>
          
          {/* Copyright and Terms */}
          <div className="mt-8 pt-4 border-t border-border/30 text-center text-muted-foreground">
            <p className="mb-2">&copy; {new Date().getFullYear()} Network Guardian. All rights reserved.</p>
            <div className="space-x-4">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontLayout;
