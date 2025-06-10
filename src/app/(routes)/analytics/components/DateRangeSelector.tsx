import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DateRangeSelectorProps {
  onDateRangeChange: (range: string, startDate: string, endDate: string) => void;
}

function getFormattedDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDateRange(range: string): { startDate: string; endDate: string } {
  const today = new Date();
  let startDate = new Date();
  let endDate = new Date();

  if (range === "last7days") {
    startDate.setDate(today.getDate() - 6);
  } else if (range === "last30days") {
    startDate.setDate(today.getDate() - 29);
  } else if (range === "thisMonth") {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  }

  return {
    startDate: getFormattedDate(startDate),
    endDate: getFormattedDate(endDate),
  };
}

export function DateRangeSelector({ onDateRangeChange }: DateRangeSelectorProps) {
  const [dateRange, setDateRange] = useState("last7days");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  useEffect(() => {
    if (dateRange !== "custom") {
      const { startDate, endDate } = getDateRange(dateRange);
      onDateRangeChange(dateRange, startDate, endDate);
    } else if (customStart && customEnd) {
      onDateRangeChange(dateRange, customStart, customEnd);
    }
  }, [dateRange, customStart, customEnd]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {dateRange === "last7days" && "Last 7 Days"}
          {dateRange === "last30days" && "Last 30 Days"}
          {dateRange === "thisMonth" && "This Month"}
          {dateRange === "custom" && "Custom Range"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-3 space-y-2">
        <div className="space-y-1">
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
            onClick={() => setDateRange("last7days")}
          >
            Last 7 Days
          </button>
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
            onClick={() => setDateRange("last30days")}
          >
            Last 30 Days
          </button>
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
            onClick={() => setDateRange("thisMonth")}
          >
            This Month
          </button>
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
            onClick={() => setDateRange("custom")}
          >
            Custom Range
          </button>
        </div>

        {dateRange === "custom" && (
          <div className="space-y-2 pt-2 border-t">
            <div>
              <label className="text-sm text-gray-700">Start Date</label>
              <Input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">End Date</label>
              <Input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
