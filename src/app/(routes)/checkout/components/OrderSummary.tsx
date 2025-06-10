import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types";

interface OrderSummaryProps {
  cartItems: CartItem[];
}

export function OrderSummary({ cartItems }: OrderSummaryProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
  const total = subtotal;

  const handleIncrement = (id: string) => {
    const item = cartItems.find((i) => i._id === id);
    if (item) dispatch(addToCart(item));
  };

  const handleDecrement = (id: string, qty: number) => {
    if (qty > 1) {
      dispatch(updateQuantity({ _id: id, quantity: qty - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <Card className="flex-1 shadow-md border-transparent bg-card rounded-t-none overflow-hidden mb-10">
      <div className="bg-primary rounded-t-md text-primary-foreground p-4 flex items-center gap-2 -mt-6">
        <ShoppingBag className="h-4 w-4" />
        <h2 className="text-sm font-semibold">Order Summary</h2>
      </div>

      <div className="p-5 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Add items to proceed with checkout.
            </p>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="mt-4 text-xs"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-4 text-xs font-medium text-muted-foreground pb-2 border-b">
              <span className="col-span-2">Item</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Price</span>
              <span className="text-right">Total</span>
            </div>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 gap-4 text-xs py-1 items-center"
              >
                <div className="col-span-2 flex items-center gap-2">
                  <span className="font-medium line-clamp-2 truncate">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1 border rounded-md p-1 mx-auto">
                  <button
                    onClick={() => handleDecrement(item._id, item.quantity)}
                    className="py-1 rounded-full hover:bg-accent"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="font-medium w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="py-1 rounded-full hover:bg-accent"
                  >
                    <Plus size={10} />
                  </button>
                </div>

                <span className="text-right">
                  ₹{item.unit_price.toFixed(2)}
                </span>
                <span className="text-right font-medium">
                  ₹{(item.unit_price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-accent/20 rounded-lg mt-6 space-y-1">
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-base pt-1">
            <span>Item Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
