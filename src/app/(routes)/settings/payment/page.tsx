"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Banknote,
  Plus,
  Trash2,
  Pencil,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

const acceptMethods = [
  { id: "a1", type: "UPI", details: "store@upi" },
  { id: "a2", type: "Cash", details: "In-person cash" },
];

const payMethods = [
  { id: "p1", type: "Bank Transfer", details: "SBI - ****1122" },
  { id: "p2", type: "Credit Card", details: "**** **** **** 7788" },
];

export default function PaymentMethodsPage() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-10">
      {/* Accept Payments Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ArrowDownCircle className="w-5 h-5 text-green-600" />
            Accept Payments
          </h2>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Accept Method
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acceptMethods.map((method) => (
            <Card key={method.id} className="p-4 space-y-2 hover:shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Banknote className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold">{method.type}</p>
                    <p className="text-xs text-muted-foreground">{method.details}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Make Payments Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5 text-blue-600" />
            Make Payments
          </h2>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {payMethods.map((method) => (
            <Card key={method.id} className="p-4 space-y-2 hover:shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {method.type === "Credit Card" ? (
                    <CreditCard className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Banknote className="w-5 h-5 text-blue-500" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{method.type}</p>
                    <p className="text-xs text-muted-foreground">{method.details}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
