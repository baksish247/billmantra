"use client";

import { useState } from "react";
import { AdvancedSettingToggle } from "./components/AdvancedSettingToggle";
import { useAuth } from "@/app/redux/providers/AuthProvider";

export default function AdvancedSettingsPage() {
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const { user } = useAuth();

  return (
    <div className="container px-4 py-6 space-y-6 mb-15">
      <h1 className="text-xl font-bold">Advanced Settings</h1>

      {/* User Details */}
      <div className="border p-6 rounded-lg bg-white shadow-sm dark:bg-zinc-900 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200">
          User Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            <span className="font-medium">Name:</span> {user?.user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.user.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user?.user.phone}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user?.user.role}
          </p>
        </div>
      </div>

      {/* Shop Details */}
      <div className="border p-6 rounded-lg bg-white shadow-sm dark:bg-zinc-900 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2 text-zinc-800 dark:text-zinc-200">
          Shop Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            <span className="font-medium">Name:</span> {user?.shop.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.shop.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user?.shop.phone}
          </p>
          <p>
            <span className="font-medium">GST Number:</span>{" "}
            {user?.shop.gst_number}
          </p>
          <p>
            <span className="font-medium">Online Orders:</span>{" "}
            <span
              className={
                user?.shop.accept_online_orders
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {user?.shop.accept_online_orders ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p>
            <span className="font-medium">Online Payments:</span>{" "}
            <span
              className={
                user?.shop.accept_online_payments
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {user?.shop.accept_online_payments ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p>
            <span className="font-medium">Delivery:</span>{" "}
            <span
              className={
                user?.shop.delivery_available
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {user?.shop.delivery_available ? "Available" : "Unavailable"}
            </span>
          </p>
          <p>
            <span className="font-medium">Street: </span>
            {user?.shop.location.street}
          </p>
          <p>
            <span className="font-medium">Locality: </span>
            {user?.shop.location.locality}
          </p>
          <p>
            <span className="font-medium">City: </span>
            {user?.shop.location.city}
          </p>
          <p>
            <span className="font-medium">State: </span>
            {user?.shop.location.state}
          </p>
          <p>
            <span className="font-medium">Pincode: </span>
            {user?.shop.location.pincode}
          </p>
        </div>
      </div>

      {/* Advanced Settings */}
      <AdvancedSettingToggle
        label="Enable Low Stock Alerts"
        description="Notify when stock falls below the threshold."
        value={lowStockAlerts}
        onChange={setLowStockAlerts}
      />
    </div>
  );
}
