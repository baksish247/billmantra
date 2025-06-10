// components/ProductCard.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Package, Archive, Plus, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExistingItem, NewItem, ProductType } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import categories from "@/app/components/categories";
import { MEASUREMENT_UNIT } from "@/enum";

interface ProductCardProps {
  tab: "existing" | "new";
  setTab: React.Dispatch<React.SetStateAction<"existing" | "new">>;
  existingItem: ExistingItem;
  setExistingItem: React.Dispatch<React.SetStateAction<ExistingItem>>;
  newItem: NewItem;
  setNewItem: React.Dispatch<React.SetStateAction<NewItem>>;
  productsData: ProductType[] | undefined;
  isLoadingProducts: boolean;
  errorFetchProducts: any;
  handleAddItem: () => void;
  filteredProducts: ProductType[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  openProductSearch: boolean;
  setOpenProductSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectProduct: (product: ProductType) => void;
  handleProductNameChange: (value: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  tab,
  setTab,
  existingItem,
  setExistingItem,
  newItem,
  setNewItem,
  productsData,
  isLoadingProducts,
  errorFetchProducts,
  handleAddItem,
  filteredProducts,
  setFilteredProducts,
  openProductSearch,
  setOpenProductSearch,
  handleSelectProduct,
  handleProductNameChange,
}) => {
  return (
    <Card className="border-2 shadow-sm backdrop-blur-sm">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <Package className="h-5 w-5 text-accent-foreground" />
          Product Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={tab}
          onValueChange={(val) => setTab(val as "existing" | "new")}
        >
          <TabsList className="grid grid-cols-2 w-full mb-2 bg-accent/40 p-1 rounded-md">
            <TabsTrigger value="existing" className="py-1 text-sm">
              <Archive className="h-4 w-4 mr-1" />
              Existing
            </TabsTrigger>
            <TabsTrigger value="new" className="py-1 text-sm">
              <Plus className="h-4 w-4 mr-1" />
              New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4 mt-2">
            <div className="grid gap-4">
              <div className="space-y-1">
                <Label>Product Name</Label>
                <Popover
                  open={openProductSearch}
                  onOpenChange={setOpenProductSearch}
                >
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search or enter product name"
                        value={existingItem.product_name}
                        onChange={(e) =>
                          handleProductNameChange(e.target.value)
                        }
                        className="pl-10 pr-4 py-2 h-9 text-sm"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search product..."
                        value={existingItem.product_name}
                        onValueChange={handleProductNameChange}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {isLoadingProducts
                            ? "Loading products..."
                            : "No products found. Enter details manually."}
                        </CommandEmpty>
                        <CommandGroup heading="Products">
                          {filteredProducts.map((product) => (
                            <CommandItem
                              key={product._id}
                              onSelect={() => handleSelectProduct(product)}
                              className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                            >
                              {product.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Purchase Quantity</Label>
                  <Input
                    type="number"
                    className="h-9 text-sm"
                    value={existingItem.purchase_qty}
                    onChange={(e) =>
                      setExistingItem({
                        ...existingItem,
                        purchase_qty: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Cost Price/Unit (₹)</Label>
                  <Input
                    type="number"
                    className="h-9 text-sm"
                    value={existingItem.purchase_price_per_unit}
                    onChange={(e) =>
                      setExistingItem({
                        ...existingItem,
                        purchase_price_per_unit: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            {errorFetchProducts && (
              <p className="text-red-500 text-sm">
                Error fetching products:{" "}
                {errorFetchProducts.message || "Unknown error"}
              </p>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label>Product Name</Label>
              <Input
                type="text"
                className="h-9 text-sm"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category Dropdown */}
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-sm">
                  Category
                </Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                  required
                >
                  <SelectTrigger className="h-9 sm:h-10 w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {Object.keys(categories).map((item) => (
                      <SelectItem
                        value={item}
                        key={item}
                        className="capitalize"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Measurement Unit Dropdown */}
              <div className="grid gap-2">
                <Label htmlFor="measurement_unit" className="text-sm">
                  Measurement Unit
                </Label>
                <Select
                  value={newItem.measurement_unit}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, measurement_unit: value })
                  }
                  required
                >
                  <SelectTrigger className="h-9 sm:h-10 w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(MEASUREMENT_UNIT).map((unit) => (
                      <SelectItem value={unit} key={unit}>
                        {
                          MEASUREMENT_UNIT[
                            unit as keyof typeof MEASUREMENT_UNIT
                          ]
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label>Image URL</Label>
              <Input
                className="h-9 text-sm"
                value={newItem.image_url}
                onChange={(e) =>
                  setNewItem({ ...newItem, image_url: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["available_unit", "Available Units"],
                ["minimum_threshold", "Minimum Threshold"],
                ["unit_qty", "Unit Quantity"],
                ["unit_price", "Sell Price/Unit (₹)"],
                ["purchase_qty", "Purchase Quantity"],
                ["purchase_price_per_unit", "Cost Price/Unit (₹)"],
              ].map(([key, label]) => (
                <div key={key} className="space-y-1">
                  <Label>{label}</Label>
                  <Input
                    className="h-9 text-sm"
                    type={key === "measurement_unit" ? "text" : "number"}
                    value={newItem[key as keyof NewItem] as string | number}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        [key]: Number(e.target.value),
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                ["is_variable_qty", "Variable quantity allowed"],
                ["is_available", "Currently available"],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newItem[key as keyof NewItem] as boolean}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        [key]: e.target.checked,
                      })
                    }
                  />
                  <Label className="text-sm">{label}</Label>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <div className="flex justify-end px-4 pb-4">
        <Button className="h-9 w-full text-sm" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
