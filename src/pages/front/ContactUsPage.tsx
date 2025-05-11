
import React, { useState } from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Mail, Phone, MapPin, Send, Clock, Calendar, Headphones, Link as LinkIcon, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactUsPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <FrontLayout>
      {/* Hero Section with animated background */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted relative overflow-hidden hero-pattern">
        <div className="blob w-72 h-72 top-1/4 -left-12 opacity-30"></div>
        <div className="blob w-96 h-96 bottom-1/4 right-0 animation-delay-2000 opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 animated-gradient-text inline-block">Get In Touch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Our team is ready to assist with any inquiries about our network security solutions.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 bg-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
                  <p className="text-white/80">Reach out to us through any of these channels</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href="mailto:info@networkguardian.in" className="text-muted-foreground hover:text-primary transition-colors">
                          info@networkguardian.in
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">For general inquiries</p>
                        
                        <a href="mailto:support@networkguardian.in" className="text-muted-foreground hover:text-primary transition-colors block mt-2">
                          support@networkguardian.in
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">For technical support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                          +91 98765 43210
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">Main office</p>
                        
                        <a href="tel:+919876543211" className="text-muted-foreground hover:text-primary transition-colors block mt-2">
                          +91 98765 43211
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">Customer support</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">
                          GLS University<br />
                          Law Garden, Ahmedabad<br />
                          Gujarat 380006, India
                        </p>
                        <a 
                          href="https://maps.google.com/?q=GLS+University+Ahmedabad" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm mt-2 inline-block"
                        >
                          Get directions →
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                          Saturday: 10:00 AM - 4:00 PM IST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-card hover:bg-primary/10 transition-colors p-2 rounded-full"
                      >
                        <Linkedin className="h-5 w-5 text-primary" />
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-card hover:bg-primary/10 transition-colors p-2 rounded-full"
                      >
                        <Twitter className="h-5 w-5 text-primary" />
                      </a>
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-card hover:bg-primary/10 transition-colors p-2 rounded-full"
                      >
                        <Facebook className="h-5 w-5 text-primary" />
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-card hover:bg-primary/10 transition-colors p-2 rounded-full"
                      >
                        <Instagram className="h-5 w-5 text-primary" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                  <TabsTrigger value="sales">Business Inquiry</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact">
                  <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="font-medium">Name</label>
                            <Input 
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="font-medium">Email</label>
                            <Input 
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Your email address"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="subject" className="font-medium">Subject</label>
                          <Input 
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Message subject"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="font-medium">Message</label>
                          <Textarea 
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            rows={6}
                            required
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full md:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send Message
                            </span>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="support">
                  <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Headphones className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Technical Support</h2>
                          <p className="text-muted-foreground">Get help with technical issues or questions</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Quick Support</h3>
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm font-medium">Support Email</p>
                            <a href="mailto:support@networkguardian.in" className="text-primary hover:underline">
                              support@networkguardian.in
                            </a>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm font-medium">Support Phone</p>
                            <a href="tel:+919876543211" className="text-primary hover:underline">
                              +91 98765 43211
                            </a>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm font-medium">Hours</p>
                            <p>24/7 for critical issues</p>
                            <p>9:00 AM - 8:00 PM IST (Regular support)</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Support Resources</h3>
                          <a href="#" className="bg-muted p-4 rounded-lg block hover:bg-muted/70 transition-colors">
                            <div className="flex justify-between items-center">
                              <span>Knowledge Base</span>
                              <LinkIcon className="h-4 w-4" />
                            </div>
                          </a>
                          <a href="#" className="bg-muted p-4 rounded-lg block hover:bg-muted/70 transition-colors">
                            <div className="flex justify-between items-center">
                              <span>Video Tutorials</span>
                              <LinkIcon className="h-4 w-4" />
                            </div>
                          </a>
                          <a href="#" className="bg-muted p-4 rounded-lg block hover:bg-muted/70 transition-colors">
                            <div className="flex justify-between items-center">
                              <span>Community Forum</span>
                              <LinkIcon className="h-4 w-4" />
                            </div>
                          </a>
                          <a href="#" className="bg-muted p-4 rounded-lg block hover:bg-muted/70 transition-colors">
                            <div className="flex justify-between items-center">
                              <span>FAQs</span>
                              <LinkIcon className="h-4 w-4" />
                            </div>
                          </a>
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                        <h3 className="text-lg font-semibold mb-3">Premium Support</h3>
                        <p className="mb-4 text-muted-foreground">
                          For enterprise customers, we offer dedicated support with guaranteed response times.
                        </p>
                        <Button variant="outline">Learn More About Premium Support</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="sales">
                  <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Business Inquiries</h2>
                          <p className="text-muted-foreground">Schedule a consultation or demo with our team</p>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <p className="text-lg mb-4">
                          Interested in enterprise solutions or bulk licensing? Our sales team is ready to help you find the right solution for your organization.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="bg-muted p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3">Schedule a Demo</h3>
                            <p className="text-muted-foreground mb-4">
                              See Network Guardian in action with a personalized demonstration.
                            </p>
                            <Button className="w-full">Book a Demo</Button>
                          </div>
                          
                          <div className="bg-muted p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-3">Request Pricing</h3>
                            <p className="text-muted-foreground mb-4">
                              Get detailed information about our pricing and licensing options.
                            </p>
                            <Button variant="outline" className="w-full">Request Quote</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-border pt-8">
                        <h3 className="text-lg font-semibold mb-4">Contact Sales Directly</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1 p-4 bg-card rounded-lg">
                            <p className="font-medium">Email</p>
                            <a href="mailto:sales@networkguardian.in" className="text-primary hover:underline">
                              sales@networkguardian.in
                            </a>
                          </div>
                          <div className="flex-1 p-4 bg-card rounded-lg">
                            <p className="font-medium">Phone</p>
                            <a href="tel:+919876543212" className="text-primary hover:underline">
                              +91 98765 43212
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center animated-gradient-text inline-block">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">How quickly can I expect a response?</h3>
                <p className="text-muted-foreground">
                  We aim to respond to all inquiries within 24 hours during business days. For urgent matters, 
                  please call our customer support line.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Do you offer onsite support?</h3>
                <p className="text-muted-foreground">
                  Yes, for enterprise customers in select regions, we offer onsite support and installation services.
                  Contact our sales team for details.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can I schedule a product demonstration?</h3>
                <p className="text-muted-foreground">
                  Absolutely! You can request a demo through our business inquiries tab or by contacting our
                  sales team directly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What are your support hours?</h3>
                <p className="text-muted-foreground">
                  Our standard support hours are Monday to Friday, 9:00 AM to 6:00 PM IST. Premium support 
                  customers have access to extended hours support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center animated-gradient-text inline-block">Our Location</h2>
          <div className="w-full h-96 rounded-lg overflow-hidden border border-border/50 shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.3526488107526!2d72.55919903473412!3d23.02654092752954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84391e041b65%3A0x6baf7b88850b8b5!2sGLS%20University!5e0!3m2!1sen!2sin!4v1616784330000" 
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GLS University Location"
            ></iframe>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default ContactUsPage;
