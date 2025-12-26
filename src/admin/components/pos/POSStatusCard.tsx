import { Users } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import type { POSMode } from "./POSModeSwitcher";

interface POSStatusCardProps {
    mode: POSMode;
    isVisible: boolean;
    checkedIn: number;
    totalAttendees: number;
}

export function POSStatusCard({ isVisible, checkedIn, totalAttendees }: POSStatusCardProps) {
    const { t } = useLanguage();
    if (!isVisible) return null;

    const percentage = Math.round((checkedIn / totalAttendees) * 100);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-4 shadow-xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{t('dashboard.capacity')}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-white tracking-tight">{checkedIn.toLocaleString()}</span>
                        <span className="text-sm text-zinc-500 font-medium">/ {totalAttendees.toLocaleString()}</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-lime-400/10 flex items-center justify-center">
                    <Users size={20} className="text-lime-400" />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-4">
                <div
                    className="bg-lime-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 rounded-xl p-3">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">{t('dashboard.checked_in')}</div>
                    <div className="text-white font-mono text-lg">{percentage}%</div>
                </div>
                <div className="bg-black/40 rounded-xl p-3">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">{t('dashboard.total_attendees')}</div>
                    <div className="text-white font-mono text-lg">{totalAttendees.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
