"use client";

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RootState } from '@/app/redux/store';
import { selectCartItemsCount, selectCartTotal, clearCart } from '@/app/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';

const CartDetailsBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const itemCount = useSelector((state: RootState) => selectCartItemsCount(state));
  const cartTotal = useSelector((state: RootState) => selectCartTotal(state));

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(cartTotal);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          className="fixed bottom-16 left-2 right-2 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="border-none shadow-lg bg-primary text-primary-foreground p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-foreground text-primary rounded-full p-2">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <p className="font-bold text-lg">{formattedTotal}</p>
                  <p className="text-xs opacity-80">{itemCount} {itemCount === 1 ? 'item' : 'items'} in cart</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:text-red-500"
                  onClick={handleClearCart}
                >
                  <Trash2 size={18} />
                </Button>
                <Link href="/checkout">
                  <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium">
                    Place Order <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDetailsBar;
