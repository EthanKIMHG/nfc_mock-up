import { ArrowLeft, Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { EVENTS, ANALYTICS } from "../data";

interface CompletedEventDetailProps {
    eventId: string;
    onBack: () => void;
    onViewAIReport: () => void;
}

export function CompletedEventDetail({ eventId, onBack, onViewAIReport }: CompletedEventDetailProps) {
    const event = EVENTS.find(e => e.id === eventId);
    const analytics = ANALYTICS[eventId];

    if (!event || !analytics || !analytics.chartData) return <div>Data not available</div>;

    const { chartData } = analytics;
    const maxBeer = Math.max(...chartData.beerSales.map(b => b.count));
    const maxTraffic = Math.max(...chartData.hourlyTraffic.map(t => t.count));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">{event.name}</h1>
                    <div className="flex gap-4 text-gray-400">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                    </div>
                </div>

                <button
                    onClick={onViewAIReport}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 group"
                >
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    View AI Analysis
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                        <Users size={14} /> Total Attendees
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">
                        {event.attendees.total.toLocaleString()}
                    </div>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                        <DollarSign size={14} /> Total Revenue
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">
                        ₩{(event.revenue / 100000000).toFixed(1)}M
                    </div>
                </div>
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp size={14} /> Avg. Spend
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">
                        ₩{Math.round(event.revenue / event.attendees.checkedIn).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* Beer Brand Ranking */}
                <div className="col-span-8 bg-zinc-900/50 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">🍺 Best Selling Brands</h3>
                    <div className="space-y-5">
                        {chartData.beerSales.map((item, index) => (
                            <div key={item.name} className="relative">
                                <div className="flex justify-between text-sm mb-1.5 z-10 relative px-1">
                                    <span className="font-semibold text-white">{item.name}</span>
                                    <span className="font-mono text-gray-400">{item.count.toLocaleString()} sold</span>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.count / maxBeer) * 100}%` }}
                                        transition={{ duration: 1, delay: index * 0.1, ease: "circOut" }}
                                        className={`h-full ${item.color} rounded-full`}
                                    />
                                    {/* Glass shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="col-span-4 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6">Revenue Mix</h3>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        {chartData.revenueByCategory.map((item, index) => (
                            <div key={item.name}>
                                <div className="flex justify-between text-xs text-gray-400 mb-2">
                                    <span>{item.name}</span>
                                    <span>{Math.round((item.value / event.revenue) * 100)}%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <div className="h-2 bg-white/5 rounded-full flex-1 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.value / event.revenue) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                    <div className="text-sm font-mono text-white min-w-[80px] text-right">
                                        ₩{(item.value / 1000000).toFixed(0)}M
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hourly Traffic Curve (CSS/SVG Visualization) */}
                <div className="col-span-12 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 h-[300px] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6">Hourly Footfall</h3>
                    <div className="flex-1 flex items-end justify-between gap-4 px-4 relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 border-b border-white/5 pointer-events-none" style={{ top: '20%' }} />
                        <div className="absolute inset-0 border-b border-white/5 pointer-events-none" style={{ top: '60%' }} />

                        {chartData.hourlyTraffic.map((item, index) => {
                            const heightPercent = (item.count / maxTraffic) * 100;
                            return (
                                <div key={index} className="flex-1 flex flex-col justify-end items-center h-full group">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPercent}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.05 }}
                                        className="w-full max-w-[40px] bg-gradient-to-t from-blue-500/20 to-blue-500 rounded-t-lg relative hover:bg-blue-400 transition-colors cursor-pointer"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {item.count.toLocaleString()}
                                        </div>
                                    </motion.div>
                                    <div className="text-xs text-gray-500 mt-2 font-mono">{item.time}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
