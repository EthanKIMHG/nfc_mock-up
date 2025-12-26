import { Button } from "@/components/ui/button";
import { ArrowLeft, CogIcon, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import type { ScanMode, ScanStatus } from "../types";

interface TopBarProps {
    status: ScanStatus;
    mode: ScanMode;
}

export function TopBar({ status, mode }: TopBarProps) {
    const navigate = useNavigate();
    const { language, setLanguage, t } = useLanguage();

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

    const getDisplayText = () => {
        if (status === "IDLE") {
            switch (mode) {
                case "ENTRY": return t('mode.entrance');
                case "PAYMENT": return t('mode.payment');
                default: return mode;
            }
        }
        switch (status) {
            case "SCANNING": return t('status.scanning');
            case "SIGNING": return t('status.signing');
            case "VERIFYING": return t('status.verifying');
            case "SUCCESS": return t('status.success');
            default: return status;
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
                    {getDisplayText()}
                </span>
            </div>

            <div className="flex items-center gap-1">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    <Globe size={20} />
                    <span className="sr-only">Switch Language</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-white/50 hover:text-white transition-colors">
                    <CogIcon size={20} />
                </Button>
            </div>
        </div>
    );
}
