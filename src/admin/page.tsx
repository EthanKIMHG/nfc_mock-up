import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTicketContext } from "@/context/TicketContext";
import { ArrowRight, Clock, ScanLine, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Data for Logs
const RECENT_LOGS = [
    { id: "LOG-001", time: "10:42 AM", name: "Jaehee Kim", result: "SUCCESS", zone: "Zone A" },
    { id: "LOG-002", time: "10:41 AM", name: "Unknown", result: "FAILED", zone: "-" },
    { id: "LOG-003", time: "10:39 AM", name: "Minsoo Park", result: "SUCCESS", zone: "VIP" },
    { id: "LOG-004", time: "10:35 AM", name: "Sarah Lee", result: "SUCCESS", zone: "Stand" },
    { id: "LOG-005", time: "10:30 AM", name: "David Kim", result: "SUCCESS", zone: "Zone B" },
];

export default function AdminPage() {
    const navigate = useNavigate();
    const { enteredCount } = useTicketContext();

    return (
        <div className="min-h-screen relative p-6 flex flex-col gap-8">
             {/* Header - Floating */}
            <div className="flex justify-between items-center z-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent tracking-tighter">
                        Event Admin
                    </h1>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
                    <span className="text-[10px] font-bold tracking-widest text-green-500">LIVE</span>
                </div>
            </div>

            {/* Stats - Glass Panels */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-dark p-5 rounded-3xl flex flex-col justify-between h-32 relative overflow-hidden group">
                     {/* Ambient Glow */}
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500" />
                    
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider relative z-10">Entered</span>
                    <div className="relative z-10">
                        <div className="text-3xl font-medium text-white tracking-tight">{enteredCount.toLocaleString()}</div>
                        <p className="text-[10px] text-green-400 mt-1 flex items-center gap-1 font-medium">
                            <Users size={10} /> +24/min
                        </p>
                    </div>
                </div>
                
                <div className="glass-dark p-5 rounded-3xl flex flex-col justify-between h-32 relative overflow-hidden group">
                     <span className="text-xs font-medium text-gray-500 uppercase tracking-wider relative z-10">Capacity</span>
                    <div className="relative z-10">
                         <div className="text-3xl font-medium text-gray-400 tracking-tight">5,000</div>
                        <p className="text-[10px] text-gray-600 mt-1 font-medium">24.8% Full</p>
                    </div>
                </div>
            </div>

            {/* Main Action: Organic Floating Button */}
            <Button 
                onClick={() => navigate("/scan")}
                className="w-full h-36 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-md hover:bg-white/5 hover:border-white/20 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden shadow-2xl"
            >
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-lime-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                         <ScanLine size={32} className="text-white opacity-80" />
                    </div>
                    <span className="text-lg font-medium text-white tracking-widest opacity-90">START SCAN</span>
                </div>
            </Button>

            {/* Recent Logs - Minimal List */}
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
        </div>
    );
}
