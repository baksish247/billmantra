"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Building, CalendarDays } from "lucide-react";

const mockSuppliers = [
  {
    id: "SUP-001",
    name: "Ravi Traders",
    contact: "+91 98765 43210",
    email: "ravi@traders.com",
    company: "Ravi Wholesale",
    orders: 24,
    totalSpent: 152000,
    lastOrder: "2025-04-20",
  },
  {
    id: "SUP-002",
    name: "GreenGrow Supplies",
    contact: "+91 91234 56789",
    email: "support@greengrow.com",
    company: "GreenGrow Pvt Ltd",
    orders: 12,
    totalSpent: 74500,
    lastOrder: "2025-04-18",
  },
  {
    id: "SUP-003",
    name: "DailyFresh Vendors",
    contact: "+91 99887 77665",
    email: "daily@fresh.com",
    company: "DailyFresh Foods",
    orders: 35,
    totalSpent: 203000,
    lastOrder: "2025-04-15",
  },
];

export default function SupplierPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Suppliers & Vendors</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {mockSuppliers.map((supplier) => (
          <Card
            key={supplier.id}
            className="p-5 border border-gray-200 hover:shadow-lg transition rounded-2xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{supplier.name}</h2>
                <p className="text-sm text-gray-500">{supplier.company}</p>
              </div>
              <Badge className="text-xs rounded-md px-2 py-0.5" variant="secondary">
                #{supplier.id}
              </Badge>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                {supplier.contact}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                {supplier.email}
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="font-medium text-gray-800">Orders:</span>{" "}
                {supplier.orders}
              </p>
              <p>
                <span className="font-medium text-gray-800">Total Spent:</span>{" "}
                ₹{supplier.totalSpent.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Last Order: {supplier.lastOrder}</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full mt-5 text-sm">
              Past Orders
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
