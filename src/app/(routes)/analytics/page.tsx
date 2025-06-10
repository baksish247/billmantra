"use client";
import React, { useState, useEffect } from "react";
import {
  Loader2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangeSelector } from "./components/DateRangeSelector";
import { MetricCard } from "./components/MetricCard";
import { PaymentMethodChart } from "./components/PaymentMethodChart";
import { TopProductsChart } from "./components/TopProductsChart";
import { SalesTrendChart } from "./components/SalesTrendChart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  useOverview,
  useLendingOverview,
  usePaymentMode,
  useTopSellingProducts,
  useMonthlySales,
  useDailySales,
} from "@/api-config/services/analyticsService";
import { useAuth } from "@/app/redux/providers/AuthProvider";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last7days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [salesTrendMode, setSalesTrendMode] = useState<"daily" | "monthly">("daily");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDateChange = (range: string, start: string, end: string) => {
    setDateRange(range);
    setStartDate(start);
    setEndDate(end);
  };

  const { user, token } = useAuth();
  const shopId = user?.shop?.id || "";

  const { data: salesOverViewData, isLoading: isLoadingOverView } = useOverview(shopId, startDate, endDate, token!);
  const { data: lendingData, isLoading: isLoadingLendings } = useLendingOverview(shopId, startDate, endDate, token!);
  const { data: paymentModeData, isLoading: isLoadingPaymentMode } = usePaymentMode(shopId, startDate, endDate, token!);
  const { data: topSellingProductsData, isLoading: isLoadingTopProducts } = useTopSellingProducts(shopId, startDate, endDate, token!);
  const { data: salesTrendDataMonthly, isLoading: isLoadingSalesTrendMonthly } = useMonthlySales(shopId, startDate, endDate, token!);
  const { data: salesTrendDataDaily, isLoading: isLoadingSalesTrendDaily } = useDailySales(shopId, startDate, endDate, token!);

  const mappedPaymentData = paymentModeData?.map((item: any) => ({
    name: item?._id || "Unknown",
    value: item?.total_sales || 0,
  }));

  const topProductsData = topSellingProductsData?.map((item: any) => ({
    name: item?.product_name || "Unknown",
    sales: item?.total_quantity_sold || 0,
  }));

  const mappedSalesTrendDataDaily = salesTrendDataDaily?.map((item: any) => ({
    date: item?.date || "Unknown",
    amount: item?.total_sales || 0,
  }));

  const mappedSalesTrendDataMonthly = salesTrendDataMonthly?.map((item: any) => ({
    date: item?.month_name || "Unknown",
    amount: item?.total_sales || 0,
  }));

  const selectedSalesTrendData =
    salesTrendMode === "daily"
      ? mappedSalesTrendDataDaily
      : mappedSalesTrendDataMonthly;

  const isLoadingSalesTrend =
    salesTrendMode === "daily"
      ? isLoadingSalesTrendDaily
      : isLoadingSalesTrendMonthly;

  return (
    <div className="container mx-auto p-6 pb-30">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        <DateRangeSelector onDateRangeChange={handleDateChange} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoadingOverView ? (
          <div className="flex justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <MetricCard
            title="Total Sales"
            value={"₹" + (salesOverViewData?.total_sales || 0).toFixed(2)}
            change="0%"
            isPositive={true}
          />
        )}
        {isLoadingOverView ? (
          <div className="flex justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <MetricCard
            title="Total Orders"
            value={salesOverViewData?.total_bills}
            change="0%"
            isPositive={true}
          />
        )}
        {isLoadingOverView ? (
          <div className="flex justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <MetricCard
            title="Average Order Value"
            value={"₹" + (salesOverViewData?.average_bill_value || 0).toFixed(2)}
            change="0%"
            isPositive={true}
          />
        )}
        {isLoadingLendings ? (
          <div className="flex justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <MetricCard
            title="Remaining Lending"
            value={
              lendingData?.total_remaining_amount > 0
                ? "₹" + lendingData?.total_remaining_amount
                : "₹0"
            }
            change="0%"
            isPositive={lendingData?.total_remaining_amount < 0}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {isLoadingPaymentMode ? (
          <div className="flex h-64 w-full justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <PaymentMethodChart data={mappedPaymentData} />
        )}

        {isLoadingTopProducts ? (
          <div className="flex h-64 w-full justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <TopProductsChart data={topProductsData} />
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Sales Trend</h2>
          <ToggleGroup
            type="single"
            value={salesTrendMode}
            onValueChange={(val: "daily" | "monthly") => {
              if (val) setSalesTrendMode(val);
            }}
          >
            <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          </ToggleGroup>
        </div>
        {isLoadingSalesTrend ? (
          <div className="flex h-64 w-full justify-center items-center"> <Loader2 className="animate-spin" /> </div>
        ) : (
          <SalesTrendChart data={selectedSalesTrendData} />
        )}
      </div>
    </div>
  );
}
