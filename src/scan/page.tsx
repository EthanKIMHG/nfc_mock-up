import type { NFTTicket } from "@/types/ticket";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ModeSwitcher } from "./components/ModeSwitcher";
import { PayloadInspector } from "./components/PayloadInspector";
import { ResultDrawer } from "./components/ResultDrawer";
import { ScanVisual } from "./components/ScanVisual";
import { TopBar } from "./components/TopBar";
import type { ScanMode, ScanStatus } from "./types";

export default function ScanPage() {
  const [status, setStatus] = useState<ScanStatus>("IDLE");
  const [mode, setMode] = useState<ScanMode>("ENTRY");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scannedData, setScannedData] = useState<NFTTicket | null>(null);
  const [payload, setPayload] = useState<any>(null);

  const handleScanTrigger = () => {
    // Manual State Transition Logic for Presentation
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    switch (status) {
      case "IDLE":
        setStatus("SCANNING");
        break;
      case "SCANNING": {
        setStatus("SIGNING");
        // Construct Payload when moving to SIGNING
        const mockPayload = {
          device_id: mode === "ENTRY" ? "GATE-01" : "POS-01",
          action: mode,
          band_id: "BND-" + Math.random().toString(36).substr(2, 6),
          ...(mode === "PAYMENT" && { amount: 10000 }),
          timestamp: Math.floor(Date.now() / 1000),
          nonce: Math.random().toString(36).substr(2, 8),
          request_id: crypto.randomUUID().split('-')[0]
        };
        setPayload(mockPayload);
        break;
      }
      case "SIGNING":
        setStatus("VERIFYING");
        break;
      case "VERIFYING":
        setStatus("SUCCESS");
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        toast.success(mode === "ENTRY" ? "Entry Approved" : "Payment Successful", {
          description: `Signature Verified. ${mode === "PAYMENT" ? "10,000 KRW deducted." : "Welcome!"}`,
          icon: <ShieldCheck className="text-lime-500" />
        });

        // Set final ticket data
        setScannedData({
          id: "NFT-882910",
          wristbandId: payload?.band_id || "WB-123456",
          eventName: "2024 Tech Conference",
          eventDate: "2024-05-20",
          owner: {
            name: "Jaehee Kim",
            did: "did:eth:0x71C...9A21",
            profileImage: "https://github.com/shadcn.png"
          },
          seatInfo: {
            zone: "VIP",
            row: "A",
            number: "1"
          },
          status: "ACTIVE",
          issuedAt: new Date().toISOString()
        });
        setIsDrawerOpen(true);
        break;
      case "SUCCESS":
        // Optional: Click again to reset? Or just do nothing until drawer is closed
        break;
    }
  };

  const handleReset = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setStatus("IDLE");
      setScannedData(null);
      setPayload(null);
    }, 300);
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-black">
      <TopBar status={status} mode={mode} />

      <ModeSwitcher mode={mode} setMode={setMode} status={status} />

      <ScanVisual status={status} mode={mode} onTrigger={handleScanTrigger} />

      <PayloadInspector status={status} payload={payload} />

      <ResultDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        scannedData={scannedData}
        mode={mode}
        onReset={handleReset}
      />
    </div>
  );
}