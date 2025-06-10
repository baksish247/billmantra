import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function PurchaseTable({ orders }: { orders: any[] }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-accent/50">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.items}</td>
                <td className="p-4 font-medium">₹{order.total}</td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/settings/purchaseHistory/orderId/?id=${order.id}`}>
                    <Button variant="outline" size="sm">
                      View Order
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
