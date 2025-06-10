"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface PaymentData {
  name: string;
  value: number;
}

interface PaymentMethodChartProps {
  data: PaymentData[];
}

// Define unique color mapping for known payment methods
const colorMap: Record<string, string> = {
  UPI: "#4285F4",      // Blue
  KHATA: "#34A853",    // Green
  CASH: "#FBBC05",     // Yellow
  CARD: "#EA4335",     // Red
  OTHERS: "#9C27B0",   // Purple
};

export function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  // Generate color by name or fallback to a default
  const getColor = (name: string) => {
    return colorMap[name.toUpperCase()] || "#8884d8";
  };

  return (
    <>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Breakdown by mode of payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getColor(entry.name)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {data.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getColor(entry.name) }}
                  ></div>
                  <span className="text-sm">
                    {entry.name}: ₹{entry.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
