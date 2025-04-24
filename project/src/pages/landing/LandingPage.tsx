import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, ServerCog, Users, MessageSquare, LineChart } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-950 to-primary-950 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Secure. Professional. <span className="text-primary-400">Reliable.</span>
              </h1>
              <p className="text-xl text-secondary-200 mb-8">
                DoomzDay403 provides cutting-edge security and tech solutions for your organization. Our platform gives you the control and insights needed in today's digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => window.location.href = '/login'}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DoomzDay403?</h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Our platform offers comprehensive tools to manage your organization's digital security and operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
                  <p className="text-secondary-600">
                    Enterprise-grade security with SSL encryption, password hashing, and regular security audits.
                  </p>
                </div>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Staff Management</h3>
                  <p className="text-secondary-600">
                    Comprehensive staff portal with role assignments, hierarchical permissions, and activity logging.
                  </p>
                </div>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Communication Tools</h3>
                  <p className="text-secondary-600">
                    Internal messaging system, notification center, and real-time alerts for your team.
                  </p>
                </div>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <ServerCog className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Technical Infrastructure</h3>
                  <p className="text-secondary-600">
                    Robust backend with secure API endpoints, regular backups, and performance monitoring.
                  </p>
                </div>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Lock className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Access Control</h3>
                  <p className="text-secondary-600">
                    Fine-grained permissions and hierarchical access controls to protect sensitive data.
                  </p>
                </div>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <LineChart className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-secondary-600">
                    Comprehensive analytics and reporting tools to monitor your operations.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Organization?</h2>
              <p className="text-xl text-primary-100 mb-8">
                Join countless organizations that trust DoomzDay403 for their security and management needs.
              </p>
              <Button
                variant="accent"
                size="lg"
                onClick={() => window.location.href = '/login'}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-secondary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Organizations</h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                See what our clients say about our services and solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="h-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-bold">AB</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">Alex Brown</h3>
                      <p className="text-sm text-secondary-500">CTO, TechCorp</p>
                    </div>
                  </div>
                  <p className="text-secondary-600">
                    "DoomzDay403's platform has revolutionized how we manage our team's access and communications. The security features give us peace of mind."
                  </p>
                </div>
              </Card>
              
              <Card className="h-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-bold">SJ</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">Sarah Johnson</h3>
                      <p className="text-sm text-secondary-500">CISO, Secure Inc.</p>
                    </div>
                  </div>
                  <p className="text-secondary-600">
                    "The role-based access control and staff management features are exactly what we needed. Implementation was smooth and the support team was exceptional."
                  </p>
                </div>
              </Card>
              
              <Card className="h-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-bold">DM</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">David Miller</h3>
                      <p className="text-sm text-secondary-500">CEO, StartupX</p>
                    </div>
                  </div>
                  <p className="text-secondary-600">
                    "As a growing company, we needed a solution that could scale with us. DoomzDay403 has been the perfect partner for our security and communication needs."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;