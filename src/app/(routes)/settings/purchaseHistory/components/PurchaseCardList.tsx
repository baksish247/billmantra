import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, ShoppingCart } from "lucide-react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function PurchaseCardList({ orders }: { orders: any[] }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{order.id}</div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            {order.date}
          </div>
          <div className="flex items-center text-sm gap-2 text-muted-foreground">
            <ShoppingCart className="w-4 h-4" />
            {order.items} items
            <span className="ml-auto font-medium text-base text-foreground">
              ₹{order.total}
            </span>
          </div>
          <Link
            href={`/settings/purchaseHistory/orderId/?id=${order.id}`}
            className="block"
          >
            <Button variant="outline" size="sm" className="w-full">
              View Order
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
