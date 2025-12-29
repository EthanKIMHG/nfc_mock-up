import { useLanguage } from "../../../../context/LanguageContext";

interface ZoneData {
    name: string;
    percentage: number;
}

interface CompletedStatsCardsProps {
    totalAttendees: number;
    maxCapacity: number;
    revenue: number;
    topZones: ZoneData[];
}

export function CompletedStatsCards({ totalAttendees, maxCapacity, revenue, topZones }: CompletedStatsCardsProps) {
    const { t } = useLanguage();

    return (
        <div className="flex gap-4">
            {/* Stat Card 1: Attendees */}
            <div className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center gap-4 border border-white/5 min-w-[240px]">
                <div className="w-12 h-12 rounded-full bg-[#D6F32F]/20 flex items-center justify-center text-[#D6F32F]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">{t('dash.total_attendees_cap')}</p>
                    <div className="text-2xl font-black text-white">{totalAttendees.toLocaleString()} <span className="text-sm font-medium text-gray-500">{t('dash.people')}</span></div>
                    <p className="text-[10px] text-gray-600">{t('dash.max_capacity')}: {maxCapacity.toLocaleString()}</p>
                </div>
            </div>
            
            {/* Stat Card 2: Revenue */}
            <div className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center gap-4 border border-white/5 min-w-[280px]">
                <div className="w-12 h-12 rounded-full bg-[#D6F32F]/20 flex items-center justify-center text-[#D6F32F]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">{t('dash.total_revenue_cap')}</p>
                    <div className="text-2xl font-black text-white">{revenue.toLocaleString()} <span className="text-sm font-medium text-gray-500">{t('dash.krw')}</span></div>
                </div>
            </div>

            {/* Top 3 Zones */}
            <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 flex-1">
                <h4 className="text-xs text-gray-500 font-bold uppercase mb-2">{t('dash.top_3_zones')}</h4>
                <div className="space-y-1">
                    {topZones.slice(0,3).map((zone, i) => (
                        <div key={i} className="flex justify-between text-xs gap-4">
                            <span className="text-gray-300">#{i+1} {zone.name}</span>
                            <span className="font-mono text-[#D6F32F]">{zone.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
