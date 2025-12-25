import { ArrowLeft, TrendingUp } from "lucide-react";

// Simple internal helper or assume imported. I'll keep it simple here.
const CountUp = ({ value }: { value: number }) => <span>{value.toLocaleString()}</span>;

interface ActiveEventHeaderProps {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    onBack: () => void;
    currentRevenue: number;
}

export function ActiveEventHeader({ eventName, eventDate, eventLocation, onBack, currentRevenue }: ActiveEventHeaderProps) {
    return (
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
                    {eventName}
                    <span className="text-xs font-bold bg-red-500/20 text-red-500 px-2 py-0.5 rounded animate-pulse">LIVE</span>
                </h1>
                <div className="flex gap-4 text-gray-400">
                    <span>{eventDate}</span>
                    <span>•</span>
                    <span>{eventLocation}</span>
                </div>
            </div>
            <div className="text-right">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Total Revenue</div>
                <div className="text-3xl font-mono text-green-400 font-bold">
                    ₩<CountUp value={currentRevenue} />
                </div>
                <div className="text-xs text-green-500/50 mt-1 flex justify-end items-center gap-1">
                    <TrendingUp size={12} />
                    Live Updates
                </div>
            </div>
        </div>
    );
}
