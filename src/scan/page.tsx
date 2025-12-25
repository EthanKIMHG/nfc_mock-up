import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Code, CogIcon, LockKeyhole, Nfc, Server, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { NFTTicket } from "@/types/ticket";
import { useNavigate } from "react-router-dom";
import { useTicketContext } from "../context/TicketContextTypes";

type ScanStatus = "IDLE" | "SCANNING" | "SIGNING" | "VERIFYING" | "SUCCESS";
type ScanMode = "ENTRY" | "PAYMENT";

export default function ScanPage() {
  const [status, setStatus] = useState<ScanStatus>("IDLE");
  const [mode, setMode] = useState<ScanMode>("ENTRY");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scannedData, setScannedData] = useState<NFTTicket | null>(null);
  const [payload, setPayload] = useState<any>(null);
  
  const { incrementEntered } = useTicketContext();

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

  const navigate = useNavigate();

  // Dynamic Styles based on Status
  const getStatusColor = () => {
    switch (status) {
        case "SCANNING": return "text-purple-300 border-purple-500/30 bg-purple-500/10";
        case "SIGNING": return "text-cyan-300 border-cyan-500/30 bg-cyan-500/10";
        case "VERIFYING": return "text-orange-300 border-orange-500/30 bg-orange-500/10";
        case "SUCCESS": return "text-lime-400 border-lime-500/30 bg-lime-500/10";
        default: return "text-gray-400 border-white/10 bg-white/5";
    }
  };

  const getStatusDotColor = () => {
    switch (status) {
        case "SCANNING": return "bg-purple-400 animate-pulse";
        case "SIGNING": return "bg-cyan-400 animate-pulse";
        case "VERIFYING": return "bg-orange-400 animate-pulse";
        case "SUCCESS": return "bg-lime-400";
        default: return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
        case "IDLE": return `Tap to ${mode === "ENTRY" ? "Start" : "Pay"}`;
        case "SCANNING": return "Detecting Tag... (Tap)";
        case "SIGNING": return "Signing Data... (Tap)";
        case "VERIFYING": return "Verifying... (Tap)";
        case "SUCCESS": return "Access Granted";
        default: return `${mode === "ENTRY" ? "Entry" : "Payment"} Mode Ready`;
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-black">
      {/* Top Bar */}
      <div className="z-10 w-full flex justify-between mt-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={20} />
        </Button>
      
        <div className={`px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-500 flex items-center gap-2 ${getStatusColor()}`}>
             <div className={`w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ${getStatusDotColor()}`} />
             <span className="text-xs font-medium tracking-widest uppercase">
                 {status === "IDLE" ? mode : status}
             </span>
        </div>

        <Button variant="ghost" size="icon" className="text-white/50 hover:text-white transition-colors">
              <CogIcon size={20} />
        </Button>
      </div>

      {/* Mode Switcher */}
      <div className="z-10 mt-4">
        <Tabs defaultValue="ENTRY" value={mode} onValueChange={(v) => setMode(v as ScanMode)} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white/50">
                <TabsTrigger value="ENTRY" disabled={status !== "IDLE"}>Entry</TabsTrigger>
                <TabsTrigger value="PAYMENT" disabled={status !== "IDLE"}>Pay</TabsTrigger>
            </TabsList>
        </Tabs>
      </div>

      {/* Main Interaction Area */}
      <div className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer" onClick={handleScanTrigger}>
        <motion.div
            className="relative w-80 h-80 flex items-center justify-center"
            animate={status !== "IDLE" && status !== "SUCCESS"
                ? { scale: [1, 0.98, 1.02, 1], opacity: 1 } 
                : { scale: 1, opacity: 0.8 }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Ambient Glow */}
            <div className={`absolute inset-0 rounded-full blur-[80px] transition-colors duration-1000 ${
                status === "SCANNING" ? "bg-purple-600/20" : 
                status === "SIGNING" ? "bg-cyan-600/20" :
                status === "VERIFYING" ? "bg-orange-600/20" :
                status === "SUCCESS" ? "bg-lime-500/20" : "bg-white/5"
            }`} />

            {/* Ripple Rings */}
            {status !== "IDLE" && status !== "SUCCESS" && [1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className={`absolute inset-0 rounded-full border ${
                        status === "SCANNING" ? "border-purple-500/20" :
                        status === "SIGNING" ? "border-cyan-500/20" :
                        "border-orange-500/20"
                    }`}
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                />
            ))}

            {/* Center Visual */}
            <div className="z-20 text-white relative flex flex-col items-center gap-4 transition-transform duration-500 active:scale-95">
                {status === "SUCCESS" ? (
                     <motion.div 
                        initial={{ scale: 0, rotate: -45 }} 
                        animate={{ scale: 1, rotate: 0 }}
                        className="flex items-center justify-center w-24 h-24 rounded-full bg-lime-400 text-black shadow-[0_0_40px_rgba(163,230,53,0.4)]"
                     >
                        <CheckCircle2 size={40} />
                     </motion.div>
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        {status === "IDLE" && (mode === "ENTRY" ? <Smartphone size={64} className="text-white/80" /> : <Wallet size={64} className="text-white/80" />)}
                        {status === "SCANNING" && <Nfc size={64} className="text-purple-400 animate-pulse" />}
                        {status === "SIGNING" && <LockKeyhole size={64} className="text-cyan-400 animate-pulse" />}
                        {status === "VERIFYING" && <Server size={64} className="text-orange-400 animate-pulse" />}
                        
                        <div className="flex flex-col items-center gap-2">
                             <p className="text-sm tracking-[0.2em] uppercase font-bold text-white transition-opacity">
                                {getStatusText()}
                            </p>
                            {status === "SIGNING" && <span className="text-[10px] text-cyan-500/70 font-mono">HMAC-SHA256 (Device Key)</span>}
                            {status === "VERIFYING" && <span className="text-[10px] text-orange-500/70 font-mono">Verifying Signature...</span>}
                        </div>
                       
                        {status === "IDLE" && (
                            <p className="text-xs text-white/30 uppercase tracking-widest mt-2">Tap to {mode === "ENTRY" ? "Verify Entry" : "Charge 10,000₩"}</p>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
      </div>

       {/* Payload Debug View (Visible during Signing/Verifying) */}
       {(status === "SIGNING" || status === "VERIFYING" || payload) && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 w-full max-w-sm bg-black/50 backdrop-blur-md rounded-xl border border-white/10 p-3 mb-20 overflow-hidden"
        >
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                <Code size={10} /> Payload Inspector
            </div>
            <pre className="text-[10px] font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(payload, null, 2)}
            </pre>
            {status === "VERIFYING" && (
                <div className="mt-2 text-[10px] items-center gap-2 flex text-lime-400 font-mono border-t border-white/5 pt-2">
                    <ShieldCheck size={10} /> Signature Valid
                </div>
            )}
        </motion.div>
      )}


      {/* Result Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-zinc-950/90 backdrop-blur-xl border-zinc-800 text-white pb-8">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="mb-4">
              <DrawerTitle className="text-3xl font-medium text-center text-white tracking-tight">
                  {mode === "ENTRY" ? "Access Granted" : "Payment Success"}
              </DrawerTitle>
              <DrawerDescription className="text-center text-gray-400 font-light">
                 transaction confirmed.
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-6 pb-2">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                    {scannedData?.owner.name.charAt(0)}
                 </div>
                 <div className="text-center">
                    <h3 className="text-xl font-medium text-white">{scannedData?.owner.name}</h3>
                    <p className="text-xs text-lime-400 font-mono mt-1">{scannedData?.id}</p>
                 </div>
                 
                 {/* Transaction Info (Dynamic based on Mode) */}
                 <div className="w-full bg-white/5 rounded-xl p-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{mode === "ENTRY" ? "Action" : "Amount"}</span>
                    <span className="text-lg font-bold font-mono">
                        {mode === "ENTRY" ? "ENTRY LOG" : "₩ 10,000"}
                    </span>
                 </div>

                 {/* Device Signature Info Badge */}
                 <div className="w-full bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-2 flex items-center justify-center gap-2">
                    <ShieldCheck size={12} className="text-cyan-400" />
                    <span className="text-[10px] text-cyan-400 font-mono">
                        Signed by {mode === "ENTRY" ? "GATE-01" : "POS-01"}
                    </span>
                 </div>
              </div>
            </div>

            <DrawerFooter className="gap-3">
              <Button 
                onClick={() => {
                   if (mode === "ENTRY") incrementEntered();
                   handleReset();
                }} 
                className="w-full bg-white text-black hover:bg-gray-200 rounded-full h-14 text-base font-medium tracking-wide"
              >
                Confirm
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" onClick={handleReset} className="w-full text-white/50 hover:text-white rounded-full h-12">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}