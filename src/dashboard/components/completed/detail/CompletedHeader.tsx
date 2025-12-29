import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";

interface CompletedHeaderProps {
    eventName: string;
    onBack: () => void;
}

export function CompletedHeader({ eventName, onBack }: CompletedHeaderProps) {
    const { t } = useLanguage();

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <ArrowLeft size={20} className="text-white" />
            </button>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">{eventName}</h1>
                <p className="text-gray-400 font-medium">{t('dash.last_updated')}: 10:30:45 PM</p>
            </div>
        </div>
    );
}
