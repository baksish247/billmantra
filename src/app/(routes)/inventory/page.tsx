"use client";

import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";

import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  Edit2,
  Trash2,
  ChevronDown,
} from "lucide-react";

import { RootState } from "@/app/redux/store";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import { keyNames } from "@/api-config/queryKeyNames";
import {
  useDeleteProduct,
  useFetchCategoryProducts,
  useFetchProductBySearchTerm,
} from "@/api-config/services/productService";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SearchPanel from "../home/components/search-panel";
import { InventoryDialog } from "./components/inventory-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { setActiveCategory, setCategories } from "@/app/redux/slices/categorySlice";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<any | undefined>();
  const [itemToDelete, setItemToDelete] = useState<any | undefined>();
  
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const shopId = user?.shop?.id;

  const activeCategory = useSelector(
    (state: RootState) => state.category.activeCategory
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const {
    data: productData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useFetchCategoryProducts(shopId!, selectedCategory, token!);

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useFetchProductBySearchTerm(shopId!, searchQuery.trim(), token!);  

  const { mutateAsync: deleteProduct, isLoading: deleting } =
    useDeleteProduct();

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;

    await deleteProduct({
      shopId: user?.shop?.id!,
      productId: itemToDelete.id,
      token: token!,
    });

    queryClient.invalidateQueries([keyNames.getProductByCategory]);
    setItemToDelete(undefined);
  };

  const handleAddItem = () => {
    setDialogMode("add");
    setSelectedItem(undefined);
    setDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setDialogMode("edit");
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query || "");
  }, []);

  const mapApiToInventory = (items: any[]) =>
    items.map((item) => ({
      id: item._id,
      name: item.name,
      category: item.category,
      currentStock: item.available_unit,
      minStock: item.minimum_threshold,
      unit: item.measurement_unit,
      price: item.unit_price,
      lastUpdated: formatDate(item.updatedAt),
    }));

  const inventoryItems = searchQuery
    ? mapApiToInventory(searchData || [])
    : mapApiToInventory(productData || []);

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // const matchesCategory =
    //   selectedCategory === "all" ||
    //   item.category.toLowerCase() === selectedCategory;
    return matchesSearch ;
  });

  const lowStockItems = filteredItems.filter(
    (item) => item.currentStock <= item.minStock
  );

  if (categoryError || searchError) {
    return <div>Error: {"Failed to fetch category"}</div>;
  }

  const router = useRouter();
  
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Search & Filters */}
      <div className="flex flex-col gap-4 mb-6 mt-14">
        <SearchPanel
          onSearchChange={handleSearchChange}
          items={inventoryItems}
          width="100%"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Mobile Dropdown Category Filter */}
        <div className="sm:hidden pt-6 flex items-center gap-4 capitalize">
          {/* Category Selector */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[60%] capitalize">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add Purchase Button */}
          <Button variant="default" className="w-fit" onClick={() => {router.push("/inventory/purchase")}}>
            Add Purchase
          </Button>
        </div>

        {/* Desktop Button Filter */}
        <div className="hidden sm:flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Low Stock Warning */}
      {lowStockItems.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200 mb-6">
          <div className="p-3 sm:p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">Low Stock Alert</h3>
              <p className="text-sm text-yellow-700">
                {lowStockItems.length} items are running low on stock
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Skeleton Loader */}
      {(categoryLoading || searchLoading) && (
        <div className="sm:hidden space-y-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-3 w-24 mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Mobile Inventory Cards */}
      {!(categoryLoading || searchLoading) && (
        <div className="sm:hidden space-y-4 mb-15">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={() => setItemToDelete(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Current Stock</p>
                  <p
                    className={`font-medium ${
                      item.currentStock <= item.minStock ? "text-red-600" : ""
                    }`}
                  >
                    {item.currentStock} {item.unit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Min Stock</p>
                  <p className="font-medium">
                    {item.minStock} {item.unit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Selling Price</p>
                  <p className="font-medium">₹{item.price}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{item.lastUpdated}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Item Dialog */}
      <InventoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        item={selectedItem}
      />

      {/* Floating Add Button */}
      <div className="fixed bottom-18 right-4 z-50">
        <Button
          className="rounded-full h-14 w-14 p-0 shadow-lg bg-primary text-white hover:bg-primary/90"
          onClick={handleAddItem}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={() => setItemToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <b>{itemToDelete?.name}</b>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
