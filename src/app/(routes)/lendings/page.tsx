"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  ArrowUpDown,
  Calendar,
  ChevronRight,
  PhoneIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchLendingsByShopId } from "@/api-config/services/lendingService";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import AddLending from "./components/AddLending"; // Import the AddLending component
import { log } from "util";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="h-24 bg-gray-200 rounded-md mb-3"></div>
      </div>
    ))}
  </div>
);

// Function to map API data to frontend format
const mapLendingData = (apiData: any[]) => {
  //console.log("Mapping lending data:", apiData);
  return apiData.map((item) => {
    const lastPayment = item.payment_timeline.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    return {
      id: item._id,
      customerId: item.customer_id?._id,
      name: item.customer_id?.name,
      phone: item.customer_id?.phone,
      lent_amount: item.lent_amount,
      paid_amount: item.paid_amount,
      remaining_amount: item.remaining_amount,
      shop_id: item.shop_id,
      is_paid: item.is_paid,
      payment_timeline: item.payment_timeline.map((payment: any) => ({
        amount: payment.amount,
        date: new Date(payment.date).toISOString().split("T")[0],
        id: payment._id,
      })),
      bill_ids: item.bill_ids,
      is_deleted: item.is_deleted,
      createdAt: new Date(item.createdAt).toISOString().split("T")[0],
      updatedAt: new Date(item.updatedAt).toISOString().split("T")[0],
      lastTransaction: lastPayment
        ? {
            type: "paid",
            amount: lastPayment.amount,
            date: new Date(lastPayment.date).toISOString().split("T")[0],
          }
        : { type: "none", amount: 0, date: "" },
    };
  });
};

const LendingsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const { token, user } = useAuth();
  const shopId = user?.shop?.id;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for modal

  // Fetch data with safe defaults
  const { data, isLoading, error } = useFetchLendingsByShopId(
    shopId ?? "",
    token ?? ""
  );
  const lendingData = data ? mapLendingData(data) : [];
  //console.log("lending data", lendingData);

  // Handle adding new lending
  const handleAddLending = async (lendingData: {
    customer_id: { name: string; phone: string };
    lent_amount: number;
    shop_id: string;
  }) => {
    try {
      // Replace with your actual API call
      //console.log("Adding lending:", lendingData);
      // Example: await addLending(lendingData, token);
      // You may need to refetch data or update the state here
    } catch (error) {
      console.log("Error adding lending:", error);
    }
  };

  // Handle loading, error, and authentication states
  if (isLoading)
    return (
      <div className="container mx-auto py-6 px-4">
        <SkeletonLoader />
      </div>
    );
  if (error)
    return <div className="text-center py-8 text-red-600">Error occurred</div>;
  if (!shopId || !token)
    return (
      <div className="text-center py-8 text-red-600">
        Authentication required
      </div>
    );

  // Filter data based on search term
  const filteredData = lendingData.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
  );

  // Sort data based on column and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn === "amount") {
      return sortDirection === "asc"
        ? a.remaining_amount - b.remaining_amount
        : b.remaining_amount - a.remaining_amount;
    } else if (sortColumn === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Toggle sort direction and column
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Navigate to customer details page
  const handleCustomerClick = (customerId: string, lendingId?: string) => {
    router.push(`/lendings/customer?id=${lendingId}&customerId=${customerId}`);
  };

  // Calculate total lending amount
  const totalLending = lendingData.reduce(
    (sum, customer) => sum + customer.remaining_amount,
    0
  );

  return (
    <div className="container mx-auto py-6 pb-20 bg-transparent border-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl">Customer Lendings</CardTitle>
              <CardDescription>
                Manage your customer credit accounts
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Badge
                variant={totalLending >= 0 ? "default" : "destructive"}
                className="text-md px-3 py-1"
              >
                Total:{" "}
                {totalLending.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search customer name or phone..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button> */}
          </div>

          {/* Mobile View - Cards */}
          <div className="block lg:hidden">
            {sortedData.length > 0 ? (
              sortedData.map((customer) => (
                <Card
                  key={customer.id}
                  className="mb-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 rounded-lg"
                  onClick={() =>
                    handleCustomerClick(customer.customerId, customer.id)
                  }
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {customer.name
                              ?.split(" ")
                              .map((n: any) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {customer.name}
                          </h3>
                          <div className="flex items-center text-gray-500 text-sm">
                            <PhoneIcon className="w-4 h-4 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                        <div>
                          <span className="font-medium">Lent Amount:</span>{" "}
                          <span className="text-gray-900 font-semibold">
                            {customer.lent_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Paid Amount:</span>{" "}
                          <span className="text-gray-900 font-semibold">
                            {customer.paid_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Remaining:</span>{" "}
                          <Badge
                            variant={
                              customer.remaining_amount >= 0
                                ? "outline"
                                : "secondary"
                            }
                            className={`rounded-full px-2 py-1 text-sm ${
                              customer.remaining_amount >= 0
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {customer.remaining_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>{" "}
                          <Badge
                            variant={
                              customer.is_paid ? "default" : "destructive"
                            }
                            className={`rounded-full px-2 py-1 text-sm ${
                              customer.is_paid
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {customer.is_paid ? "Paid" : "Unpaid"}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Created:</span>{" "}
                          {customer.createdAt}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {customer.updatedAt}
                        </div>
                        <div>
                          <span className="font-medium">Deleted:</span>{" "}
                          <span
                            className={
                              customer.is_deleted
                                ? "text-red-500"
                                : "text-gray-500"
                            }
                          >
                            {customer.is_deleted ? "Yes" : "No"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Bills:</span>{" "}
                          {customer.bill_ids.length > 0
                            ? customer.bill_ids.length
                            : "None"}
                        </div>
                      </div>

                      {/* Last Transaction */}
                      <div className="mt-4 text-sm">
                        {customer.lastTransaction.type !== "none" ? (
                          <div className="flex items-center">
                            <span className="font-medium">Last Payment:</span>{" "}
                            <span className="ml-1 font-semibold text-gray-800">
                              {customer.lastTransaction.amount.toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "INR",
                                }
                              )}
                            </span>
                            <div className="flex items-center text-gray-500 text-xs ml-3">
                              <Calendar size={12} className="mr-1" />
                              {customer.lastTransaction.date}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">
                            No Payment History
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No customers found.
              </div>
            )}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block mb-2">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Customer
                        {sortColumn === "name" && (
                          <ArrowUpDown size={16} className="ml-2" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Lent Amount</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead
                      className="text-right cursor-pointer"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end">
                        Remaining Amount
                        {sortColumn === "amount" && (
                          <ArrowUpDown size={16} className="ml-2" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bills</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Deleted</TableHead>
                    <TableHead className="text-right">
                      Last Transaction
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.length > 0 ? (
                    sortedData.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleCustomerClick(customer.customerId)}
                      >
                        <TableCell>
                          <div className="font-medium">{customer.name}</div>
                        </TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          {customer.lent_amount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </TableCell>
                        <TableCell>
                          {customer.paid_amount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              customer.remaining_amount >= 0
                                ? "outline"
                                : "secondary"
                            }
                            className={`${
                              customer.remaining_amount >= 0
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {customer.remaining_amount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.is_paid ? "default" : "destructive"
                            }
                          >
                            {customer.is_paid ? "Paid" : "Unpaid"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {customer.bill_ids.length || "None"}
                        </TableCell>
                        <TableCell>{customer.createdAt}</TableCell>
                        <TableCell>{customer.updatedAt}</TableCell>
                        <TableCell>
                          {customer.is_deleted ? "Yes" : "No"}
                        </TableCell>
                        <TableCell className="text-right">
                          {customer.lastTransaction.type !== "none" ? (
                            <div className="flex items-center justify-end gap-2">
                              <span>
                                {customer.lastTransaction.amount.toLocaleString(
                                  "en-US",
                                  {
                                    style: "currency",
                                    currency: "INR",
                                  }
                                )}
                              </span>
                              <div className="flex items-center text-gray-500 text-xs">
                                <Calendar size={12} className="mr-1" />
                                {customer.lastTransaction.date}
                              </div>
                            </div>
                          ) : (
                            <span>No Payment History</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} className="h-24 text-center">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-sm text-gray-500">
            {sortedData.length} customers found
          </div>
        </CardFooter>
      <AddLending
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLending={handleAddLending}
        shopId={shopId ?? ""}
      />
    </div>
  );
};

export default LendingsPage;
