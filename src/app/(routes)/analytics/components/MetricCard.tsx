import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export function MetricCard({ title, value, change, isPositive }: MetricCardProps) {

  
  return (
    <Card className="bg-gradient-to-bl from-blue-50 to-blue-200 border-indigo-200 border-2">
      <CardContent className="px-4 h-24 w-24 ">
        <div className="flex justify-between items-center h-24">
          <div className="grid grid-rows-2">
            <p className="text-sm text-slate-900">{title}</p>
            <p className="text-2xl  text-accent-foreground font-semibold mt-1">{value}</p>
            {!change.includes("0") && <div
              className={`flex items-center mt-1 text-xs ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "↑" : "↓"} {change}
            </div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}