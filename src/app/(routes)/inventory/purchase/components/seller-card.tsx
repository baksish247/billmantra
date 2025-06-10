// components/SellerCard.tsx
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, User } from "lucide-react";
import { Seller } from "../types"; // Adjust path as needed

type supplierType = { _id: string; name: string; email: string; phone: string };

interface SellerCardProps {
  seller: Seller;
  setSeller: React.Dispatch<React.SetStateAction<Seller>>;
  filteredSuppliers: supplierType[];
  setFilteredSuppliers: React.Dispatch<React.SetStateAction<supplierType[]>>;
  suppliersData: supplierType[] | undefined;
  isLoadingSuppliers: boolean;
  errorFetchSuppliers: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectSupplier: (supplier: supplierType) => void;
  handleSellerNameChange: (value: string) => void;
}

const SellerCard: React.FC<SellerCardProps> = ({
  seller,
  setSeller,
  filteredSuppliers,
  setFilteredSuppliers,
  suppliersData,
  isLoadingSuppliers,
  errorFetchSuppliers,
  open,
  setOpen,
  handleSelectSupplier,
  handleSellerNameChange,
}) => {
  return (
    <Card className="border-2 shadow-sm backdrop-blur-sm">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <User className="h-5 w-5 text-accent-foreground" />
          Seller Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Seller Name with Search */}
          <div className="space-y-1.5">
            <Label className="text-sm text-foreground">Full Name</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search or enter seller name"
                    value={seller.name}
                    onChange={(e) => handleSellerNameChange(e.target.value)}
                    className="pl-10 pr-4 py-2 h-9 text-sm"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search supplier..."
                    value={seller.name}
                    onValueChange={handleSellerNameChange}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {isLoadingSuppliers
                        ? "Loading suppliers..."
                        : "No suppliers found. Enter details manually."}
                    </CommandEmpty>
                    <CommandGroup heading="Suppliers">
                      {filteredSuppliers.map((supplier) => (
                        <CommandItem
                          key={supplier._id}
                          onSelect={() => handleSelectSupplier(supplier)}
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          {supplier.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Email and Phone Fields */}
          {["email", "phone"].map((field) => (
            <div key={field} className="space-y-1.5">
              <Label className="text-sm text-foreground">
                {field === "email" ? "Email Address (optional)" : "Phone Number (optional)"}
              </Label>
              <Input
                type={field === "email" ? "email" : "text"}
                placeholder={field === "email" ? "seller@example.com" : "+91 9876543210"}
                value={seller[field as keyof Seller]}
                onChange={(e) =>
                  setSeller({ ...seller, [field]: e.target.value })
                }
                className="h-9 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Error Handling */}
        {errorFetchSuppliers && (
          <p className="text-red-500 text-sm">
            Error fetching suppliers: {errorFetchSuppliers.message || "Unknown error"}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerCard;
