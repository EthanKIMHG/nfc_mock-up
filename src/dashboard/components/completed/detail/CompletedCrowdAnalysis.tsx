import { useLanguage } from "../../../../context/LanguageContext";

interface CrowdZone {
    id: number;
    name: string;
    count: number;
    capacity: number;
    color: string;
    width: string;
}

interface CompletedCrowdAnalysisProps {
    zones: CrowdZone[];
    selectedZoneId: number;
    onSelectZone: (id: number) => void;
}

export function CompletedCrowdAnalysis({ zones, selectedZoneId, onSelectZone }: CompletedCrowdAnalysisProps) {
    const { t } = useLanguage();

    return (
        <div className="col-span-7 bg-[#1A1A1A] rounded-3xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t('dash.crowd_analysis')}</h3>
                <div className="flex gap-2 text-[10px] font-bold">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t('dash.very_high')}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {t('dash.high')}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> {t('dash.moderate')}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('dash.low')}</span>
                </div>
            </div>

            <div className="space-y-4">
                {zones.map((zone) => {
                    const isSelected = zone.id === selectedZoneId;
                    return (
                        <div 
                            key={zone.id} 
                            onClick={() => onSelectZone(zone.id)}
                            className={`flex items-center gap-4 group cursor-pointer p-2 rounded-lg transition-colors ${
                                isSelected ? 'bg-white/10 ring-1 ring-[#D6F32F]/50' : 'hover:bg-white/5'
                            }`}
                        >
                            <span className={`text-sm font-bold w-32 shrink-0 transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                #{zone.id} {zone.name}
                            </span>
                            <div className="flex-1 h-8 bg-black/50 rounded-md relative overflow-hidden flex items-center px-3">
                                <div className={`absolute top-0 bottom-0 left-0 ${zone.color} opacity-20`} style={{ width: zone.width }}></div>
                                <div className={`absolute top-0 bottom-0 left-0 ${zone.color} w-1 h-full`}></div>
                                <span className={`relative z-10 font-bold text-sm ${zone.color.replace('bg-', 'text-')}`}>{zone.count.toLocaleString()} <span className="text-[10px]">{t('dash.people')}</span></span>
                            </div>
                            <span className="text-xs text-gray-600 font-mono w-16 text-right">{zone.capacity.toLocaleString()}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
