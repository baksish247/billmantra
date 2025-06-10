import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { log } from "console";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProductData {
  name: string;
  sales: number;
}

interface TopProductsChartProps {
  data: ProductData[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>In Selected Date Range</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} className="text-xs">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}