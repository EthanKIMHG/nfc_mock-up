import { ArrowLeft, Clock, ShoppingBag, Map, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS, ANALYTICS } from "../data";
import { AIReportView } from "./AIReportView";
import { CompletedEventDetail } from "./CompletedEventDetail";
import { FestivalMap } from "./FestivalMap";

interface EventDetailViewProps {
    eventId: string;
    onBack: () => void;
}

// Helper for smooth counting
const CountUp = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        const start = displayValue;
        const end = value;
        if (start === end) return;

        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (end - start) * ease);
            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return <span>{displayValue.toLocaleString()}</span>;
};


export function EventDetailView({ eventId, onBack }: EventDetailViewProps) {
    const originalEvent = EVENTS.find(e => e.id === eventId);
    const [viewMode, setViewMode] = useState<"DATA" | "AI_REPORT">("DATA");

    const originalAnalytics = ANALYTICS[eventId];

    const [revenue, setRevenue] = useState(originalEvent?.revenue || 0);
    const [attendees, setAttendees] = useState(originalEvent?.attendees.checkedIn || 0);
    const [purchases, setPurchases] = useState(originalAnalytics?.recentPurchases || []);
    const [zones, setZones] = useState(originalAnalytics?.topZones || []);

    // Simulation Effect
    useEffect(() => {
        if (!originalEvent || originalEvent.status !== "ACTIVE") return;

        const interval = setInterval(() => {
            // 1. Simulate Revenue & Attendees Increase
            setRevenue(prev => prev + Math.floor(Math.random() * 150000));
            setAttendees(prev => prev + Math.floor(Math.random() * 3));

            // 2. Simulate New Purchase (Stacking)
            if (Math.random() > 0.3) {
                const newPurchase = {
                    id: Math.random().toString(36).substr(2, 9),
                    item: ["VIP Upgrade", "Drink Token", "Merch Bundle", "Fast Pass"][Math.floor(Math.random() * 4)],
                    amount: [15000, 35000, 50000, 12000][Math.floor(Math.random() * 4)],
                    time: "Just now"
                };
                setPurchases(prev => [newPurchase, ...prev].slice(0, 7)); // Keep last 7
            }

            // 3. Fluctuate Heatmap
            setZones(prev => prev.map(z => ({
                ...z,
                percentage: Math.min(100, Math.max(5, z.percentage + (Math.random() * 10 - 5)))
            })));

        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [originalEvent]);

    if (!originalEvent) return <div>Event not found</div>;

    if (originalEvent.status === "COMPLETED") {
        if (viewMode === "AI_REPORT") {
            return <AIReportView eventId={eventId} onBack={() => setViewMode("DATA")} />;
        }
        return (
            <CompletedEventDetail
                eventId={eventId}
                onBack={onBack}
                onViewAIReport={() => setViewMode("AI_REPORT")}
            />
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to List
                    </button>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
                        {originalEvent.name}
                        {originalEvent.status === "ACTIVE" && (
                            <span className="text-xs font-bold bg-red-500/20 text-red-500 px-2 py-0.5 rounded animate-pulse">LIVE</span>
                        )}
                    </h1>
                    <div className="flex gap-4 text-gray-400">
                        <span>{originalEvent.date}</span>
                        <span>•</span>
                        <span>{originalEvent.location}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Total Revenue</div>
                    <div className="text-3xl font-mono text-green-400 font-bold">
                        ₩<CountUp value={revenue} />
                    </div>
                    <div className="text-xs text-green-500/50 mt-1 flex justify-end items-center gap-1">
                        <TrendingUp size={12} />
                        Live Updates
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6 items-start">

                {/* Movement Map */}
                <div className="col-span-8 bg-zinc-900/50 border border-white/10 rounded-3xl p-6 min-h-[500px] flex flex-col relative overflow-hidden">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 z-10 relative">
                        <Map size={20} className="text-purple-500" />
                        Live Crowd Density Map
                    </h3>

                    {/* Interactive SVG Map */}
                    <div className="flex-1 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-950 to-zinc-950 -z-10" />

                        <FestivalMap eventId={eventId} zones={zones} />

                        <p className="absolute bottom-4 right-4 text-xs text-gray-500 flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            Updating Real-time
                        </p>
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="col-span-4 space-y-6">
                    {/* Attendees Card */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-blue-500" />
                            Current Attendees
                        </h3>
                        <div className="text-4xl font-mono font-bold text-white mb-2">
                            <CountUp value={attendees} />
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(attendees / originalEvent.attendees.total) * 100}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-right">
                            {Math.round((attendees / originalEvent.attendees.total) * 100)}% Capacity
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
            </div>
        </div>
    );
}
