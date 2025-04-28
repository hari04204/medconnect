
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  ClipboardList,
  Home,
  LineChart,
  MessageSquare,
  Settings,
  Users,
  FileText,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActiveRoute = (path: string) => location.pathname === path;
  
  const navigationItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Appointments",
      icon: CalendarIcon,
      href: "/appointments",
      notification: 2,
    },
    {
      label: "Medical Records",
      icon: FileText,
      href: "/medical-records",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/messages",
      notification: 5,
    },
  ];
  
  // Additional items based on user role
  const doctorItems = [
    {
      label: "Patients",
      icon: Users,
      href: "/patients",
    },
    {
      label: "Analytics",
      icon: LineChart,
      href: "/analytics",
    },
  ];
  
  const bottomItems = [
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];
  
  const renderNavigationItem = (item: typeof navigationItems[0]) => {
    return (
      <TooltipProvider key={item.href}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActiveRoute(item.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:inline">{item.label}</span>
              {item.notification && (
                <Badge 
                  className="ml-auto bg-medical-300 text-black hover:bg-medical-400 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {item.notification}
                </Badge>
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="lg:hidden">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  return (
    <div className="fixed inset-y-0 left-0 z-20 hidden h-full w-16 flex-col border-r bg-sidebar sm:flex lg:w-64">
      <div className="flex h-16 items-center border-b border-sidebar-border px-4 lg:px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-medical-500 to-medical-300 flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-bold text-xl hidden lg:inline-flex text-sidebar-foreground">
            MedConnect
          </span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 overflow-auto py-4">
        <nav className="grid gap-2 px-2">
          {navigationItems.map(renderNavigationItem)}
          
          {user?.role === "doctor" && (
            <>
              <div className="relative my-2 h-px">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-sidebar-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-sidebar px-2 text-muted-foreground hidden lg:inline-flex">
                    Doctor Tools
                  </span>
                </div>
              </div>
              
              {doctorItems.map(renderNavigationItem)}
            </>
          )}
        </nav>
      </ScrollArea>
      
      <div className="mt-auto border-t border-sidebar-border">
        <nav className="grid gap-2 p-2">
          {bottomItems.map(renderNavigationItem)}
        </nav>
      </div>
    </div>
  );
}
