
import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ClipboardList, Heart, Activity, LineChart, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data
const mockAppointments = [
  {
    id: "1",
    title: "Annual Physical Checkup",
    doctor: {
      name: "Dr. Sarah Smith",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      specialty: "General Practitioner",
    },
    date: new Date(2025, 4, 30),  // May 30, 2025
    time: "10:00 AM",
    location: "Main Hospital, Room 302",
    status: "upcoming" as const,
  },
  {
    id: "2",
    title: "Cardiology Consultation",
    doctor: {
      name: "Dr. Michael Johnson",
      avatar: "https://i.pravatar.cc/150?u=michael",
      specialty: "Cardiologist",
    },
    date: new Date(2025, 5, 5),   // June 5, 2025
    time: "2:30 PM",
    location: "Medical Center, Wing B",
    status: "upcoming" as const,
  },
];

const mockActivities = [
  {
    id: "1",
    title: "Prescription Refill",
    description: "Your medication prescription for Amoxicillin has been refilled and is ready for pickup.",
    timestamp: new Date(2025, 4, 27),  // May 27, 2025
  },
  {
    id: "2",
    title: "Lab Results Available",
    description: "Your blood work results from your recent visit are now available in your medical records.",
    timestamp: new Date(2025, 4, 25),  // May 25, 2025
  },
  {
    id: "3",
    title: "Insurance Claim Processed",
    description: "Your insurance claim #HC29384 has been processed and approved.",
    timestamp: new Date(2025, 4, 23),  // May 23, 2025
  },
  {
    id: "4",
    title: "Appointment Confirmation",
    description: "Your appointment with Dr. Sarah Smith has been confirmed for May 30, 2025.",
    timestamp: new Date(2025, 4, 20),  // May 20, 2025
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen ml-16 lg:ml-64 animate-fade-in">
      <main className="pb-16">
        {/* Welcome section */}
        <div className="bg-gradient-to-r from-medical-600 to-medical-500 text-white">
          <div className="px-6 py-12 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-medical-50 mt-2">
              Your health dashboard is up to date. Here's what's happening with your healthcare.
            </p>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Upcoming Appointments"
              value="2"
              icon={<CalendarDays className="h-4 w-4" />}
              change={{ value: "+1", trend: "up" }}
            />
            <StatCard
              title="Open Prescriptions"
              value="3"
              icon={<ClipboardList className="h-4 w-4" />}
              change={{ value: "0", trend: "neutral" }}
            />
            <StatCard
              title="Heart Rate"
              value="72 bpm"
              icon={<Heart className="h-4 w-4" />}
              change={{ value: "-3", trend: "down" }}
              description="Last measured: Today, 8:30 AM"
            />
            <StatCard
              title="Activity Score"
              value="85/100"
              icon={<Activity className="h-4 w-4" />}
              change={{ value: "+5", trend: "up" }}
              description="Based on your daily activity"
            />
          </div>

          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AppointmentList appointments={mockAppointments} className="mb-6" />
              
              {user?.role === "doctor" && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Patient Overview</CardTitle>
                    <CardDescription>
                      Your current patient statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
                          <Users className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Patients</p>
                          <p className="text-2xl font-bold">124</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-300">
                          <CalendarDays className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Appointments Today</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {user?.role === "doctor" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Patient Visits</CardTitle>
                    <CardDescription>
                      Number of patient visits over the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-12 w-12 mb-2 text-medical-500" />
                      <p>Chart would be displayed here with real data</p>
                      <p className="text-sm">(This is a placeholder)</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <RecentActivity activities={mockActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
