"use client";

import { PackageCheck } from "lucide-react";
import PurchaseTable from "./components/PurchaseTable";
import PurchaseCardList from "./components/PurchaseCardList";
import { useAuth } from "@/app/redux/providers/AuthProvider";

const mockPurchases = [
  {
    id: "ORD-001",
    date: "2025-04-22",
    items: 3,
    total: 875,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2025-04-18",
    items: 1,
    total: 150,
    status: "Processing",
  },
  {
    id: "ORD-003",
    date: "2025-04-10",
    items: 5,
    total: 1320,
    status: "Cancelled",
  },
];

export default function PurchaseHistory() {

  const {user, token} = useAuth();
  return (
    <div className="container mx-auto px-4 py-8 mb-10">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <PackageCheck className="w-5 h-5" />
        Purchase History
      </h1>
      <div className="hidden sm:block">
        <PurchaseTable orders={mockPurchases} />
      </div>
      <div className="sm:hidden">
        <PurchaseCardList orders={mockPurchases} />
      </div>
    </div>
  );
}
