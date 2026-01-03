import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Loader2, Nfc, PenTool } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import type { POSMode } from "./POSModeSwitcher";

export type ScanStep = "IDLE" | "SCANNING" | "SIGNING" | "VERIFYING" | "SUCCESS" | "ERROR";

interface POSScanFlowProps {
    scanStep: ScanStep;
    mode: POSMode;
    onScan: () => void;
    onSignature: () => void;
    scannedUser: { name: string; type: string; nfcUid: string } | null;
    deviceId: string;
    errorMessage?: string;
    currentNfcUid?: string | null;
    pendingTransaction?: { item: string; price: string } | null;
}

export function POSScanFlow({ scanStep, mode, onScan, onSignature, scannedUser, deviceId, errorMessage, currentNfcUid, pendingTransaction }: POSScanFlowProps) {
    const { t } = useLanguage();

    return (
        <div className="flex-1 flex flex-col justify-end gap-6 relative">

            <AnimatePresence mode="wait">
                {/* 1. SIGNING STEP */}
                {scanStep === "SIGNING" && (
                    <motion.div
                        key="signing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 rounded-3xl backdrop-blur-md z-20 border border-white/10 space-y-4 py-4"
                    >
                        <PenTool size={48} className="text-blue-400 mt-4 animate-bounce" />
                        <h3 className="text-xl font-bold text-white">{t('scan.signature_required')}</h3>

                        {/* Display Payment Details if available */}
                        {mode === 'PAYMENT' && pendingTransaction && (
                            <div className="text-center">
                                <p className="text-zinc-500 text-xs font-bold uppercase mb-2 tracking-widest">Confirm Purchase</p>
                                <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{pendingTransaction.item}</h4>
                                <p className="text-3xl font-black text-blue-400 tracking-tighter">{pendingTransaction.price}</p>
                            </div>
                        )}

                        {/* Always Display NFC UID */}
                        {currentNfcUid && (
                            <div className=" px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                                <p className="text-blue-300 font-mono text-sm">NFC: {currentNfcUid}</p>
                            </div>
                        )}

                        <p className="text-gray-400 text-center px-8 ">{t('scan.signature_guide')}</p>

                        <div className="w-64 h-64 bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-600 mb-8 flex items-center justify-center text-zinc-600 font-mono">
                            {t('scan.signature_pad')}
                        </div>

                        <Button
                            onClick={onSignature}
                            size="lg"
                            className="w-64 max-w-xs bg-blue-500 hover:bg-blue-400 font-bold rounded-full h-14 text-lg shadow-lg"
                        >
                            {t('scan.confirm_signature')}
                        </Button>
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
                        <p className="text-black/50 font-mono mt-2 text-sm">UID: {scannedUser.nfcUid}</p>
                        <p className="text-black/50 font-mono mt-6">{t('scan.verified_blockchain')}</p>
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
                        <h3 className="text-xl font-bold text-white">{t('scan.verifying_credentials')}</h3>
                        <div className="mt-4 flex flex-col gap-1 items-center">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
                                <span>NFC: {currentNfcUid || "Scanning..."}</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 4. ERROR STEP */}
                {scanStep === "ERROR" && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-red-500 text-white rounded-3xl p-6 mb-4 text-center shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                    >
                        <div className="flex justify-center mb-2">
                            <AlertCircle size={40} />
                        </div>
                        <h3 className="text-xl font-bold">Error</h3>
                        <p className="text-white/80">{errorMessage || t('scan.invalid_ticket')}</p>
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
                            {t('scan.searching_nfc')}
                        </motion.span>
                    )}
                </div>

                {/* MAIN BUTTON */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onScan}
                    disabled={scanStep !== "IDLE"}
                    className={cn(
                        "relative w-full h-24 rounded-[2.5rem] flex items-center justify-center gap-4 text-2xl font-black tracking-wide shadow-2xl transition-all border",
                        scanStep === "IDLE"
                            ? "bg-white text-black border-white hover:bg-zinc-100 shadow-white/10"
                            : "bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed"
                    )}
                >
                    <Nfc size={28} />
                    {mode === "ENTRANCE" ? t('scan.scan_ticket') : t('scan.accept_payment')}

                    {/* Pulse */}
                    {scanStep === "IDLE" && (
                        <div className="absolute inset-0 rounded-[2.5rem] border border-white/40 animate-ping pointer-events-none" />
                    )}
                </motion.button>

                {/* Instructions */}
                <p className="text-center text-zinc-600 text-xs mt-6 font-medium">
                    {t('scan.hold_device')}
                </p>
            </div>

        </div>
    );
}
