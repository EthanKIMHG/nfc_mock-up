import { useLanguage } from "../../../../context/LanguageContext";

export function CompletedSponsorPerf() {
    const { t } = useLanguage();

    const sponsors = [
        { id: 1, name: "Cass Fresh", booth: "Food Court 1F", visits: 13110, time: "28m", reach: "52%", eng: "74%" },
        { id: 2, name: "Red Bull", booth: "Energy Zone", visits: 9580, time: "15m", reach: "38%", eng: "86%" },
        { id: 3, name: "Heineken", booth: "Lounge Area", visits: 8570, time: "31m", reach: "34%", eng: "78%" },
    ];

    return (
        <div className="col-span-12 bg-[#1A1A1A] rounded-3xl p-6 border border-white/5">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t('dash.sponsor_perf')}</h3>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#D6F32F] text-black text-xs font-bold rounded-full">{t('dash.visitors')}</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-400 text-xs font-bold rounded-full">{t('dash.rev')}</span>
                </div>
             </div>
             
             <div className="space-y-4">
                {sponsors.map((sponsor, i) => (
                    <div key={i} className="bg-black/50 rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-[#D6F32F]/30 transition-colors">
                        <div className="flex items-center gap-4 w-[250px]">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white">#{sponsor.id}</div>
                            <div>
                                <p className="font-bold text-white">{sponsor.name}</p>
                                <p className="text-xs text-gray-500">{sponsor.booth}</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-8 flex-1">
                            <div className="text-center">
                                <p className="text-[10px] text-gray-500 mb-1">{t('dash.total_visits')}</p>
                                <p className="font-bold text-white">{sponsor.visits.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-gray-500 mb-1">{t('dash.avg_dwell_time')}</p>
                                <p className="font-bold text-white">{sponsor.time}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-gray-500 mb-1">{t('dash.reach')}</p>
                                <p className="font-bold text-white">{sponsor.reach}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-gray-500 mb-1">{t('dash.engagement')}</p>
                                <p className="font-bold text-white">{sponsor.eng}</p>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
         </div>
    );
}
