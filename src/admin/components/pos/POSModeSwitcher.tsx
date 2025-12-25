import { motion } from "framer-motion";
import { UserCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export type POSMode = "ENTRANCE" | "PAYMENT";

interface POSModeSwitcherProps {
    mode: POSMode;
    setMode: (mode: POSMode) => void;
}

export function POSModeSwitcher({ mode, setMode }: POSModeSwitcherProps) {
    return (
        <div className="px-6 mb-4">
            <div className="bg-zinc-900/80 p-1 rounded-2xl flex relative overflow-hidden">
                <motion.div
                    className="absolute h-[calc(100%-8px)] top-1 w-[calc(50%-4px)] bg-zinc-700 rounded-xl shadow-sm z-0"
                    animate={{ x: mode === "ENTRANCE" ? 4 : "100%" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
                <button
                    onClick={() => setMode("ENTRANCE")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 text-sm font-bold transition-colors",
                        mode === "ENTRANCE" ? "text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                >
                    <UserCheck size={16} />
                    Entrance
                </button>
                <button
                    onClick={() => setMode("PAYMENT")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl relative z-10 text-sm font-bold transition-colors",
                        mode === "PAYMENT" ? "text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                >
                    <CreditCard size={16} />
                    Payment
                </button>
            </div>
        </div>
    );
}
