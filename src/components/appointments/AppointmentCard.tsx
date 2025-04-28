
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
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
  onReschedule?: () => void;
  onCancel?: () => void;
}

export function AppointmentCard({
  id,
  title,
  doctor,
  date,
  time,
  location,
  status,
  onReschedule,
  onCancel,
}: AppointmentCardProps) {
  const getStatusColor = (status: AppointmentCardProps["status"]) => {
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
    <Card className="animate-scale-in overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-1.5 w-full bg-medical-500" />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback className="bg-medical-100 text-medical-800">
                {doctor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Dr. {doctor.name} • {doctor.specialty}
              </p>
            </div>
          </div>
          <Badge className={cn(getStatusColor(status))}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col">
            <div className="flex items-center text-sm">
              <CalendarIcon className="mr-2 h-4 w-4 text-medical-500" />
              <strong>Date</strong>
            </div>
            <p className="mt-1 text-muted-foreground">
              {format(date, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-medical-500" />
              <strong>Time</strong>
            </div>
            <p className="mt-1 text-muted-foreground">{time}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-medical-500" />
              <strong>Location</strong>
            </div>
            <p className="mt-1 text-muted-foreground">{location}</p>
          </div>
        </div>
      </CardContent>
      
      {status === "upcoming" && (
        <CardFooter className="flex justify-between gap-2 border-t px-6 py-4 bg-background">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onReschedule}
          >
            Reschedule
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
