import { Button } from "@/components/ui/button";
import { ArrowLeft, CogIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ScanStatus, ScanMode } from "../types";

interface TopBarProps {
    status: ScanStatus;
    mode: ScanMode;
}

export function TopBar({ status, mode }: TopBarProps) {
    const navigate = useNavigate();

    // Dynamic Styles based on Status
    const getStatusColor = () => {
        switch (status) {
            case "SCANNING": return "text-purple-300 border-purple-500/30 bg-purple-500/10";
            case "SIGNING": return "text-cyan-300 border-cyan-500/30 bg-cyan-500/10";
            case "VERIFYING": return "text-orange-300 border-orange-500/30 bg-orange-500/10";
            case "SUCCESS": return "text-lime-400 border-lime-500/30 bg-lime-500/10";
            default: return "text-gray-400 border-white/10 bg-white/5";
        }
    };

    const getStatusDotColor = () => {
        switch (status) {
            case "SCANNING": return "bg-purple-400 animate-pulse";
            case "SIGNING": return "bg-cyan-400 animate-pulse";
            case "VERIFYING": return "bg-orange-400 animate-pulse";
            case "SUCCESS": return "bg-lime-400";
            default: return "bg-gray-500";
        }
    };

    return (
        <div className="z-10 w-full flex justify-between mt-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white/50 hover:text-white transition-colors">
                <ArrowLeft size={20} />
            </Button>

            <div className={`px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-500 flex items-center gap-2 ${getStatusColor()}`}>
                <div className={`w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ${getStatusDotColor()}`} />
                <span className="text-xs font-medium tracking-widest uppercase">
                    {status === "IDLE" ? mode : status}
                </span>
            </div>

            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white transition-colors">
                <CogIcon size={20} />
            </Button>
        </div>
    );
}
