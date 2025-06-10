"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Seller, ExistingItem, NewItem, ProductType } from "./types";
import { supplierService } from "@/api-config/services/supplierService";
import { useAuth } from "@/app/redux/providers/AuthProvider";
import SellerCard from "./components/seller-card";
import ProductCard from "./components/product-card";
import { useFetchAllProducts } from "@/api-config/services/productService";
import { useCreatePurchase } from "@/api-config/services/purchaseService";
import { toast } from "sonner";

export default function PurchaseForm() {
  const [tab, setTab] = useState<"existing" | "new">("existing");
  const [seller, setSeller] = useState<Seller>({
    name: "",
    email: "",
    phone: "",
    seller_id: "",
  });
  const [existingItem, setExistingItem] = useState<ExistingItem>({
    product_id: "",
    purchase_qty: 0,
    purchase_price_per_unit: 0,
    product_name: "",
  });
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    image_url: "",
    category: "",
    available_unit: 0,
    minimum_threshold: 0,
    measurement_unit: "",
    unit_price: 0,
    unit_qty: 1,
    purchase_qty: 1,
    purchase_price_per_unit: 0,
    is_variable_qty: false,
    is_available: true,
  });
  type supplierType = { _id: string; name: string; email: string; phone: string };
  const [purchaseDate, setPurchaseDate] = useState("");
  const [existingItems, setExistingItems] = useState<ExistingItem[]>([]);
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const [open, setOpen] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState<supplierType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [openProductSearch, setOpenProductSearch] = useState(false);

  const { user, token } = useAuth();

  interface SupplierResponse {
    data: supplierType[] | undefined;
    isLoading: boolean;
    error: any;
  }

  interface ProductResponse {
    data: ProductType[] | undefined;
    isLoading: boolean;
    error: any;
  }

  const { data: suppliersData, isLoading: isLoadingSuppliers, error: errorFetchSuppliers } =
    supplierService.useFetchAllSellerData(user?.shop?.id!, token!) as SupplierResponse;

  const { data: productsData, isLoading: isLoadingProducts, error: errorFetchProducts } =
    useFetchAllProducts(user?.shop?.id!, token!) as ProductResponse;

  const { mutateAsync: createPurchase, isLoading: isCreatingPurchase, isError: createPurchaseError } =
    useCreatePurchase();

  useEffect(() => {
    if (errorFetchSuppliers) {
      console.log("Error fetching suppliers:", errorFetchSuppliers);
      setFilteredSuppliers([]);
      return;
    }
    if (suppliersData?.length! > 0) {
      const uniqueSuppliers = Array.from(
        new Map(
          suppliersData?.map((s: supplierType) => [s.name.toLowerCase(), s])
        ).values()
      ).sort((a: supplierType, b: supplierType) => a.name.localeCompare(b.name));
      setFilteredSuppliers(uniqueSuppliers);
    } else {
      setFilteredSuppliers([]);
    }
  }, [suppliersData, errorFetchSuppliers]);

  useEffect(() => {
    if (errorFetchProducts) {
      console.log("Error fetching products:", errorFetchProducts);
      setFilteredProducts([]);
      return;
    }
    if (productsData?.length! > 0) {
      const uniqueProducts = Array.from(
        new Map(
          productsData?.map((p: ProductType) => [p.name.toLowerCase(), p])
        ).values()
      ).sort((a: ProductType, b: ProductType) => a.name.localeCompare(b.name));
      setFilteredProducts(uniqueProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [productsData, errorFetchProducts]);

  const handleSelectSupplier = (supplier: supplierType) => {
    setSeller({
      seller_id: supplier._id,
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
    });
    setOpen(false);
  };

  const handleSellerNameChange = (value: string) => {
    setSeller((prev) => ({
      ...prev,
      name: value,
      seller_id: filteredSuppliers.some((s) => s.name.toLowerCase() === value.toLowerCase())
        ? prev.seller_id
        : "",
    }));
    setOpen(!!value);
    if (suppliersData && value) {
      const filtered = suppliersData.filter((s: supplierType) =>
        s.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliersData || []);
    }
  };

  const handleSelectProduct = (product: ProductType) => {
    setExistingItem({
      product_id: product._id,
      purchase_qty: 1,
      purchase_price_per_unit: product.unit_price,
      product_name: product.name,
    });
    setOpenProductSearch(false);
  };

  const handleProductNameChange = (value: string) => {
    const selectedProduct = productsData?.find((p: ProductType) => p.name.toLowerCase() === value.toLowerCase());
    setExistingItem((prev) => ({
      ...prev,
      product_id: selectedProduct ? selectedProduct._id : "",
    }));
    setOpenProductSearch(!!value);
    if (productsData && value) {
      const filtered = productsData.filter((p: ProductType) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(productsData || []);
    }
  };

  const handleAddItem = () => {
    if (tab === "existing") {
      const { product_id, purchase_qty, purchase_price_per_unit } = existingItem;
      if (product_id && purchase_qty > 0 && purchase_price_per_unit > 0) {
        setExistingItems((prev) => [...prev, { ...existingItem }]);
        setExistingItem({
          product_id: "",
          purchase_qty: 0,
          purchase_price_per_unit: 0,
          product_name: "",
        });
      } else {
        alert("Please select a product and fill all required fields.");
      }
    } else {
      const { name, category, unit_price, unit_qty } = newItem;
      if (name && category && unit_price > 0 && unit_qty > 0) {
        setNewItems((prev) => [...prev, { ...newItem }]);
        setNewItem({
          name: "",
          image_url: "",
          category: "",
          available_unit: 0,
          minimum_threshold: 0,
          measurement_unit: "",
          unit_price: 0,
          unit_qty: 1,
          purchase_qty: 1,
          purchase_price_per_unit: 0,
          is_variable_qty: false,
          is_available: true,
        });
      } else {
        alert("Please fill all required fields for the new product.");
      }
    }
  };

  const handleSave = async () => {
    if (!seller.name) {
      toast.error("Please provide a seller name.");
      return;
    }
    if (!existingItems.length && !newItems.length) {
      toast.error("Please add at least one item to the purchase order.");
      return;
    }
    const purchaseCreatePayload = {
      seller,
      purchaseDate,
      existingItems,
      newItems,
    };
    //console.log(purchaseCreatePayload);
    try {
      // toast.loading("Saving purchase order...");
      await createPurchase({ shopId: user?.shop?.id!, data: purchaseCreatePayload, token: token! });
      toast.success("Purchase order saved successfully!");
      setSeller({
        name: "",
        email: "",
        phone: "",
      });
      setExistingItem({
        product_id: "",
        purchase_qty: 0,
        purchase_price_per_unit: 0,
        product_name: "",
      });
      setNewItem({
        name: "",
        image_url: "",
        category: "",
        available_unit: 0,
        minimum_threshold: 0,
        measurement_unit: "",
        unit_price: 0,
        unit_qty: 1,
        purchase_qty: 1,
        purchase_price_per_unit: 0,
        is_variable_qty: false,
        is_available: true,
      });
      setExistingItems([]);
      setNewItems([]);
      setPurchaseDate("");
      setFilteredSuppliers(suppliersData || []);
      setFilteredProducts(productsData || []);
      setOpen(false);
      setOpenProductSearch(false);
      setTab("existing");      
    } catch (error) {
      toast.error("Failed to save purchase order. Please try again.");
      console.log("Error saving purchase order:", error);
    }
  };

  return (
    <div className="min-h-screen mb-10">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-3xl font-bold text-foreground">
            Purchase Order Form
          </h1>
        </div>

        <SellerCard
          seller={seller}
          setSeller={setSeller}
          filteredSuppliers={filteredSuppliers}
          setFilteredSuppliers={setFilteredSuppliers}
          suppliersData={suppliersData}
          isLoadingSuppliers={isLoadingSuppliers}
          errorFetchSuppliers={errorFetchSuppliers}
          open={open}
          setOpen={setOpen}
          handleSelectSupplier={handleSelectSupplier}
          handleSellerNameChange={handleSellerNameChange}
        />

        <ProductCard
          tab={tab}
          setTab={setTab}
          existingItem={existingItem}
          setExistingItem={setExistingItem}
          newItem={newItem}
          setNewItem={setNewItem}
          productsData={productsData}
          isLoadingProducts={isLoadingProducts}
          errorFetchProducts={errorFetchProducts}
          handleAddItem={handleAddItem}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          openProductSearch={openProductSearch}
          setOpenProductSearch={setOpenProductSearch}
          handleSelectProduct={handleSelectProduct}
          handleProductNameChange={handleProductNameChange}
        />

        <Card className="border-2 shadow-sm backdrop-blur-sm">
          <CardHeader className="">
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <Calendar className="h-5 w-5 text-accent-foreground" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Expected Delivery Date</Label>
              <Input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          className="bg-accent-foreground w-full py-6 mb-4 text-white"
          disabled={isCreatingPurchase}
        >
          {isCreatingPurchase ? "Saving..." : "Save Purchase Order"}
        </Button>
      </div>
    </div>
  );
}