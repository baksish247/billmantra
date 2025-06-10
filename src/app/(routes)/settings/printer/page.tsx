// app/printer-setup/page.tsx

"use client";
import PrinterCard from "./components/PrinterCard";
import { Button } from "@/components/ui/button";

export default function PrinterSetupPage() {
  // const { device, connected, connectToPrinter, error } = useBluetoothPrinter();

  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-xl font-bold">Printer Setup</h1>

      {/* <PrinterCard
        deviceName={device?.name || "No Printer Selected"}
        status={connected ? "connected" : "disconnected"}
        onConnect={connectToPrinter}
      />

      {connected && (
        <Button
          onClick={() => {
            alert("Sending test print...");
            // you can send bytes via GATT here if printer supports it
          }}
        >
          Test Print
        </Button>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>} */}

      <p className="text-xs text-muted-foreground">
        Make sure Bluetooth is turned on and supported in your browser.
      </p>
    </div>
  );
}
