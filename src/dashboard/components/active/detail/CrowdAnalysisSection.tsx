
import { BarChart3, Map } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { FestivalMap } from "../../FestivalMap";

interface ZoneData {
    name: string;
    percentage: number;
}

interface CrowdAnalysisSectionProps {
    zones: ZoneData[];
    totalAttendees: number;
    eventId?: string;
    selectedZoneName?: string;
    onZoneSelect?: (name: string) => void;
}

export function CrowdAnalysisSection({ zones, totalAttendees, eventId, selectedZoneName, onZoneSelect }: CrowdAnalysisSectionProps) {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    return (
        <div className="col-span-7 bg-[#1A1A1A] rounded-3xl p-6 border border-white/5 flex flex-col min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {t('dash.crowd_analysis')}
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                </h3>
                
                {/* View Toggle */}
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                    <button 
                        onClick={() => setViewMode('map')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                            viewMode === 'map' ? 'bg-[#D6F32F] text-black shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Map size={14} />
                        Map
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                            viewMode === 'list' ? 'bg-[#D6F32F] text-black shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <BarChart3 size={14} />
                        Data
                    </button>
                </div>
            </div>

            {viewMode === 'map' ? (
                <div className="flex-1 relative rounded-2xl overflow-hidden bg-black/20 border border-white/5">
                    <FestivalMap 
                        eventId={eventId || 'default'} 
                        zones={zones} 
                        onZoneClick={onZoneSelect}
                        selectedZoneName={selectedZoneName}
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10 text-[10px] text-gray-400">
                        <div className="font-bold text-white mb-2">Legend</div>
                        <div className="space-y-1">
                             <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t('dash.very_high')} (&gt;80%)</span>
                            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {t('dash.high')} (&gt;60%)</span>
                            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> {t('dash.moderate')} (&gt;40%)</span>
                            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('dash.low')}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex gap-2 text-[10px] font-bold justify-end mb-2">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t('dash.very_high')}</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {t('dash.high')}</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> {t('dash.moderate')}</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('dash.low')}</span>
                    </div>
                    {zones.map((zone, i) => {
                            let color = "bg-green-500";
                            if (zone.percentage > 80) color = "bg-red-500";
                            else if (zone.percentage > 60) color = "bg-orange-500";
                            else if (zone.percentage > 40) color = "bg-yellow-500";
                            
                            const isSelected = selectedZoneName === zone.name;

                            return (
                            <div 
                                key={i} 
                                onClick={() => onZoneSelect?.(zone.name)}
                                className={`flex items-center gap-4 group cursor-pointer p-2 rounded-lg transition-colors ${isSelected ? 'bg-white/10 ring-1 ring-[#D6F32F]/50' : 'hover:bg-white/5'}`}
                            >
                                <span className={`text-sm font-bold w-32 shrink-0 transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    #{i+1} {zone.name}
                                </span>
                                <div className="flex-1 h-8 bg-black/50 rounded-md relative overflow-hidden flex items-center px-3">
                                    <div className={`absolute top-0 bottom-0 left-0 ${color} opacity-20 transition-all duration-1000 ease-out`} style={{ width: `${zone.percentage}%` }}></div>
                                    <div className={`absolute top-0 bottom-0 left-0 ${color} w-1 h-full`}></div>
                                    <span className={`relative z-10 font-bold text-sm ${color.replace('bg-', 'text-')}`}>
                                        {Math.round((totalAttendees * zone.percentage) / 100).toLocaleString()} <span className="text-[10px]">{t('dash.people')}</span>
                                    </span>
                                </div>
                                <span className="text-xs text-gray-600 font-mono w-16 text-right">
                                    {Math.round(totalAttendees * (i === 0 ? 0.3 : 0.15)).toLocaleString()}
                                </span>
                            </div>
                            )
                    })}
                </div>
            )}
        </div>
    );
}
