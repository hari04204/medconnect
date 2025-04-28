
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  icon?: React.ReactNode;
  iconColor?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest medical updates and notifications</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-6 pb-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-6 pr-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center">
                    <div 
                      className={cn(
                        "absolute left-[17px] -translate-x-1/2 size-5 rounded-full border-2 border-background",
                        activity.iconColor || "bg-medical-500"
                      )}
                    >
                      {activity.icon}
                    </div>
                    <p className="text-sm text-muted-foreground ml-5">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="pt-1 sm:pt-0">
                    <p className="font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
