import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

interface FilterControlsProps {
  isMobile: boolean;
}

export function FilterControls({ isMobile }: FilterControlsProps) {
  return (
    <div className="flex gap-2">
      <Select defaultValue="all">
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stores</SelectItem>
          <SelectItem value="store1">Store #1</SelectItem>
          <SelectItem value="store2">Store #2</SelectItem>
          <SelectItem value="store3">Store #3</SelectItem>
        </SelectContent>
      </Select>

      {!isMobile && (
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      )}

      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Filter your analytics data
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="store1">Store #1</SelectItem>
                  <SelectItem value="store2">Store #2</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Product Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}