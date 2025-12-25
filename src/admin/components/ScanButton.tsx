import { Button } from "@/components/ui/button";
import { ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ScanButton() {
    const navigate = useNavigate();

    return (
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
    );
}
