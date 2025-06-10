"use client";

import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./components/item-card";
import SearchPanel from "./components/search-panel";
import { Product } from "@/types";
import { RootState } from "@/app/redux/store";
import { useHasHydrate } from "@/app/hooks/useHydrate";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/app/redux/slices/cartSlice";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import {
  useFetchCategoryProducts,
  useFetchProductBySearchTerm,
} from "@/api-config/services/productService";
import CardSkeleton from "./components/skeleton-loader";
import { useRouter } from "next/navigation";
import { setActiveCategory } from "@/app/redux/slices/categorySlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const hasHydrated = useHasHydrate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, token, isAuthenticated } = useAuth();
  const shopId = user?.shop?.id;
  const activeCategory = useSelector(
    (state: RootState) => state.category.activeCategory
  );
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useFetchCategoryProducts(shopId!, activeCategory!, token!);

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useFetchProductBySearchTerm(shopId!, searchQuery.trim(), token!);

  const items = searchQuery ? searchData || [] : categoryData || [];

  const handleIncrement = (item: Product) => {
    dispatch(addToCart(item));
  };

  const handleQuantityInputChange = (id: string, value: number, item:Product) => {
    if (value > 0) {
      if (cartItems.find((i: Product) => i._id === id)) {
        dispatch(updateQuantity({ _id: id, quantity: value }));
      } else {
        dispatch(addToCart({ ...item }));
      }
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleDecrement = (id: string, qty: number) => {
    if (qty > 1) {
      dispatch(updateQuantity({ _id: id, quantity: qty - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const getQty = (id: string) => {
    const item = cartItems.find((i: Product) => i._id === id);
    return item ? item.quantity : 0;
  };

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredItems = items.filter((item: any) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return item.is_available && matchesSearch;
  });

  if (!hasHydrated) return null;

  return (
    <>
      <div className="mb-4">
        <div className="relative h-20 w-full">
          <SearchPanel
            onSearchChange={handleSearchChange}
            items={items}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            width="80%"
          />
        </div>
        <h1 className="text-2xl font-semibold">
          {searchQuery === ""
            ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
            : "All"}{" "}
          Products
        </h1>
        <p className="text-muted-foreground text-sm">
          {filteredItems.length} products available
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pb-36">
        {categoryLoading || (searchQuery && searchLoading) ? (
          Array(6)
            .fill(0)
            .map((_, i) => <CardSkeleton key={i} />)
        ) : categoryError || searchError ? (
          <div className="col-span-full text-center text-red-500">
            Failed to load products. Please try again later.
          </div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item: any, i: number) => (
            <ItemCard
              key={i}
              item={item}
              qty={getQty(item._id)}
              handleIncrement={() => handleIncrement(item)}
              handleDecrement={() =>
                handleDecrement(item._id, getQty(item._id))
              }
              handleQuantityChange={(value) =>
                handleQuantityInputChange(item._id, value, item)
              }
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground">
              {searchQuery
                ? `No products found matching "${searchQuery}"`
                : "No products available in this category"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
