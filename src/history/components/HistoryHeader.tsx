import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HistoryHeader() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
            </Button>
            <div className="text-sm font-mono text-gray-500">
                SCAN DETAILS
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Share2 size={20} />
            </Button>
        </div>
    );
}
