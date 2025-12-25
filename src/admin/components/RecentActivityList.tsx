import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Data for Logs
const RECENT_LOGS = [
    { id: "LOG-001", time: "10:42 AM", name: "Jaehee Kim", result: "SUCCESS", zone: "Zone A" },
    { id: "LOG-002", time: "10:41 AM", name: "Unknown", result: "FAILED", zone: "-" },
    { id: "LOG-003", time: "10:39 AM", name: "Minsoo Park", result: "SUCCESS", zone: "VIP" },
    { id: "LOG-004", time: "10:35 AM", name: "Sarah Lee", result: "SUCCESS", zone: "Stand" },
    { id: "LOG-005", time: "10:30 AM", name: "David Kim", result: "SUCCESS", zone: "Zone B" },
];

export function RecentActivityList() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col gap-4 min-h-0">
            <h2 className="text-sm font-medium text-gray-500 flex items-center gap-2 uppercase tracking-widest px-1">
                <Clock size={12} /> Recent Activity
            </h2>

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="space-y-2 pb-4">
                    {RECENT_LOGS.map((log) => (
                        <div
                            key={log.id}
                            className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5 active:scale-[0.98]"
                            onClick={() => navigate(`/history/${log.id}`)}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${log.result === "SUCCESS" ? 'bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                                <div className="flex flex-col">
                                    <p className="font-medium text-white text-sm">{log.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <span>{log.id}</span>
                                        <span>•</span>
                                        <span className={log.result === "SUCCESS" ? "text-gray-500" : "text-red-500/70"}>{log.time}</span>
                                    </div>
                                </div>
                            </div>
                            <ArrowRight size={14} className="text-gray-700 group-hover:text-white transition-colors" />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
