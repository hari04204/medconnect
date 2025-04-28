
import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-background to-medical-50 dark:from-background dark:to-medical-900/10">
      <div className="text-center mb-8">
        <div className="size-16 rounded-full bg-gradient-to-br from-medical-600 to-medical-400 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
          M
        </div>
        <h1 className="text-3xl font-bold text-gradient">MedConnect</h1>
        <p className="text-muted-foreground">Create your healthcare account</p>
      </div>
      
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
