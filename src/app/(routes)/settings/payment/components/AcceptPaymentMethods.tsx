"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode } from "lucide-react";

const acceptedMethods = [
  {
    id: "ACC-001",
    type: "UPI",
    account: "grocery@upi",
  },
  {
    id: "ACC-002",
    type: "Bank Transfer",
    account: "A/C: 1234567890",
  },
  {
    id: "ACC-003",
    type: "Cash",
    account: "Accepts direct cash",
  },
];

export default function AcceptPaymentMethods() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Accepted Payment Methods</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {acceptedMethods.map((method) => (
          <Card key={method.id} className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              <h3 className="font-medium">{method.type}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{method.account}</p>
            <Button variant="outline" size="sm" className="w-full">Edit</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
