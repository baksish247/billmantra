"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ItemPropsType = {
  item: Product;
  qty: number;
  handleIncrement: (value?: number) => void;
  handleDecrement: () => void;
  handleQuantityChange?: (value: number) => void;
};

const predefinedOptions = [1, 2, 5, 10]; // predefined quantity options

const ItemCard = ({
  item,
  qty,
  handleIncrement,
  handleDecrement,
  handleQuantityChange,
}: ItemPropsType) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [customValue, setCustomValue] = useState<string>("");

  const handleDrawerConfirm = () => {
    const finalQty =
      selectedValue === "other"
        ? parseFloat(customValue)
        : parseInt(selectedValue, 10);

    if (!isNaN(finalQty) && finalQty > 0) {
      handleQuantityChange?.(finalQty);
      setDrawerOpen(false);
      setSelectedValue("");
      setCustomValue("");
    }
  };

  return (
    <Card
      key={item._id}
      className="hover:shadow-md transition-all duration-300 bg-white border border-gray-100"
    >
      <CardContent className="px-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-row">
            <p className="text-base font-semibold text-gray-900">
              ₹{item.unit_price}
            </p>
            <p className="text-xs text-gray-500 p-2">
              per {item.unit_qty} {item.measurement_unit}
            </p>
          </div>

          {item.is_variable_qty ? (
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                {qty === 0 ? (
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="rounded-full bg-primary hover:bg-primary/80 text-white h-8 w-8 flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="px-3 py-1 rounded-full border text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {qty} {item.measurement_unit}
                  </button>
                )}
              </DrawerTrigger>

              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    {qty === 0 ? "Select" : "Update"} Quantity
                  </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 py-2">
                  <RadioGroup
                    value={selectedValue}
                    onValueChange={(val) => setSelectedValue(val)}
                    className="space-y-2"
                  >
                    {predefinedOptions.map((val) => (
                      <div
                        key={val}
                        className="flex justify-between items-center border p-2 rounded-md"
                      >
                        <span>
                          {val} {item.measurement_unit}
                        </span>
                        <RadioGroupItem value={val.toString()} />
                      </div>
                    ))}
                    <div className="flex justify-between items-center border p-2 rounded-md">
                      <span>Other</span>
                      <RadioGroupItem value="other" />
                    </div>
                  </RadioGroup>

                  {selectedValue === "other" && (
                    <Input
                      type="number"
                      step="any"
                      min={0}
                      inputMode="decimal"
                      value={customValue}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) {
                          setCustomValue(val);
                        }
                      }}
                      placeholder={`Enter quantity in ${item.measurement_unit}`}
                      className="mt-4"
                    />
                  )}
                </div>
                <DrawerFooter>
                  <Button
                    onClick={handleDrawerConfirm}
                    disabled={selectedValue === ""}
                  >
                    Confirm
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : qty === 0 ? (
            <button
              onClick={() => handleIncrement(1)}
              className="rounded-full bg-primary hover:bg-primary/80 text-white h-8 w-8 flex items-center justify-center shadow-sm transition-colors"
            >
              <Plus size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="rounded-full bg-gray-100 hover:bg-gray-200 h-8 w-8 flex items-center justify-center transition-colors"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="text-sm font-medium w-5 text-center">{qty}</span>
              <button
                onClick={() => handleIncrement(1)}
                className="rounded-full bg-primary hover:bg-primary/80 text-white h-8 w-8 flex items-center justify-center shadow-sm transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
