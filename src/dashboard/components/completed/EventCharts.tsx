import { motion } from "framer-motion";
import type { AnalyticsData } from "@/dashboard/data";

interface EventChartsProps {
    chartData: AnalyticsData['chartData'];
    revenue: number;
}

export function EventCharts({ chartData, revenue }: EventChartsProps) {
    if (!chartData) return null;

    const maxBeer = Math.max(...chartData.beerSales.map(b => b.count));
    const maxTraffic = Math.max(...chartData.hourlyTraffic.map(t => t.count));

    return (
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
                                <span>{Math.round((item.value / revenue) * 100)}%</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                <div className="h-2 bg-white/5 rounded-full flex-1 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.value / revenue) * 100}%` }}
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
    );
}
