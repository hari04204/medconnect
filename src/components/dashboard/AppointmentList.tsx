
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Appointment {
  id: string;
  title: string;
  doctor: {
    name: string;
    avatar?: string;
    specialty: string;
  };
  date: Date;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface AppointmentListProps {
  appointments: Appointment[];
  className?: string;
}

export function AppointmentList({ appointments, className }: AppointmentListProps) {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          Your scheduled appointments for the next few days
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={appointment.doctor.avatar} alt={appointment.doctor.name} />
                    <AvatarFallback className="bg-medical-100 text-medical-800">
                      {appointment.doctor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{appointment.title}</p>
                      <Badge className={cn("ml-2", getStatusColor(appointment.status))}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor.name} • {appointment.doctor.specialty}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {format(appointment.date, "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {appointment.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No upcoming appointments</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button variant="outline" className="w-full" asChild>
          <a href="/appointments">View All Appointments</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
