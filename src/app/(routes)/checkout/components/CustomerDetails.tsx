import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PAYMENT_MODE } from "@/enum";
import { User, Phone, Truck, Wallet, CreditCard, Check } from "lucide-react";

interface CustomerDetailsProps {
  customerName: string;
  setCustomerName: React.Dispatch<React.SetStateAction<string>>;
  customerPhone: string;
  setCustomerPhone: React.Dispatch<React.SetStateAction<string>>;
  needDelivery: boolean;
  setNeedDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  deliveryAddress: string;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: PAYMENT_MODE
  setPaymentMethod: React.Dispatch<React.SetStateAction<PAYMENT_MODE>>;
  deliveryCharge: string;
  setDeliveryCharge: React.Dispatch<React.SetStateAction<string>>;
}

export function CustomerDetails({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  needDelivery,
  setNeedDelivery,
  deliveryAddress,
  setDeliveryAddress,
  paymentMethod,
  setPaymentMethod,
  deliveryCharge,
  setDeliveryCharge,
}: CustomerDetailsProps) {
  return (
    <Card className="flex-1 shadow-md border-transparent bg-card rounded-t-none overflow-hidden mb-10">
      <div className="bg-primary rounded-t-md text-primary-foreground p-4 flex items-center gap-2 -mt-6">
        <User className="h-4 w-4" />
        <h2 className="text-sm font-semibold">Customer Details</h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="cust-name"
              className="text-xs font-medium flex items-center gap-1"
            >
              <User className="h-3 w-3" /> Name
            </Label>
            <Input
              id="cust-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="cust-phone"
              className="text-xs font-medium flex items-center gap-1"
            >
              <Phone className="h-3 w-3" /> Phone Number
            </Label>
            <Input
              id="cust-phone"
              type="number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter phone number"
              className="text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Delivery Option */}
        <div className="bg-accent/10 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <Label
                htmlFor="need-delivery"
                className="text-sm font-medium cursor-pointer"
              >
                Delivery Required
              </Label>
            </div>
            <div className="relative">
              <input
                id="need-delivery"
                type="checkbox"
                checked={needDelivery}
                onChange={(e) => setNeedDelivery(e.target.checked)}
                className="sr-only"
              />
              <div
                onClick={() => setNeedDelivery(!needDelivery)}
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  needDelivery ? "bg-primary" : "bg-accent-foreground/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    needDelivery ? "translate-x-5" : "translate-x-1"
                  } absolute top-0.5`}
                ></div>
              </div>
            </div>
          </div>

          {needDelivery && (
            <div className="space-y-2 pt-2 border-t border-border/30">
              <Label htmlFor="cust-address" className="text-xs font-medium">
                Delivery Address
              </Label>
              <Textarea
                id="cust-address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter complete delivery address"
                rows={3}
                className="text-sm resize-none focus:ring-2 focus:ring-primary/20"
              />
              <Label htmlFor="cust-address" className="text-xs font-medium mt-4">
                Delivery Charge
              </Label>
              <Input
                type="number"
                id="delivery-charge"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                placeholder="Enter delivery charge"
                className="text-sm resize-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(PAYMENT_MODE).map((mode) => (<Button
            key={mode}
              type="button"
              variant={paymentMethod === mode ? "default" : "outline"}
              className={`py-3 px-4 h-auto text-sm flex justify-start gap-2 ${
              paymentMethod === mode
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                : "bg-background hover:bg-accent/20"
              } transition-all`}
              onClick={() => setPaymentMethod(PAYMENT_MODE[mode as keyof typeof PAYMENT_MODE])}
            >
              <Wallet className="h-4 w-4" />
              <div>
              <div className="font-medium">{mode}</div>
              </div>
              {paymentMethod === mode && (
              <Check className="h-4 w-4 ml-auto" />
              )}
            </Button>))}
            {/* <Button
              type="button"
              variant={paymentMethod === PAYMENT_MODE.UPI ? "default" : "outline"}
              className={`py-3 px-4 h-auto text-sm flex justify-start gap-2 ${
              paymentMethod === PAYMENT_MODE.UPI
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                : "bg-background hover:bg-accent/20"
              } transition-all`}
              onClick={() => setPaymentMethod(PAYMENT_MODE.UPI)}
            >
              <CreditCard className="h-4 w-4" />
              <div>
              <div className="font-medium">UPI</div>
              </div>
              {paymentMethod === PAYMENT_MODE.UPI && <Check className="h-4 w-4 ml-auto" />}
            </Button> */}
          </div>
        </div>
      </div>
    </Card>
  );
}
