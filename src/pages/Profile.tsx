
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Save } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "555-123-4567", // Mock data
    dateOfBirth: "1985-05-15", // Mock data
    address: "123 Main St, Anytown, CA 12345", // Mock data
  });
  
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: "O+", // Mock data
    allergies: "Penicillin", // Mock data
    chronicConditions: "None", // Mock data
    currentMedications: "Vitamin D, Iron supplement", // Mock data
    emergencyContactName: "Jane Doe", // Mock data
    emergencyContactPhone: "555-987-6543", // Mock data
  });
  
  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: "HealthPlus Insurance", // Mock data
    policyNumber: "HP-123456789", // Mock data
    groupNumber: "GR-987654", // Mock data
    primaryHolder: "Self", // Mock data
    expirationDate: "2026-12-31", // Mock data
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleMedicalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMedicalInfo({
      ...medicalInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleInsuranceInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsuranceInfo({
      ...insuranceInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the profile data
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen ml-16 lg:ml-64 animate-fade-in">
      <main className="pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-medical-600 to-medical-500 text-white">
          <div className="px-6 py-12 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold">
              My Profile
            </h1>
            <p className="text-medical-50 mt-2">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        {/* Profile content */}
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 border-4 border-background">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-2xl bg-medical-200">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-muted-foreground">{user?.role}</p>
                    
                    <Button variant="outline" className="w-full mt-4">
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                      <p>{user?.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Member Since</h3>
                      <p>April 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal">
                <TabsList className="mb-8">
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="medical">Medical Information</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your basic personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="fullName">
                              Full Name
                            </label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={personalInfo.fullName}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">
                              Email
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={personalInfo.email}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="phone">
                              Phone
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={personalInfo.phone}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="dateOfBirth">
                              Date of Birth
                            </label>
                            <Input
                              id="dateOfBirth"
                              name="dateOfBirth"
                              type="date"
                              value={personalInfo.dateOfBirth}
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="address">
                            Address
                          </label>
                          <Input
                            id="address"
                            name="address"
                            value={personalInfo.address}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                          <Button type="submit">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="medical">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical Information</CardTitle>
                      <CardDescription>
                        Manage your health-related information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="bloodType">
                              Blood Type
                            </label>
                            <Input
                              id="bloodType"
                              name="bloodType"
                              value={medicalInfo.bloodType}
                              onChange={handleMedicalInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="allergies">
                              Allergies
                            </label>
                            <Input
                              id="allergies"
                              name="allergies"
                              value={medicalInfo.allergies}
                              onChange={handleMedicalInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="chronicConditions">
                            Chronic Conditions
                          </label>
                          <textarea
                            id="chronicConditions"
                            name="chronicConditions"
                            value={medicalInfo.chronicConditions}
                            onChange={handleMedicalInfoChange}
                            className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="currentMedications">
                            Current Medications
                          </label>
                          <textarea
                            id="currentMedications"
                            name="currentMedications"
                            value={medicalInfo.currentMedications}
                            onChange={handleMedicalInfoChange}
                            className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="emergencyContactName">
                              Emergency Contact Name
                            </label>
                            <Input
                              id="emergencyContactName"
                              name="emergencyContactName"
                              value={medicalInfo.emergencyContactName}
                              onChange={handleMedicalInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="emergencyContactPhone">
                              Emergency Contact Phone
                            </label>
                            <Input
                              id="emergencyContactPhone"
                              name="emergencyContactPhone"
                              type="tel"
                              value={medicalInfo.emergencyContactPhone}
                              onChange={handleMedicalInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                          <Button type="submit">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insurance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Insurance Information</CardTitle>
                      <CardDescription>
                        Manage your health insurance details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="provider">
                            Insurance Provider
                          </label>
                          <Input
                            id="provider"
                            name="provider"
                            value={insuranceInfo.provider}
                            onChange={handleInsuranceInfoChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="policyNumber">
                              Policy Number
                            </label>
                            <Input
                              id="policyNumber"
                              name="policyNumber"
                              value={insuranceInfo.policyNumber}
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="groupNumber">
                              Group Number
                            </label>
                            <Input
                              id="groupNumber"
                              name="groupNumber"
                              value={insuranceInfo.groupNumber}
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="primaryHolder">
                              Primary Policy Holder
                            </label>
                            <Input
                              id="primaryHolder"
                              name="primaryHolder"
                              value={insuranceInfo.primaryHolder}
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="expirationDate">
                              Expiration Date
                            </label>
                            <Input
                              id="expirationDate"
                              name="expirationDate"
                              type="date"
                              value={insuranceInfo.expirationDate}
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                          <Button type="submit">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
