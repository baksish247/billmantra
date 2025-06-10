import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="px-2 h-8 text-xs font-normal hover:bg-accent/50 flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Continue Shopping
        </Button>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-accent/30 rounded-full w-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
} 