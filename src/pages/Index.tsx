
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Calendar, FileText, Users, Mail, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-medical-50 dark:from-background dark:to-medical-900/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="size-24 lg:size-32 rounded-full bg-gradient-to-br from-medical-600 to-medical-400 flex items-center justify-center text-white text-4xl lg:text-5xl font-bold animate-scale-in">
              M
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient animate-fade-in">
              Welcome to MedConnect
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in">
              Your comprehensive healthcare management platform. Streamline appointments, access medical records, and connect with healthcare providers all in one place.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in">
              <Button asChild size="lg" className="gap-2">
                <Link to="/register">Get Started <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Healthcare Professional"
              className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose MedConnect?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience healthcare management like never before with our comprehensive suite of features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Calendar,
              title: "Appointment Management",
              description: "Schedule and manage your medical appointments with ease"
            },
            {
              icon: FileText,
              title: "Medical Records",
              description: "Access your complete medical history securely"
            },
            {
              icon: Users,
              title: "Healthcare Network",
              description: "Connect with healthcare providers seamlessly"
            },
            {
              icon: Heart,
              title: "Health Monitoring",
              description: "Track your health metrics and progress"
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="medical-card hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <feature.icon className="h-12 w-12 text-medical-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section with Image */}
      <div className="container mx-auto px-4 py-16">
        <div className="medical-card bg-gradient-to-r from-medical-600 to-medical-400 text-white overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 p-8">
              <div className="text-center lg:text-left space-y-6 max-w-2xl">
                <h2 className="text-3xl font-bold">Ready to Take Control of Your Healthcare?</h2>
                <p className="text-lg opacity-90">
                  Join MedConnect today and experience a new way of managing your health
                </p>
                <Button asChild size="lg" variant="secondary" className="gap-2">
                  <Link to="/register">
                    Get Started Now <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="Technology in Healthcare"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About MedConnect</h3>
              <p className="text-muted-foreground">
                Revolutionizing healthcare management through innovative technology and seamless connectivity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-muted-foreground hover:text-medical-600">Get Started</Link></li>
                <li><Link to="/login" className="text-muted-foreground hover:text-medical-600">Sign In</Link></li>
                <li><a href="#features" className="text-muted-foreground hover:text-medical-600">Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-medical-600">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-medical-600">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-medical-600">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  support@medconnect.com
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MedConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
