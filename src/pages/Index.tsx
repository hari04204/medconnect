
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Calendar, FileText, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-medical-50 dark:from-background dark:to-medical-900/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="size-24 rounded-full bg-gradient-to-br from-medical-600 to-medical-400 flex items-center justify-center text-white text-4xl font-bold animate-scale-in">
            M
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient animate-fade-in">
            Welcome to MedConnect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in">
            Your comprehensive healthcare management platform. Streamline appointments, access medical records, and connect with healthcare providers all in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="gap-2">
              <Link to="/register">Get Started <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
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
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="medical-card bg-gradient-to-r from-medical-600 to-medical-400 text-white">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
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
      </div>
    </div>
  );
};

export default Index;
