import { useLanguage } from "../../../../context/LanguageContext";

interface DetailedZone {
    id: number;
    name: string;
    count: number;
    pct: number;
    gender: { m: number; f: number };
    age: { a10: number; a20: number; a30: number; a40: number };
}

interface CompletedDetailedInfoProps {
    zone: DetailedZone;
}

export function CompletedDetailedInfo({ zone }: CompletedDetailedInfoProps) {
    const { t } = useLanguage();

    return (
        <div className="col-span-5 bg-[#1A1A1A] rounded-3xl p-6 border border-white/5">
             <h3 className="text-xl font-bold text-white mb-6">{t('dash.detailed_info')}</h3>
             
             <div className="mb-8">
                <h4 className="text-sm font-bold text-white mb-4">#{zone.id} {zone.name}</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">{t('dash.current')}</p>
                        <p className="text-2xl font-black text-white">{zone.count.toLocaleString()} <span className="text-sm text-gray-500">({zone.pct}%)</span></p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">{t('dash.avg_dwell_time')}</p>
                        <p className="text-2xl font-black text-white">42 <span className="text-sm text-gray-500">{t('dash.min')}</span></p>
                    </div>
                </div>

                {/* Gender Bar */}
                <div className="mb-8">
                     <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-blue-400">{t('dash.demographics.male')} {zone.gender.m}%</span>
                        <span className="text-pink-400">{t('dash.demographics.female')} {zone.gender.f}%</span>
                     </div>
                     <div className="h-2 w-full flex rounded-full overflow-hidden">
                        <div className="bg-blue-500 transition-all duration-500" style={{ width: `${zone.gender.m}%` }} />
                        <div className="bg-pink-500 transition-all duration-500" style={{ width: `${zone.gender.f}%` }} />
                     </div>
                </div>

                {/* Age Distribution - Increased spacing (space-y-4) */}
                <div className="space-y-4">
                     {[
                         { label: "10s", pct: zone.age.a10 },
                         { label: "20s", pct: zone.age.a20 },
                         { label: "30s", pct: zone.age.a30 },
                         { label: "40s", pct: zone.age.a40 },
                     ].map((age, i) => (
                         <div key={i} className="flex items-center gap-3">
                             <span className="text-[10px] text-gray-500 w-6">{age.label}</span>
                             <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#D6F32F] transition-all duration-500" style={{ width: `${age.pct}%` }} />
                             </div>
                             <span className="text-[10px] text-gray-400 w-6 text-right">{age.pct}%</span>
                         </div>
                     ))}
                </div>
             </div>
        </div>
    );
}
