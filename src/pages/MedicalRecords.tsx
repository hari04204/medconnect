
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Filter, Calendar, Pill, TestTube, HeartPulse, ArrowUpRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for medical records
const records = [
  {
    id: "1",
    type: "Lab Results",
    title: "Complete Blood Count (CBC)",
    date: new Date(2025, 4, 15),
    doctor: {
      name: "Dr. Sarah Smith",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      specialty: "General Practitioner",
    },
    description: "Routine blood work panel for annual check-up",
    status: "normal",
    files: [
      {
        name: "CBC_Results.pdf",
        size: "1.2 MB",
      },
    ],
  },
  {
    id: "2",
    type: "Prescription",
    title: "Amoxicillin 500mg",
    date: new Date(2025, 4, 1),
    doctor: {
      name: "Dr. Michael Johnson",
      avatar: "https://i.pravatar.cc/150?u=michael",
      specialty: "Internal Medicine",
    },
    description: "Antibiotic for sinus infection. Take 1 tablet 3 times daily for 10 days.",
    status: "active",
    files: [
      {
        name: "Amoxicillin_Prescription.pdf",
        size: "853 KB",
      },
    ],
  },
  {
    id: "3",
    type: "Imaging",
    title: "Chest X-Ray",
    date: new Date(2025, 3, 20),
    doctor: {
      name: "Dr. Emily Wilson",
      avatar: "https://i.pravatar.cc/150?u=emily",
      specialty: "Radiologist",
    },
    description: "Routine chest x-ray for annual physical",
    status: "normal",
    files: [
      {
        name: "Chest_XRay_Front.jpg",
        size: "3.5 MB",
      },
      {
        name: "Chest_XRay_Side.jpg",
        size: "3.2 MB",
      },
      {
        name: "Radiology_Report.pdf",
        size: "1.1 MB",
      },
    ],
  },
  {
    id: "4",
    type: "Visit Summary",
    title: "Annual Physical Examination",
    date: new Date(2025, 3, 15),
    doctor: {
      name: "Dr. Sarah Smith",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      specialty: "General Practitioner",
    },
    description: "Routine annual physical examination with follow-up recommendations",
    status: "normal",
    files: [
      {
        name: "Annual_Physical_Summary.pdf",
        size: "975 KB",
      },
    ],
  },
];

// Group records by month for timeline view
const recordsByMonth: Record<string, typeof records> = {};
records.forEach((record) => {
  const monthYear = format(record.date, "MMMM yyyy");
  if (!recordsByMonth[monthYear]) {
    recordsByMonth[monthYear] = [];
  }
  recordsByMonth[monthYear].push(record);
});

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<(typeof records)[0] | null>(null);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "abnormal":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
  const getRecordIcon = (type: string) => {
    switch (type) {
      case "Lab Results":
        return <TestTube className="h-4 w-4" />;
      case "Prescription":
        return <Pill className="h-4 w-4" />;
      case "Imaging":
        return <HeartPulse className="h-4 w-4" />;
      case "Visit Summary":
        return <FileText className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  const filteredRecords = records.filter(
    (record) =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ml-16 lg:ml-64 animate-fade-in">
      <main className="pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-medical-600 to-medical-500 text-white">
          <div className="px-6 py-12 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold">
              Medical Records
            </h1>
            <p className="text-medical-50 mt-2">
              View and manage your healthcare records and documentation
            </p>
          </div>
        </div>

        {/* Medical records content */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medical records..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Types</DropdownMenuItem>
                <DropdownMenuItem>Lab Results</DropdownMenuItem>
                <DropdownMenuItem>Prescriptions</DropdownMenuItem>
                <DropdownMenuItem>Imaging</DropdownMenuItem>
                <DropdownMenuItem>Visit Summaries</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Time</DropdownMenuItem>
                <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                <DropdownMenuItem>Last Year</DropdownMenuItem>
                <DropdownMenuItem>Custom Range</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {selectedRecord ? (
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={() => setSelectedRecord(null)}
                className="mb-4"
              >
                ← Back to Records
              </Button>
              
              <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedRecord.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <div className="h-5 w-5 mr-2">
                        {getRecordIcon(selectedRecord.type)}
                      </div>
                      {selectedRecord.type} • {format(selectedRecord.date, "MMMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(selectedRecord.status)}>
                    {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Avatar>
                      <AvatarImage src={selectedRecord.doctor.avatar} />
                      <AvatarFallback>{selectedRecord.doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedRecord.doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedRecord.doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p>{selectedRecord.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Files</h3>
                    <div className="space-y-2">
                      {selectedRecord.files.map((file, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-medical-500" />
                            <span>{file.name}</span>
                            <span className="text-xs text-muted-foreground">({file.size})</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Tabs defaultValue="grid">
              <TabsList className="mb-8">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="grid" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <Card 
                        key={record.id} 
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedRecord(record)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 mb-2">
                              <div className="h-8 w-8 rounded-full bg-medical-100 dark:bg-medical-800/30 flex items-center justify-center">
                                {getRecordIcon(record.type)}
                              </div>
                              <span className="text-sm font-medium">{record.type}</span>
                            </div>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{record.title}</CardTitle>
                          <CardDescription>
                            {format(record.date, "MMMM d, yyyy")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={record.doctor.avatar} />
                              <AvatarFallback>{record.doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{record.doctor.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-medical-600 dark:text-medical-400 mt-4">
                            <FileText className="h-4 w-4" />
                            <span>{record.files.length} file{record.files.length !== 1 ? "s" : ""}</span>
                            <ArrowUpRight className="h-4 w-4 ml-auto" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">
                        No medical records match your search
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="timeline">
                <Card>
                  <CardContent className="pt-6">
                    {Object.keys(recordsByMonth).length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {Object.entries(recordsByMonth)
                          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                          .map(([month, monthRecords]) => (
                            <AccordionItem key={month} value={month}>
                              <AccordionTrigger className="text-lg font-medium">
                                {month}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pl-6 border-l-2 border-medical-200 dark:border-medical-800 space-y-6 py-2">
                                  {monthRecords.map((record) => (
                                    <div 
                                      key={record.id} 
                                      className="relative hover:bg-accent/50 -ml-6 pl-6 pr-4 py-3 rounded-md transition-colors cursor-pointer"
                                      onClick={() => setSelectedRecord(record)}
                                    >
                                      <div className="absolute left-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-medical-500" />
                                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                          <div className="flex items-center gap-2">
                                            {getRecordIcon(record.type)}
                                            <span className="text-sm text-muted-foreground">
                                              {record.type}
                                            </span>
                                            <Badge className={getStatusColor(record.status)}>
                                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                            </Badge>
                                          </div>
                                          <h3 className="font-medium mt-1">{record.title}</h3>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {format(record.date, "MMMM d, yyyy")} • {record.doctor.name}
                                          </p>
                                        </div>
                                        <div className="flex items-center text-sm text-medical-600 dark:text-medical-400">
                                          <FileText className="h-4 w-4 mr-1" />
                                          <span>{record.files.length} file{record.files.length !== 1 ? "s" : ""}</span>
                                          <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          No medical records match your search
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default MedicalRecords;
