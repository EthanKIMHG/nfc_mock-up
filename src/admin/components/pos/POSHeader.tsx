import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface POSHeaderProps {
    eventName: string;
    onBack: () => void;
}

export function POSHeader({ eventName, onBack }: POSHeaderProps) {
    return (
        <div className="px-6 py-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm sticky top-0">
            <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
                <ArrowLeft size={20} />
            </Button>
            <div className="font-bold text-white max-w-[200px] truncate text-center">
                {eventName}
            </div>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10">
                <MoreVertical size={20} />
            </Button>
        </div>
    );
}
