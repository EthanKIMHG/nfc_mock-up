import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { POSMode } from "./POSModeSwitcher";

interface POSStatusCardProps {
    mode: POSMode;
    isVisible: boolean;
    checkedIn: number;
    totalAttendees: number;
}

export function POSStatusCard({ mode, isVisible, checkedIn, totalAttendees }: POSStatusCardProps) {
    const capacityPercentage = Math.round((checkedIn / totalAttendees) * 100);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-auto"
                >
                    <Card className="bg-zinc-900/80 border-white/5 relative overflow-hidden">
                        <CardContent className="p-6">
                            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
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
                                                {checkedIn.toLocaleString()} / {totalAttendees.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className={cn(
                                                    "h-full",
                                                    capacityPercentage > 90 ? 'bg-red-500' : 'bg-green-500'
                                                )}
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
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
