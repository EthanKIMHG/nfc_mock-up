import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreditCard, UserCheck } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

export type POSMode = "ENTRANCE" | "PAYMENT";

interface POSModeSwitcherProps {
    mode: POSMode;
    setMode: (mode: POSMode) => void;
    disabled?: boolean;
}

export function POSModeSwitcher({ mode, setMode, disabled }: POSModeSwitcherProps) {
    const { t } = useLanguage();
    
    return (
        <div className={cn("px-6 mb-4 transition-opacity duration-300", disabled && "opacity-50")}>
            <div className="bg-zinc-900/80 p-1 rounded-2xl flex relative overflow-hidden border border-zinc-800">
                <motion.div
                    className="absolute h-[calc(100%-8px)] top-1 w-[calc(50%-4px)] bg-zinc-700 rounded-xl shadow-sm z-0"
                    animate={{ x: mode === "ENTRANCE" ? 4 : "100%" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
                <button
                    onClick={() => setMode("ENTRANCE")}
                    disabled={disabled}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 text-sm font-bold transition-all",
                        mode === "ENTRANCE" ? "text-white" : "text-gray-500 hover:text-gray-300",
                        disabled && "cursor-not-allowed"
                    )}
                >
                    <UserCheck size={16} />
                    {t('mode.entrance')}
                </button>
                <button
                    onClick={() => setMode("PAYMENT")}
                    disabled={disabled}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 text-sm font-bold transition-all",
                        mode === "PAYMENT" ? "text-white" : "text-gray-500 hover:text-gray-300",
                        disabled && "cursor-not-allowed"
                    )}
                >
                    <CreditCard size={16} />
                    {t('mode.payment')}
                </button>
            </div>
        </div>
    );
}
