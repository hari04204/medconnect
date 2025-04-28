
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    title: "Annual Physical Checkup",
    doctor: {
      name: "Sarah Smith",
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
      name: "Michael Johnson",
      avatar: "https://i.pravatar.cc/150?u=michael",
      specialty: "Cardiologist",
    },
    date: new Date(2025, 5, 5),   // June 5, 2025
    time: "2:30 PM",
    location: "Medical Center, Wing B",
    status: "upcoming" as const,
  },
  {
    id: "3",
    title: "Dental Cleaning",
    doctor: {
      name: "Emily Wilson",
      avatar: "https://i.pravatar.cc/150?u=emily",
      specialty: "Dentist",
    },
    date: new Date(2025, 4, 15),  // May 15, 2025
    time: "9:00 AM",
    location: "Dental Clinic, 2nd Floor",
    status: "completed" as const,
  },
  {
    id: "4",
    title: "Eye Examination",
    doctor: {
      name: "Robert Davis",
      avatar: "https://i.pravatar.cc/150?u=robert",
      specialty: "Ophthalmologist",
    },
    date: new Date(2025, 4, 10),  // May 10, 2025
    time: "1:15 PM",
    location: "Vision Center, Suite 120",
    status: "cancelled" as const,
  },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  const handleReschedule = (id: string) => {
    toast({
      title: "Reschedule requested",
      description: "You can now select a new date and time for your appointment",
    });
  };
  
  const handleCancel = (id: string) => {
    // Update the appointment status to cancelled
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "cancelled" as const }
          : appointment
      )
    );
    
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been successfully cancelled",
    });
  };
  
  const handleNewAppointment = (data: any) => {
    // Create a new appointment object
    const newAppointment = {
      id: `${appointments.length + 1}`,
      title: data.type,
      doctor: {
        name: "Sarah Smith", // Using a default doctor for demo
        avatar: "https://i.pravatar.cc/150?u=sarah",
        specialty: "General Practitioner",
      },
      date: data.date,
      time: data.time,
      location: "Main Hospital, Room 302", // Default location
      status: "upcoming" as const,
    };
    
    // Add the new appointment to the list
    setAppointments([...appointments, newAppointment]);
    
    // Hide the form
    setShowForm(false);
  };
  
  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "upcoming"
  );
  
  const pastAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );
  
  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "cancelled"
  );

  return (
    <div className="min-h-screen ml-16 lg:ml-64 animate-fade-in">
      <main className="pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-medical-600 to-medical-500 text-white">
          <div className="px-6 py-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Appointments
                </h1>
                <p className="text-medical-50 mt-2">
                  Manage and schedule your healthcare appointments
                </p>
              </div>
              
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-white text-medical-700 hover:bg-medical-50 whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" />
                {showForm ? "Cancel" : "New Appointment"}
              </Button>
            </div>
          </div>
        </div>

        {/* Appointment form or appointment list */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          {showForm ? (
            <div className="max-w-lg mx-auto">
              <AppointmentForm 
                onSubmit={handleNewAppointment}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-8">
                <TabsTrigger value="upcoming">
                  Upcoming ({upcomingAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past ({pastAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledAppointments.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-6">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      {...appointment}
                      onReschedule={() => handleReschedule(appointment.id)}
                      onCancel={() => handleCancel(appointment.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-medium">No upcoming appointments</p>
                    <p className="mt-2">Schedule a new appointment to get started</p>
                    <Button
                      onClick={() => setShowForm(true)}
                      className="mt-6"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-6">
                {pastAppointments.length > 0 ? (
                  pastAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-medium">No past appointments</p>
                    <p className="mt-2">Your completed appointments will appear here</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cancelled" className="space-y-6">
                {cancelledAppointments.length > 0 ? (
                  cancelledAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-medium">No cancelled appointments</p>
                    <p className="mt-2">Your cancelled appointments will appear here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
