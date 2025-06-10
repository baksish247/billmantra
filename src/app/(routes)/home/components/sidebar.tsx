"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Smartphone,
  ShoppingBag,
  Home,
  BookOpen,
  BriefcaseBusiness as Tennis,
  Sparkles,
  Gamepad as GameController,
  ShoppingCart,
  Package,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useFetchAllCaterories } from "@/api-config/services/shopService";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setActiveCategory, setCategories } from "@/app/redux/slices/categorySlice";
import categories from "@/app/components/categories";

const Sidebar:React.FC = () => {
  const { user, token } = useAuth();
  const shopId = user?.shop?.id;
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: RootState) => state.category.activeCategory);

  const setActiveCategoryFn = (category: string) => {
    // Dispatch action to update active category in Redux store
    dispatch(setActiveCategory(category));
    //console.log("Selected Category:", category);
  }

  

  // Safe guard: don't call hook until required params exist
  const {
    data,
    error,
    isLoading,
  } = shopId && token ? useFetchAllCaterories(shopId, token) : { data: null, error: null, isLoading: false };

  useEffect(() => {
    if (data && data.length > 0 && !activeCategory) {
      setActiveCategoryFn(data[0]);
    }
    // Dispatch action to set categories in Redux store
    if (data && data.length > 0) {
      const categoriesList = data;
      dispatch(setCategories(categoriesList));
    }
  }, [data, activeCategory]);

  if (!shopId || !token) {
    return <div>Loading user session...</div>;
  }
  if (isLoading) {
  return (
    <div className="w-full min-h-screen">
      {/* Mobile Skeleton Sidebar */}
      <div className="lg:hidden flex h-screen overflow-x-clip border-r-2 p-0 border-b no-scrollbar">
        <div className="w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex-col h-auto px-2 pt-4 w-full rounded-none flex items-center animate-pulse"
              style={{
                backgroundColor: "var(--background)",
              }}
            >
              <div className="w-6 h-6 rounded-md bg-gray-300" />
              <div className="h-3 mt-2 w-16 bg-gray-300 rounded" />
              {index !== 9 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Skeleton Sidebar */}
      <div className="hidden lg:flex lg:w-full h-full flex-col border-r shadow-sm">
        <div className="p-4 border-b" style={{ backgroundColor: "var(--sidebar)" }}>
          <h2 className="text-sm font-bold" style={{ color: "var(--sidebar-foreground)" }}>
            Categories
          </h2>
        </div>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-2 space-y-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full items-start px-3 py-2 h-auto animate-pulse"
                style={{ backgroundColor: "var(--sidebar)" }}
              >
                <div className="w-5 h-5 mr-3 mt-1 rounded-full bg-muted" />
                <div className="flex-1 h-4 bg-muted rounded" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}



  if (error) {
    console.log("Error fetching categories:", error);
    return <div>Error loading categories</div>;
  }

  type categoryType = {
    [key: string]: {
      icon: React.ReactNode;
      fullName: string;
    };
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto">
      {/* Mobile Sidebar */}
      <div className="lg:hidden flex h-screen overflow-x-clip border-r-2 p-0 border-b no-scrollbar">
        <div className="w-full">
          {data?.map((category: string, index: number) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategoryFn(category)}
              className={cn(
                "flex-col h-auto px-2 pt-4 w-full rounded-none",
                activeCategory === category &&
                  "bg-[--background] text-[--sidebar-accent-foreground]"
              )}
              style={
                activeCategory === category
                  ? {
                      backgroundColor: "var(--sidebar-item-background)",
                      color: "var(--sidebar-accent-foreground)",
                    }
                  : { color: "var(--sidebar-primary)" }
              }
            >
              <span
                style={{
                  color:
                    activeCategory === category
                      ? "var(--color-foreground)"
                      : "var(--sidebar-primary)",
                }}
              >
                {categories[category]?.icon}
              </span>
              <div className="text-xs pb-2 mt-1 w-full text-center hyphens-auto">
                <span className="inline-block capitalize break-words whitespace-normal">
                  {category}
                </span>
              </div>
              {index !== data.length - 1 && <Separator />}
            </Button>
          ))}
          <div className="h-36" />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-full h-full flex-col border-r shadow-sm">
        <div className="p-4 border-b" style={{ backgroundColor: "var(--sidebar)" }}>
          <h2 className="text-sm font-bold" style={{ color: "var(--sidebar-foreground)" }}>
            Categories
          </h2>
        </div>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-2 space-y-1">
            {data?.map((category: string) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => setActiveCategoryFn(category)}
                className={cn(
                  "w-full justify-start text-left px-3 py-2 h-auto flex items-start",
                  activeCategory === category &&
                    "bg-[--sidebar] text-[--sidebar-accent-foreground]"
                )}
                style={
                  activeCategory === category
                    ? {
                        backgroundColor: "var(--sidebar)",
                        color: "var(--sidebar-accent-foreground)",
                      }
                    : { color: "var(--sidebar-primary)" }
                }
              >
                <span
                  className="mr-3 mt-1"
                  style={{
                    color: "var(--sidebar-primary)",
                  }}
                >
                  {categories[category]?.icon}
                </span>
                <div className="text-sm">
                  <span className="whitespace-normal capitalize break-words inline-block">
                    {category}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
