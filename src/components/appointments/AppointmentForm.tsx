
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AppointmentFormProps {
  onSubmit: (data: {
    doctorId: string;
    date: Date;
    time: string;
    type: string;
    notes: string;
  }) => void;
  onCancel: () => void;
}

// Mock data for doctors
const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    specialty: "Cardiology",
    availability: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"],
  },
  {
    id: "2",
    name: "Dr. Michael Johnson",
    specialty: "Dermatology",
    availability: ["8:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
  },
  {
    id: "3",
    name: "Dr. Emily Wilson",
    specialty: "Neurology",
    availability: ["10:00 AM", "11:00 AM", "2:30 PM", "4:30 PM"],
  },
];

// Appointment types
const appointmentTypes = [
  "Regular Check-up",
  "Follow-up Appointment",
  "Consultation",
  "Urgent Care",
  "Specialist Referral",
];

export function AppointmentForm({ onSubmit, onCancel }: AppointmentFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  // Get selected doctor information
  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!doctorId || !date || !time || !type) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({
      doctorId,
      date,
      time,
      type,
      notes,
    });
    
    toast({
      title: "Appointment scheduled",
      description: `Your appointment has been scheduled for ${format(date, "MMMM d, yyyy")} at ${time}`,
    });
  };

  return (
    <Card className="w-full max-w-lg animate-fade-in">
      <CardHeader>
        <CardTitle>Schedule an Appointment</CardTitle>
        <CardDescription>
          Fill out the form below to schedule a new appointment with one of our healthcare providers.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Select Doctor
            </label>
            <Select value={doctorId} onValueChange={setDoctorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      // Disable past dates, weekends, and dates more than 3 months in the future
                      const now = new Date();
                      const threeMothsFromNow = new Date();
                      threeMothsFromNow.setMonth(now.getMonth() + 3);
                      
                      return (
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date > threeMothsFromNow ||
                        date.getDay() === 0 || 
                        date.getDay() === 6
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select Time
              </label>
              <Select value={time} onValueChange={setTime} disabled={!doctorId || !date}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {selectedDoctor?.availability.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Appointment Type
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Notes (Optional)
            </label>
            <textarea
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Add any additional information that may be helpful for your appointment"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-medical-600 to-medical-500 hover:from-medical-700 hover:to-medical-600"
          >
            Schedule Appointment
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
