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
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CogIcon, CreditCard, Nfc } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useTicketContext } from "@/context/TicketContext";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "SUCCESS">("IDLE");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const { incrementEntered } = useTicketContext();

  // 시뮬레이션 로직
  const handleScanTrigger = () => {
    if (status !== "IDLE") return;

    setStatus("SCANNING");
    
    // Haptic Feedback (Mobile)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    // 1. 랜덤 딜레이 (100ms ~ 1000ms)
    const delay = Math.floor(Math.random() * 900) + 1000;

    setTimeout(() => {
      // 2. 성공 처리
      setStatus("SUCCESS");
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // 성공 진동 패턴
      
      toast.success("NFC Tag Detected", {
        description: "Ticket data loaded successfully.",
      });

      // 3. 데이터 로드 및 드로어 오픈 (0.5초 뒤)
      setTimeout(() => {
        setScannedData({
          ticketId: "NFT-882910",
          name: "Jaehee Kim",
          tier: "VIP Access",
          seat: "Zone A - Row 1",
        });
        setIsDrawerOpen(true);
      }, 500);
    }, delay);
  };

  // 드로어가 닫히면 상태 초기화
  const handleReset = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
        setStatus("IDLE");
        setScannedData(null);
    }, 300); // 드로어 닫히는 애니메이션 시간 고려
  };

  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden">
      {/* 1. Top Bar: Minimal Floating */}
      <div className="z-10 w-full flex justify-between mt-6">
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="text-white/50 hover:text-white transition-colors"
        >
              <ArrowLeft size={20} />
        </Button>
      
        {/* Floating Status Pill */}
        <div className={`
            px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-500 flex items-center gap-2
            ${status === "SCANNING" 
                ? "bg-purple-500/10 border-purple-500/30 text-purple-300" 
                : status === "SUCCESS"
                ? "bg-lime-500/10 border-lime-500/30 text-lime-400"
                : "bg-white/5 border-white/10 text-gray-400"}
        `}>
             <div className={`w-1.5 h-1.5 rounded-full ${
                 status === "SCANNING" ? "bg-purple-400 animate-pulse" :
                 status === "SUCCESS" ? "bg-lime-400" : "bg-gray-500"
             }`} />
             <span className="text-xs font-medium tracking-widest uppercase">
                {status === "IDLE" && "Ready"}
                {status === "SCANNING" && "Scanning"}
                {status === "SUCCESS" && "Verified"}
             </span>
        </div>

        <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/50 hover:text-white  transition-colors"
        >
              <CogIcon size={20} />
        </Button>
      </div>

      {/* 2. Main Interaction Area (Invisible Trigger) */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer"
        onClick={handleScanTrigger}
      >
        {/* Breathing Gradient Circle (Framer Motion) */}
        <motion.div
            className="relative w-80 h-80 flex items-center justify-center"
            animate={status === "SCANNING" 
                ? { scale: [1, 0.95, 1.05, 1], opacity: 1 } 
                : { scale: 1, opacity: 0.8 }
            }
            transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
            }}
        >
            {/* Soft Ambient Glow */}
            <div className={`absolute inset-0 rounded-full blur-[80px] transition-colors duration-1000 ${
                status === "SCANNING" ? "bg-purple-600/20" : 
                status === "SUCCESS" ? "bg-lime-500/20" : "bg-white/5"
            }`} />

            {/* Ripple Rings */}
            {status === "SCANNING" && [1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-purple-500/20"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.4,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Center Icon */}
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
                        <Nfc size={64} strokeWidth={1} className={`text-white/80 ${status === "SCANNING" ? "animate-pulse" : ""}`} />
                        <p className={`text-sm tracking-[0.2em] uppercase font-light text-white/40 transition-opacity ${status === "SCANNING" ? "opacity-0" : "opacity-100"}`}>
                            Tap to Scan
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
      </div>

      {/* 3. Bottom Controls */}
      <div className="z-10 w-full flex flex-col items-center gap-4 mb-8">
        <Button 
            className="bg-white/5 text-white/50 hover:text-white hover:bg-white/10 rounded-full px-6 py-6 h-auto text-xs tracking-widest uppercase backdrop-blur-sm border border-white/5 transition-all"
        >
            <CreditCard className="mr-2 h-4 w-4" /> Manual Entry
        </Button>
      </div>

      {/* 4. Result Drawer (Shadcn - Styled) */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-zinc-950/90 backdrop-blur-xl border-zinc-800 text-white pb-8">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="mb-4">
              <DrawerTitle className="text-3xl font-medium text-center text-white tracking-tight">Access Granted</DrawerTitle>
              <DrawerDescription className="text-center text-gray-400 font-light">
                Ticket verified successfully.
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-6 pb-2">
              {/* Ticket Card Component - Simplified */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                    {scannedData?.name.charAt(0)}
                 </div>
                 <div className="text-center">
                    <h3 className="text-xl font-medium text-white">{scannedData?.name}</h3>
                    <p className="text-xs text-lime-400 font-mono mt-1">{scannedData?.ticketId}</p>
                 </div>
                 <div className="flex gap-4 w-full mt-2">
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Tier</p>
                        <p className="text-sm font-medium">{scannedData?.tier}</p>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                         <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Zone</p>
                        <p className="text-sm font-medium">{scannedData?.seat}</p>
                    </div>
                 </div>
              </div>
            </div>

            <DrawerFooter className="gap-3">
              <Button 
                onClick={() => {
                   incrementEntered();
                   handleReset();
                }} 
                className="w-full bg-white text-black hover:bg-gray-200 rounded-full h-14 text-base font-medium tracking-wide"
              >
                Approve Entry
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