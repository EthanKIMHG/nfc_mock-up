
import { useLanguage } from "../../../../context/LanguageContext";

interface ZoneData {
    name: string;
    percentage: number;
}

interface ActiveDetailedInfoProps {
    selectedZone: ZoneData | undefined; // Fallback to first zone if undefined
    totalAttendees: number;
}

export function ActiveDetailedInfo({ selectedZone, totalAttendees }: ActiveDetailedInfoProps) {
    const { t } = useLanguage();
    const zoneName = selectedZone?.name || 'Main Stage';
    const zonePct = selectedZone?.percentage || 0;
    const currentCount = Math.round((totalAttendees * zonePct) / 100);

    return (
        <div className="col-span-5 bg-[#1A1A1A] rounded-3xl p-6 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">{t('dash.detailed_info')}</h3>

            <div className="mb-0">
                <h4 className="text-sm font-bold text-white mb-4">#1 {zoneName}</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">{t('dash.current')}</p>
                        <p className="text-2xl font-black text-white">
                            {currentCount.toLocaleString()} <span className="text-sm text-gray-500">({Math.round(zonePct)}%)</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">{t('dash.avg_dwell_time')}</p>
                        <p className="text-2xl font-black text-white">42 <span className="text-sm text-gray-500">{t('dash.min')}</span></p>
                    </div>
                </div>

                {/* Gender Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-blue-400">{t('dash.demographics.male')} 45%</span>
                        <span className="text-pink-400">{t('dash.demographics.female')} 55%</span>
                    </div>
                    <div className="h-2 w-full flex rounded-full overflow-hidden">
                        <div className="w-[45%] bg-blue-500" />
                        <div className="w-[55%] bg-pink-500" />
                    </div>
                </div>

                {/* Age Distribution */}
                <div className="space-y-2">
                    {[
                        { label: "10s", pct: 9, width: "9%" },
                        { label: "20s", pct: 41, width: "41%" },
                        { label: "30s", pct: 28, width: "28%" },
                        { label: "40s", pct: 18, width: "18%" },
                    ].map((age, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-[10px] text-gray-500 w-6">{age.label}</span>
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#D6F32F]" style={{ width: age.width }} />
                            </div>
                            <span className="text-[10px] text-gray-400 w-6 text-right">{age.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
