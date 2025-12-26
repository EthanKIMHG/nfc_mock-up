import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";

interface POSHeaderProps {
    eventName: string;
    onBack: () => void;
}

export function POSHeader({ eventName, onBack }: POSHeaderProps) {
    return (
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
                <ArrowLeft size={24} />
            </Button>
            <div className="text-center">
                <h1 className="text-white font-bold text-lg leading-tight">{eventName}</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-white/50">
                <MoreHorizontal size={24} />
            </Button>
        </div>
    );
}
