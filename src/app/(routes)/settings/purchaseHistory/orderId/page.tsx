// app/settings/purchase-history/[orderId]/page.tsx
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ShoppingCart, PackageCheck } from "lucide-react";

interface PageProps {
  params: {
    orderId: string;
  };
}

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

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetailPage() {

  const params = { orderId: "ORD-001" }; // Replace with actual params from context or props
  const order = mockPurchases.find((o) => o.id === params.orderId);
  if (!order) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <PackageCheck className="w-5 h-5" />
        Order Details
      </h1>

      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{order.id}</h2>
          <Badge className={`${statusColors[order.status]} text-sm`}>{order.status}</Badge>
        </div>

        <div className="text-muted-foreground text-sm flex gap-4 items-center">
          <CalendarDays className="h-4 w-4" />
          <span>{order.date}</span>
        </div>

        <div className="text-muted-foreground text-sm flex gap-4 items-center">
          <ShoppingCart className="h-4 w-4" />
          <span>{order.items} items</span>
        </div>

        <div className="text-lg font-bold text-primary">Total: ₹{order.total}</div>
      </Card>
    </div>
  );
}
