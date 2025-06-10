// src/components/home/components/search-panel.tsx
"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SearchPanelProps {
  onSearchChange: (query: string) => void;
  items: any[];
  width?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suppliers?: { _id: string; name: string }[]; // Add suppliers prop
  isLoadingSuppliers?: boolean; // Add loading state for suppliers
}

export default function SearchPanel({
  onSearchChange,
  items,
  width = "100%",
  searchQuery,
  setSearchQuery,
  suppliers = [],
  isLoadingSuppliers = false,
}: SearchPanelProps) {
  const [open, setOpen] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  useEffect(() => {
    if (suppliers.length > 0) {
      // Filter unique supplier names (case-insensitive) and sort
      const uniqueSuppliers = Array.from(
        new Map(
          suppliers.map((s) => [s.name.toLowerCase(), s])
        ).values()
      ).sort((a, b) => a.name.localeCompare(b.name));
      setFilteredSuppliers(uniqueSuppliers);
    }
  }, [suppliers]);

  const handleSelectSupplier = (supplierName: string) => {
    setSearchQuery(supplierName);
    onSearchChange(supplierName);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
    setOpen(!!value); // Open dropdown only if there's input
    // Filter suppliers based on input
    const filtered = suppliers.filter((s) =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  return (
    <div className="relative" style={{ width }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or suppliers..."
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-input bg-background shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>
                {isLoadingSuppliers ? "Loading suppliers..." : "No suppliers found."}
              </CommandEmpty>
              <CommandGroup heading="Suppliers">
                {filteredSuppliers.map((supplier) => (
                  <CommandItem
                    key={supplier._id}
                    onSelect={() => handleSelectSupplier(supplier.name)}
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
  );
}