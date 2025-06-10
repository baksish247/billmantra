// app/printer-setup/components/PrinterCard.tsx

import { Bluetooth } from "lucide-react";

export default function PrinterCard({
  deviceName,
  status,
  onConnect,
}: {
  deviceName: string;
  status: "connected" | "disconnected";
  onConnect: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
      <div>
        <p className="font-medium">{deviceName}</p>
        <p className="text-sm text-muted-foreground">
          {status === "connected" ? "Connected" : "Not Connected"}
        </p>
      </div>
      <button
        onClick={onConnect}
        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md"
      >
        <Bluetooth className="w-4 h-4" />
        {status === "connected" ? "Connected" : "Connect"}
      </button>
    </div>
  );
}
