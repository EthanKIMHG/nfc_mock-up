import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MoreVertical, Nfc, QrCode, Zap, UserCheck, AlertCircle, CreditCard, Check, PenTool, Loader2 } from "lucide-react";
import { useState } from "react";
import { EVENTS } from "../../dashboard/data";

interface AdminPOSDashboardProps {
    eventId: string;
    onBack: () => void;
}

type ScanStep = "IDLE" | "SCANNING" | "SIGNING" | "VERIFYING" | "SUCCESS" | "ERROR";
type Mode = "ENTRANCE" | "PAYMENT";

export function AdminPOSDashboard({ eventId, onBack }: AdminPOSDashboardProps) {
    const event = EVENTS.find(e => e.id === eventId);

    const [mode, setMode] = useState<Mode>("ENTRANCE");
    const [scanStep, setScanStep] = useState<ScanStep>("IDLE");
    const [scannedUser, setScannedUser] = useState<{ name: string; type: string } | null>(null);
    const [checkedIn, setCheckedIn] = useState(event?.attendees.checkedIn || 0);

    // Simulated Flow
    const handleScan = () => {
        if (scanStep !== "IDLE") return;

        // 1. Scanning (NFC Search)
        setScanStep("SCANNING");

        setTimeout(() => {
            // 2. Found -> Request Signature
            setScanStep("SIGNING");
        }, 1500);
    };

    // Simulated Data
    const DEVICE_ID = "DEV-POS-082";

    const handleSignature = () => {
        // 3. Signature Received -> Verifying
        setScanStep("VERIFYING");

        // Simulate Payload Construction
        const payload = {
            nfc_uid: "04:A2:3C:91", // Mock UID
            device_id: DEVICE_ID,
            timestamp: new Date().toISOString(),
            signature: "admin_signed_hash"
        };
        console.log("Submitting Payload to Server:", payload);

        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success
            if (success) {
                // 4. Verification Complete -> Success
                setScanStep("SUCCESS");
                if (mode === "ENTRANCE") setCheckedIn(prev => prev + 1);
                setScannedUser({
                    name: "Kim Min-soo",
                    type: mode === "ENTRANCE" ? "VIP ACCESS" : "PAYMENT APPROVED"
                });

                // Reset
                setTimeout(() => {
                    setScanStep("IDLE");
                    setScannedUser(null);
                }, 2500);
            } else {
                setScanStep("ERROR");
                setTimeout(() => setScanStep("IDLE"), 2500);
            }
        }, 1500);
    };

    if (!event) return <div>Event not found</div>;

    const capacityPercentage = Math.round((checkedIn / event.attendees.total) * 100);

    return (
        <div className="flex flex-col h-[100dvh] relative overflow-hidden bg-black">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm sticky top-0">
                <button
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white active:bg-white/20 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="font-bold text-white max-w-[200px] truncate text-center">
                    {event.name}
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 active:text-white transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Device ID Indicator */}
            <div className="text-[10px] text-zinc-600 font-mono text-center mt-2 mb-2 uppercase tracking-widest">
                Term: {DEVICE_ID}
            </div>

            {/* Mode Switcher */}
            <div className="px-6 mb-4">
                <div className="bg-zinc-900/80 p-1 rounded-2xl flex relative overflow-hidden">
                    <motion.div
                        className="absolute h-[calc(100%-8px)] top-1 w-[calc(50%-4px)] bg-zinc-700 rounded-xl shadow-sm z-0"
                        animate={{ x: mode === "ENTRANCE" ? 4 : "100%" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    <button
                        onClick={() => setMode("ENTRANCE")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 text-sm font-bold transition-colors ${mode === "ENTRANCE" ? "text-white" : "text-gray-500"}`}
                    >
                        <UserCheck size={16} />
                        Entrance
                    </button>
                    <button
                        onClick={() => setMode("PAYMENT")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 text-sm font-bold transition-colors ${mode === "PAYMENT" ? "text-white" : "text-gray-500"}`}
                    >
                        <CreditCard size={16} />
                        Payment
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col px-6 pb-6">

                {/* Status Card (Only visible when IDLE or Scanning) */}
                <AnimatePresence>
                    {(scanStep === "IDLE" || scanStep === "SCANNING") && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-zinc-900/80 border border-white/5 rounded-3xl p-6 mb-auto relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                {mode === "ENTRANCE" ? <UserCheck size={80} className="text-white" /> : <CreditCard size={80} className="text-white" />}
                            </div>

                            <div className="relative z-10">
                                <div className="text-gray-400 text-sm font-medium mb-1">
                                    {mode === "ENTRANCE" ? "Current Capacity" : "Today's Revenue"}
                                </div>
                                {mode === "ENTRANCE" ? (
                                    <>
                                        <div className="flex items-end gap-3 mb-2">
                                            <span className="text-5xl font-black text-white tracking-tighter">
                                                {capacityPercentage}%
                                            </span>
                                            <span className="text-lg text-gray-500 font-mono mb-1.5">
                                                {checkedIn.toLocaleString()} / {event.attendees.total.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${capacityPercentage > 90 ? 'bg-red-500' : 'bg-green-500'}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${capacityPercentage}%` }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-end gap-3 mb-2">
                                        <span className="text-5xl font-black text-white tracking-tighter">
                                            ₩12.5M
                                        </span>
                                        <span className="text-lg text-green-500 font-mono mb-1.5 animate-pulse">
                                            + Live
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* VISUAL WORKFLOW AREA */}
                <div className="flex-1 flex flex-col justify-end gap-6 relative">

                    <AnimatePresence mode="wait">
                        {/* 1. SIGNING STEP */}
                        {scanStep === "SIGNING" && (
                            <motion.div
                                key="signing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 rounded-3xl backdrop-blur-md z-20 border border-white/10"
                            >
                                <PenTool size={48} className="text-blue-400 mb-4 animate-bounce" />
                                <h3 className="text-2xl font-bold text-white mb-2">Signature Required</h3>
                                <p className="text-gray-400 text-center px-8 mb-8">Please ask the user to sign to verify identity.</p>

                                <div className="w-64 h-32 bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-600 mb-8 flex items-center justify-center text-zinc-600 font-mono">
                                    [ SIGNATURE PAD AREA ]
                                </div>

                                <button
                                    onClick={handleSignature}
                                    className="w-full max-w-xs bg-blue-500 text-white font-bold py-4 rounded-full shadow-lg hover:bg-blue-400 transition-colors"
                                >
                                    Confirm Signature
                                </button>
                            </motion.div>
                        )}

                        {/* 2. SUCCESS STEP */}
                        {scanStep === "SUCCESS" && scannedUser && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-green-500 rounded-3xl z-20 shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    className="w-24 h-24 bg-black/20 rounded-full flex items-center justify-center mb-6"
                                >
                                    <Check size={48} className="text-black stroke-[4]" />
                                </motion.div>
                                <h3 className="text-3xl font-black uppercase text-black mb-2 tracking-tight">{scannedUser.type}</h3>
                                <p className="text-black/70 font-bold text-xl">{scannedUser.name}</p>
                                <p className="text-black/50 font-mono mt-8">Verified via Blockchain</p>
                            </motion.div>
                        )}

                        {/* 3. VERIFYING STEP */}
                        {scanStep === "VERIFYING" && (
                            <motion.div
                                key="verifying"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-3xl z-20 backdrop-blur-sm"
                            >
                                <Loader2 size={64} className="text-blue-500 animate-spin mb-6" />
                                <h3 className="text-xl font-bold text-white">Verifying Credentials...</h3>
                                <div className="mt-4 flex flex-col gap-1 items-center">
                                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span>DEVICE: {DEVICE_ID}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
                                        <span>NFC: 04:A2:3C:91</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* Action Button Area */}
                    <div className="mt-auto">
                        {/* Prompt Text */}
                        <div className="h-8 flex items-center justify-center mb-4">
                            {scanStep === "SCANNING" && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 text-blue-400 font-bold"
                                >
                                    <Loader2 size={16} className="animate-spin" />
                                    Searching for NFC...
                                </motion.span>
                            )}
                        </div>

                        {/* MAIN BUTTON */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleScan}
                            disabled={scanStep !== "IDLE"}
                            className={`
                                relative w-full h-24 rounded-[2.5rem] flex items-center justify-center gap-4 text-2xl font-black tracking-wide shadow-2xl transition-all border
                                ${scanStep === "IDLE"
                                    ? "bg-white text-black border-white hover:bg-zinc-100 shadow-white/10"
                                    : "bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed"}
                            `}
                        >
                            <Nfc size={28} />
                            {mode === "ENTRANCE" ? "SCAN TICKET" : "ACCEPT PAYMENT"}

                            {/* Pulse */}
                            {scanStep === "IDLE" && (
                                <div className="absolute inset-0 rounded-[2.5rem] border border-white/40 animate-ping pointer-events-none" />
                            )}
                        </motion.button>

                        {/* Instructions */}
                        <p className="text-center text-zinc-600 text-xs mt-6 font-medium">
                            Hold device near guest's phone or card
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
