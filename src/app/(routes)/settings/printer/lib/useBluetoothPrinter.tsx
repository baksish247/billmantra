// // app/printer-setup/lib/useBluetoothPrinter.ts

// import { useState } from "react";

// export function useBluetoothPrinter() {
//   const [device, setDevice] = useState<any>(null);
//   const [connected, setConnected] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function connectToPrinter() {
//     try {
//       setError(null);
//       const device = await navigator?.bluetooth?.requestDevice({
//         acceptAllDevices: true,
//         optionalServices: ["battery_service"], // Add more if needed
//       });

//       setDevice(device);
//       const server = await device.gatt?.connect();
//       if (server?.connected) {
//         setConnected(true);
//       }
//     } catch (err: any) {
//       console.log(err);
//       setError(err.message || "Failed to connect");
//     }
//   }

//   return { device, connected, connectToPrinter, error };
// }
