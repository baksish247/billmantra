"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import categories from "@/app/components/categories";
import { MEASUREMENT_UNIT } from "@/enum";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/api-config/services/productService";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import { QueryClient, useQueryClient } from "react-query";
import { queryKeys } from "@/api-config/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { keyNames } from "@/api-config/queryKeyNames";

interface InventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  item?: {
    id: string;
    name: string;
    category: string;
    currentStock: number;
    minStock: number;
    unit: string;
    price: number;
    imageUrl?: string;
    unitQty?: number;
    isVariableQty?: boolean;
  };
}

export function InventoryDialog({
  open,
  onOpenChange,
  mode,
  item,
}: InventoryDialogProps) {


  const currentCategory = useSelector(
    (state: RootState) => state.category.activeCategory
  )

  const queryClient = useQueryClient();
  /**
   * Mutations
   */
  const { mutateAsync: addProduct, isLoading: adding } = useCreateProduct();
  const {
    mutateAsync: updateProduct,
    isLoading: updating,
  } = useUpdateProduct();

  /**
   * Local form state
   */
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: 0,
    minStock: 0,
    unit: "",
    price: 0,
    imageUrl: "",
    unitQty: 1,
    isVariableQty: false,
  });

  const clearForm = () =>
  {
    setFormData({
      name: "",
      category: "",
      currentStock: 0,
      minStock: 0,
      unit: "",
      price: 0,
      imageUrl: "",
      unitQty: 1,
      isVariableQty: false,
    });
  }
  const { user, token } = useAuth();

  /**
   * Populate form when editing
   */
  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        name: item.name || "",
        category: item.category || "",
        currentStock: item.currentStock || 0,
        minStock: item.minStock || 0,
        unit: item.unit || "",
        price: item.price || 0,
        imageUrl: item.imageUrl || "",
        unitQty: item.unitQty || 1,
        isVariableQty: item.isVariableQty || false,
      });
    }
  }, [item, mode]);

  /**
   * Reset form when closing add dialog
   */
  useEffect(() => {
    if (!open && mode === "add") {
      setFormData({
        name: "",
        category: "",
        currentStock: 0,
        minStock: 0,
        unit: "",
        price: 0,
        imageUrl: "",
        unitQty: 1,
        isVariableQty: false,
      });
    }
  }, [open, mode]);

  /**
   * Helpers to prepare payloads
   */
  const buildPayload = () => ({
    name: formData.name,
    image_url: formData.imageUrl || "",
    category: formData.category,
    available_unit: formData.currentStock,
    minimum_threshold: formData.minStock,
    measurement_unit: formData.unit,
    unit_price: formData.price,
    unit_qty: formData.unitQty,
    is_variable_qty: formData.isVariableQty,
    is_available: true,
  });

  /**
   * Submit handlers
   */
  const handleAdd = async () => {
    await addProduct({
      shopId: user?.shop?.id!,
      data: buildPayload(),
      token: token!,
    });
  };

  const handleEdit = async () => {
    if (!item) return;
    await updateProduct({
      shopId: user?.shop?.id!,
      productId: item.id,
      data: buildPayload(),
      token: token!,
    });

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await handleAdd();
      } else {
        await handleEdit();
      }
      queryClient.invalidateQueries([keyNames.getProductByCategory]);
      onOpenChange(false);
    } catch (error) {
      console.log("Error saving product", error);
    }
    finally
    {
      clearForm();
    }
  };

  const loading = mode === "add" ? adding : updating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg sm:text-xl">
            {mode === "add" ? "Add New Item" : "Edit Item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Item name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm">
                Item Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter item name"
                className="h-9 sm:h-10"
                required
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl" className="text-sm">
                Image URL (Optional)
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder="Enter image URL"
                className="h-9 sm:h-10"
                type="url"
              />
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-sm">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger className="h-9 sm:h-10 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {Object.keys(categories).map((item) => (
                    <SelectItem value={item} key={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stock & Threshold */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="currentStock" className="text-sm">
                  Available Units
                </Label>
                <Input
                  id="currentStock"
                  type="number"
                  min="0"
                  value={formData.currentStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentStock: Number(e.target.value),
                    })
                  }
                  className="h-9 sm:h-10"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="minStock" className="text-sm">
                  Minimum Threshold
                </Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minStock: Number(e.target.value),
                    })
                  }
                  className="h-9 sm:h-10"
                  required
                />
              </div>
            </div>

            {/* Measurement unit & unit quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="unit" className="text-sm">
                  Measurement Unit
                </Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, unit: value })
                  }
                  required
                >
                  <SelectTrigger className="h-9 sm:h-10 w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(MEASUREMENT_UNIT).map((unit) => (
                      <SelectItem value={unit} key={unit}>
                        {MEASUREMENT_UNIT[
                          unit as keyof typeof MEASUREMENT_UNIT
                        ]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unitQty" className="text-sm">
                  Unit Quantity
                </Label>
                <Input
                  id="unitQty"
                  type="number"
                  min="1"
                  step="0.1"
                  value={formData.unitQty}
                  onChange={(e) =>
                    setFormData({ ...formData, unitQty: Number(e.target.value) })
                  }
                  className="h-9 sm:h-10"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-sm">
                Unit Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="h-9 sm:h-10"
                required
              />
            </div>

            {/* Variable Quantity */}
            <div className="grid gap-2">
              <Label htmlFor="isVariableQty" className="text-sm">
                Variable Quantity
              </Label>
              <Select
                value={formData.isVariableQty.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, isVariableQty: value === "true" })
                }
              >
                <SelectTrigger className="h-9 sm:h-10 w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Fixed Quantity</SelectItem>
                  <SelectItem value="true">Variable Quantity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="mt-6 sm:mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 sm:h-10"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-9 sm:h-10" disabled={loading}>
              {loading
                ? "Processing..."
                : mode === "add"
                ? "Add Item"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
