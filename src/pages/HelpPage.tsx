
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  ExternalLink, 
  Mail, 
  Youtube,
  MessagesSquare,
  Search,
  Github
} from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help & Documentation</h1>
          <p className="text-muted-foreground">
            Resources and assistance for using Network Guardian
          </p>
        </div>

        <div className="flex items-center relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search documentation and FAQs..." />
          <Button className="ml-2">Search</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Detailed product guides</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">Getting Started Guide</a>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">Network Scanning Tutorial</a>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">Security Best Practices</a>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">Full Documentation</a>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <BookOpen className="h-4 w-4" />
                Browse Documentation
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>Get help from our team</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email Support</p>
                    <p className="text-xs text-muted-foreground">Average response time: 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessagesSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Live Chat</p>
                    <p className="text-xs text-muted-foreground">Available 9am-5pm weekdays</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Github Issues</p>
                    <p className="text-xs text-muted-foreground">Bug reports & feature requests</p>
                  </div>
                </div>
              </div>
              <Button variant="default" className="w-full mt-4 gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Youtube className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Visual learning resources</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md overflow-hidden bg-secondary/50 aspect-video flex items-center justify-center">
                  <div className="p-3 bg-primary/90 rounded-full">
                    <Youtube className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-medium">Network Scanner Tutorial</p>
                <p className="text-xs text-muted-foreground">Learn how to perform your first network scan and interpret the results</p>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <ExternalLink className="h-4 w-4" />
                View All Tutorials
              </Button>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-8">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I perform a network scan?</AccordionTrigger>
            <AccordionContent>
              <p>To perform a network scan, navigate to the Devices page and click the "Scan Now" button. The application will then scan your local network for connected devices and display the results.</p>
              <p className="mt-2">You can also schedule automatic scans in the Settings page.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>What security threats does the application detect?</AccordionTrigger>
            <AccordionContent>
              <p>Network Guardian detects several types of security threats, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Open vulnerable ports (SSH, Telnet, RDP, etc.)</li>
                <li>Unauthorized devices on your network</li>
                <li>Devices with outdated firmware</li>
                <li>Unusual network traffic patterns</li>
                <li>Potential malware infections</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I export scan results?</AccordionTrigger>
            <AccordionContent>
              <p>You can export scan results in several formats:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>On the Devices page, click "Export" and select JSON format</li>
                <li>On the Statistics page, use the "Export CSV" button for tabular data</li>
                <li>For PDF reports, go to the Reports section and select "Generate Report"</li>
              </ol>
              <p className="mt-2">Exported data can be used for documentation or further analysis in other tools.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Is my network data sent to external servers?</AccordionTrigger>
            <AccordionContent>
              <p>No, Network Guardian operates entirely locally. Your network data stays on your device and is not sent to any external servers unless you explicitly enable cloud backup features.</p>
              <p className="mt-2">This ensures your network information remains private and secure.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I update the application?</AccordionTrigger>
            <AccordionContent>
              <p>Network Guardian automatically checks for updates when connected to the internet. When an update is available, you'll receive a notification.</p>
              <p className="mt-2">You can also manually check for updates in the Settings page under the "Application" tab.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger>What should I do if I find a security threat?</AccordionTrigger>
            <AccordionContent>
              <p>If a security threat is detected:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Review the details of the threat on the Threats page</li>
                <li>Follow the recommended actions provided by the application</li>
                <li>For device-specific threats, check the device's settings or firmware</li>
                <li>For network-level threats, review your router settings</li>
                <li>Rescan after taking action to verify the threat is resolved</li>
              </ol>
              <p className="mt-2">For assistance with serious security issues, contact technical support.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Button className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Community Forums
            </Button>
            <Button variant="secondary" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub Issues
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
