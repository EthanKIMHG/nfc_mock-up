import { motion } from "framer-motion";
import { CheckCircle2, LockKeyhole, Nfc, Server, Smartphone, Wallet } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import type { ScanMode, ScanStatus } from "../types";

interface ScanVisualProps {
    status: ScanStatus;
    mode: ScanMode;
    onTrigger: () => void;
}

export function ScanVisual({ status, mode, onTrigger }: ScanVisualProps) {
    const { t } = useLanguage();

    const getStatusText = () => {
        switch (status) {
            case "IDLE": return t('scan.tap');
            case "SCANNING": return t('status.scanning');
            case "SIGNING": return t('status.signing');
            case "VERIFYING": return t('status.verifying');
            case "SUCCESS": return t('status.success');
            default: return t('status.idle');
        }
    };
    
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer" onClick={onTrigger}>
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
                                {status === "VERIFYING" && <span className="text-[10px] text-orange-500/70 font-mono">{t('status.verifying')}</span>}
                            </div>
                           
                            {status === "IDLE" && (
                                <p className="text-xs text-white/30 uppercase tracking-widest mt-2">{t('scan.guide')}</p>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
