import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PaymentButtonProps {
  total: number;
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

export function PaymentButton({ total, onClick, disabled, children }: PaymentButtonProps) {
  return (
    <div className="fixed bottom-12 left-0 right-0 bg-background/70 backdrop-blur-sm border-t border-border p-4 flex flex-col items-center space-y-2">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-12 py-4 text-sm font-medium shadow-lg bg-primary hover:bg-primary/90 relative overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out translate-y-full bg-primary-foreground mix-blend-overlay group-hover:translate-y-0"></span>
        <span className="relative flex items-center gap-2">
          {children} • ₹{total.toFixed(2)}
        </span>
      </Button>
    </div>
  );
}