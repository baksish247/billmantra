"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, Landmark } from "lucide-react";

const makePayments = [
  {
    id: "PAY-001",
    type: "Bank Account",
    account: "A/C: 9998877665",
    bank: "State Bank of India",
  },
  {
    id: "PAY-002",
    type: "Credit Card",
    account: "XXXX-XXXX-XXXX-1234",
    bank: "HDFC Bank",
  },
];

export default function MakePaymentMethods() {
  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-xl font-semibold">Payment Methods to Suppliers</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {makePayments.map((method) => (
          <Card key={method.id} className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5" />
              <h3 className="font-medium">{method.type}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{method.account}</p>
            <p className="text-sm text-muted-foreground">{method.bank}</p>
            <Button variant="outline" size="sm" className="w-full">Edit</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
