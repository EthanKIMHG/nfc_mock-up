import { Users } from "lucide-react";
import { useTicketContext } from "@/context/TicketContextTypes";

export function StatsGrid() {
    const { enteredCount } = useTicketContext();

    return (
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
    );
}
