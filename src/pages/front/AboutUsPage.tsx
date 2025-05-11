
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Heart, Lightbulb } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  initial: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hard Pansara",
    role: "Developer",
    bio: "Hard is an experienced developer with expertise in network security and a passion for creating intuitive security tools. He focuses on backend architecture and security protocol implementation.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=HP&backgroundColor=0ea5e9",
    initial: "HP"
  },
  {
    name: "Yug Thacker",
    role: "Developer",
    bio: "Yug specializes in frontend development and user experience design. His work ensures that our security tools are accessible and easy to use for all users regardless of their technical background.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=YT&backgroundColor=0ea5e9",
    initial: "YT"
  },
  {
    name: "Aaditya Thacker",
    role: "Developer",
    bio: "Aaditya leads our threat intelligence research, helping to identify and mitigate network vulnerabilities. His technical expertise in cybersecurity is invaluable to the development of our security features.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AT&backgroundColor=0ea5e9",
    initial: "AT"
  },
  {
    name: "Dev Koshti",
    role: "Developer",
    bio: "Dev focuses on system architecture and performance optimization. His work ensures that our security applications run efficiently and can scale to meet the needs of both individual users and organizations.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=DK&backgroundColor=0ea5e9",
    initial: "DK"
  }
];

const AboutUsPage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section with animated gradient */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted relative overflow-hidden hero-pattern">
        <div className="blob w-72 h-72 top-1/4 -left-12 opacity-30"></div>
        <div className="blob w-96 h-96 bottom-1/4 right-0 animation-delay-2000 opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 animated-gradient-text inline-block">Our Team</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Meet the dedicated professionals behind Network Guardian who are passionate about network security and committed to protecting your digital assets
          </p>
        </div>
      </section>

      {/* Team Section with animated cards */}
      <section className="py-16 px-4 bg-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden h-full feature-card bg-card/80 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <div className="relative mb-6 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                    <Avatar className="h-32 w-32 relative">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-accent/80 text-white text-2xl">
                        {member.initial}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values with icons and animations */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted to-muted/30 relative">
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4 animated-gradient-text inline-block mx-auto">Our Values</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            These core principles guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 text-center hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously evolve our toolkit to stay ahead of emerging security threats and technologies.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 text-center hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-700">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of ethics and transparency in all our operations.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 text-center hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-1500">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-muted-foreground">
                We believe powerful security tools should be intuitive and accessible to users of all skill levels.
              </p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 text-center hover-lift">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-float animation-delay-2000">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-muted-foreground">
                Our users' security needs drive our development priorities and support practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History with enhanced styling */}
      <section className="py-16 px-4 bg-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-4 animated-gradient-text inline-block mx-auto">Our Story</h2>
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                The Inspiration Behind Our Tool
              </h3>
              <p className="text-lg mb-6 text-muted-foreground">
                It all started when we noticed an unfamiliar device connected to our home network. Concerned about potential security risks, we manually checked connected devices, only to realize how time-consuming and inefficient the process was. This raised a crucial question—how many people unknowingly have unauthorized devices on their networks, exposing them to data theft and privacy breaches?
              </p>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                Solution
              </h3>
              <p className="text-lg mb-6 text-muted-foreground">
                Determined to find a solution, we developed a tool that automates the detection of untrusted devices by scanning network details, identifying open ports, and enabling users to take action against potential threats. By making this process accessible and efficient, we aim to empower individuals and organizations to protect their networks and ensure digital privacy with ease.
              </p>
              
              <p className="text-lg text-muted-foreground">
                Today, our team of dedicated security experts, developers, and user experience professionals work 
                together to continuously improve Network Guardian, making it more powerful, intuitive, and responsive 
                to the evolving needs of our users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement with dramatic background */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-white text-shadow">Our Mission</h2>
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
            <p className="text-xl text-white font-medium italic">
              "To empower individuals and organizations with accessible, powerful network security tools that protect 
              digital assets and create a safer connected world."
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Skills Section */}
      <section className="py-16 px-4 bg-background relative">
        <div className="absolute inset-0 bg-cyber-grid opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8 animated-gradient-text inline-block mx-auto">Our Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover-lift">
              <h3 className="text-xl font-semibold mb-4">Technical Proficiency</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Network Security</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Device Detection</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Threat Analysis</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Penetration Testing</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6 hover-lift">
              <h3 className="text-xl font-semibold mb-4">Development Expertise</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">User Interface Design</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Backend Architecture</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Performance Optimization</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Data Visualization</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default AboutUsPage;
