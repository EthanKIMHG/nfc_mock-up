import { Users, DollarSign, TrendingUp } from "lucide-react";

interface EventSummaryCardsProps {
    revenue: number;
    totalAttendees: number;
    checkedInAttendees: number;
}

export function EventSummaryCards({ revenue, totalAttendees, checkedInAttendees }: EventSummaryCardsProps) {
    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} /> Total Attendees
                </div>
                <div className="text-3xl font-mono font-bold text-white">
                    {totalAttendees.toLocaleString()}
                </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign size={14} /> Total Revenue
                </div>
                <div className="text-3xl font-mono font-bold text-white">
                    ₩{(revenue / 100000000).toFixed(1)}M
                </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={14} /> Avg. Spend
                </div>
                <div className="text-3xl font-mono font-bold text-white">
                    ₩{Math.round(revenue / (checkedInAttendees || 1)).toLocaleString()}
                </div>
            </div>
        </div>
    );
}
