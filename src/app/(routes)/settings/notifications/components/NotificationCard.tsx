// app/notifications/components/NotificationCard.tsx
"use client";

import { Notification } from "../lib/mockNotifications";
import { CalendarDays, Truck, AlertCircle, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationCard({ notification }: { notification: Notification }) {
  const iconMap = {
    restock: <AlertCircle className="text-red-500 w-5 h-5" />,
    supplied: <Truck className="text-green-500 w-5 h-5" />,
    "low-stock": <AlertCircle className="text-yellow-500 w-5 h-5" />,
    "payment-due": <IndianRupee className="text-blue-500 w-5 h-5" />,
  };

  return (
    <div
      className={cn(
        "flex items-start gap-4 border p-4 rounded-md shadow-sm",
        !notification.read && "bg-muted"
      )}
    >
      {iconMap[notification.type]}
      <div className="flex-1 space-y-1">
        <p className="text-sm">{notification.message}</p>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <CalendarDays className="w-3 h-3" />
          {new Date(notification.date).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
