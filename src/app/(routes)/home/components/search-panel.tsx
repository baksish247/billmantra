"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
type SearchPanelProps = {
  onSearchChange: (query: string) => void;
  items: any[];
  width?: string;
  searchQuery: string;
  setSearchQuery:React.Dispatch<React.SetStateAction<string>>;
}

const SearchPanel = ({ onSearchChange, items, width,searchQuery,setSearchQuery }: SearchPanelProps) => {

  const clearSearch = () => {
    setSearchQuery("");
    onSearchChange("");
    document.getElementById("search-input")?.focus();
  };

  useEffect(() => {
    onSearchChange(searchQuery);
  }, [searchQuery, onSearchChange]);

  // const getSuggestions = () => {
  //   if (!searchQuery) return [];
  //   return Array.from(
  //     new Set(
  //       items
  //         .filter((item: any) =>
  //           item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //         )
  //         .map((item: any) => item.name)
  //         .slice(0, 5)
  //     )
  //   );
  // };

  // const suggestions = getSuggestions();

  return (
    <div
      className="fixed top-0 right-0 p-4 z-50 bg-background"
      style={{ width: width || "100%" }}
    >
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="pl-10 pr-10 h-12 rounded-full"
        />
        {searchQuery && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={clearSearch}
          >
            <X />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
