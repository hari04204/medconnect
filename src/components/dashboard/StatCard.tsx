
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    trend: "up" | "down" | "neutral";
  };
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-medical-50 dark:bg-medical-900/30 flex items-center justify-center text-medical-600 dark:text-medical-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs flex items-center mt-1">
            <span
              className={cn(
                "mr-1",
                change.trend === "up" && "text-green-500",
                change.trend === "down" && "text-red-500"
              )}
            >
              {change.trend === "up" ? "↑" : change.trend === "down" ? "↓" : "→"}
            </span>
            <span
              className={cn(
                change.trend === "up" && "text-green-500",
                change.trend === "down" && "text-red-500",
                "font-medium"
              )}
            >
              {change.value}
            </span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
