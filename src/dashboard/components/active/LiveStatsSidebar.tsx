import { motion, AnimatePresence } from "framer-motion";
import { Clock, ShoppingBag } from "lucide-react";

interface Purchase {
    id: string;
    item: string;
    amount: number;
    time: string;
}

interface LiveStatsSidebarProps {
    currentAttendees: number;
    totalAttendees: number;
    purchases: Purchase[];
}

export function LiveStatsSidebar({ currentAttendees, totalAttendees, purchases }: LiveStatsSidebarProps) {
    return (
        <div className="col-span-4 space-y-6">
            {/* Attendees Card */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" />
                    Current Attendees
                </h3>
                <div className="text-4xl font-mono font-bold text-white mb-2">
                    {currentAttendees.toLocaleString()}
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentAttendees / totalAttendees) * 100}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">
                    {Math.round((currentAttendees / totalAttendees) * 100)}% Capacity
                </p>
            </div>

            {/* Live Purchases */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex-1 min-h-[300px]">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-orange-500" />
                    Live Transactions
                </h3>
                <div className="space-y-4 overflow-hidden relative">
                    <AnimatePresence initial={false}>
                        {purchases.map((purchase) => (
                            <motion.div
                                key={purchase.id}
                                layout
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10"
                            >
                                <div>
                                    <div className="font-medium text-white text-sm">{purchase.item}</div>
                                    <div className="text-xs text-gray-500">{purchase.time}</div>
                                </div>
                                <div className="font-mono text-green-400 text-sm">
                                    +₩{purchase.amount.toLocaleString()}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {purchases.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">Waiting for transitions...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
