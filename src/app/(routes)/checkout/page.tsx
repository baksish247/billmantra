"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useState, useEffect } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { OrderSummary } from "./components/OrderSummary";
import { CustomerDetails } from "./components/CustomerDetails";
import { PaymentButton } from "./components/PaymentButton";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import DiscountCode from "./components/DiscountCode";
import { useCreateBill } from "@/api-config/services/billService";
import { ORDER_TYPE, PAYMENT_MODE, PAYMENT_STATUS } from "@/enum";
import { toast } from "sonner";
import { Loader2, Router } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/app/redux/slices/cartSlice";
import { useRouter } from "next/navigation";

// Define types
type DiscountType = "percentage" | "amount";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, token } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PAYMENT_MODE>(
    PAYMENT_MODE.CASH
  );
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [needDelivery, setNeedDelivery] = useState<boolean>(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [orderProgress, setOrderProgress] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<string>("0");
  const [isDiscountApplied, setIsDiscountApplied] = useState<boolean>(false);
  const [discountType, setDiscountType] = useState<string>("percentage");
  const [discountValue, setDiscountValue] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Simulate progress when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderProgress(100);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
  const loggedInUser = user?.user;
  const shop = user?.shop;
  const deliveryFee = needDelivery ? Number(deliveryCharge) : 0;

  const calculateDiscount = (): number => {
    if (!isDiscountApplied) return 0;
    return discountType === "percentage" ? Number(discountValue) : 0;
  };

  const calculateDiscountAmount = (): number => {
    if (!isDiscountApplied) return 0;
    if (discountType === "percentage") {
      return Number((subtotal * Number(discountValue)) / 100);
    } else if (discountType === "amount") {
      return Number(discountValue);
    }
    return 0;
  };

  const discountAmt = calculateDiscountAmount();
  const total = subtotal + deliveryFee - discountAmt;

  const createOrderPayload = () => {
    if (!loggedInUser || !shop) {
      throw new Error("User or shop information is missing");
    }
    return {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: deliveryAddress,
      customer_id:
        "CUST" +
        Math.round(Math.random() * 1000000 + Date.now())
          .toString()
          .substring(6, 12),
      bill_origin: process.env.NEXT_PUBLIC_ORDER_ORIGIN || "INSTORE",
      shop_id: shop.id,
      payment_mode: paymentMethod,
      payment_status: PAYMENT_MODE.KHATA
        ? PAYMENT_STATUS.UNPAID
        : PAYMENT_STATUS.PAID,
      order_type: needDelivery ? ORDER_TYPE.DELIVERY : ORDER_TYPE.PICKUP,
      discount_percent: calculateDiscount(),
      discount_amount: calculateDiscountAmount(),
      items: cartItems.map((item) => ({
        display_name: item.name,
        product_id: item._id,
        qty: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
        measurement_unit: item.measurement_unit,
      })),
    };
  };

  const {
    mutateAsync: createBill,
    isLoading,
    isError,
    error,
  } = useCreateBill();

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }

    if (!customerName || !customerPhone) {
      toast.error("Please provide customer name and phone number.");
      return;
    }

    if (needDelivery && !deliveryAddress) {
      toast.error("Please provide a delivery address.");
      return;
    }

    try {
      const orderPayload = createOrderPayload();
      const response = await createBill({ data: orderPayload, token: token! });
      if (response) {
        toast.success("Order created successfully!", {
          description: "Your order has been placed and is being processed.",
        });
        // Reset form
        setCustomerName("");
        setCustomerPhone("");
        setDeliveryAddress("");
        setNeedDelivery(false);
        setDiscountValue("");
        setIsDiscountApplied(false);
        // Optionally redirect to success page
      }
      dispatch(clearCart());
      router.push("/home");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create order. Please try again.",
        {
          description: "An unexpected error occurred during order creation.",
        }
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-2 bg-gradient-to-b from-background to-accent/10 min-h-screen">
      <ProgressBar progress={orderProgress} />

      <div className="flex flex-col pb-40">
        <CustomerDetails
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          needDelivery={needDelivery}
          setNeedDelivery={setNeedDelivery}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          deliveryCharge={deliveryCharge}
          setDeliveryCharge={setDeliveryCharge}
        />
        <OrderSummary cartItems={cartItems} />
        <DiscountCode
          isDiscountApplied={isDiscountApplied}
          setDiscountType={setDiscountType}
          discountType={discountType}
          setIsDiscountApplied={setIsDiscountApplied}
          discountValue={discountValue}
          setDiscountValue={setDiscountValue}
        />

        <div className="flex items-center justify-between pt-4 text-center">
          <span className="text-sm text-foreground">
            You have given <strong>₹{discountAmt.toFixed(2)}</strong> discount.
          </span>
        </div>
      </div>

      <PaymentButton
        total={total}
        onClick={handlePlaceOrder}
        disabled={isLoading || !cartItems.length}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </div>
        ) : (
          "Complete Order"
        )}
      </PaymentButton>
    </div>
  );
}
