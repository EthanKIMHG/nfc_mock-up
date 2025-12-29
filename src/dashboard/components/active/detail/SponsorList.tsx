import { motion } from "framer-motion";
import { ChevronRight, Clock, CreditCard, QrCode, ShoppingBag, Target, Ticket, User } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";

export interface ActiveSponsor {
    id: number | string;
    name: string;
    category: string;
    grade: "Excellent" | "Average";
    visits: number;
    time: string;
    reach: string;
    eng: string;
    conversion: string;
}

interface SponsorListProps {
    sponsors: ActiveSponsor[];
    selectedId: number | string;
    onSelect: (id: number | string) => void;
}

export function SponsorList({ sponsors, selectedId, onSelect }: SponsorListProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-white/5 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                    {t('dash.sponsor_perf')} <span className="text-gray-500 text-lg ml-1">{sponsors.length}</span>
                </h3>
                <div className="flex gap-2 text-[10px]">
                    <span className="px-2 py-1 rounded-full bg-[#D6F32F]/20 text-[#D6F32F] border border-[#D6F32F]/30">{t('dash.visitors')}</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">{t('dash.engagement')}</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">{t('dash.conversion')}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {sponsors.map((sponsor, idx) => {
                    const isSelected = selectedId === sponsor.id;
                    return (
                        <div
                            key={sponsor.id}
                            onClick={() => onSelect(sponsor.id)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                                isSelected 
                                    ? 'bg-[#222] border-[#D6F32F] shadow-[0_0_15px_rgba(214,243,47,0.15)]' // Selected: Dark w/ Neon Border
                                    : 'bg-[#1A1A1A] border-transparent hover:bg-white/5' // Default: Dark
                            }`}
                        >
                             {/* Selected Glow - Removed White Overlay */}
                            {isSelected && <div className="absolute inset-0 bg-[#D6F32F]/5 z-0 pointer-events-none" />}
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-bold ${isSelected ? 'text-[#D6F32F]' : 'text-white'}`}>#{idx + 1}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                            sponsor.grade === 'Excellent' 
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                            {sponsor.grade === 'Excellent' ? t('dash.grade_excellent') : t('dash.grade_average')}
                                        </span>
                                        <div>
                                            <div className={`font-bold text-sm text-white`}>{sponsor.name}</div>
                                            <div className="text-[10px] text-gray-500">{sponsor.category}</div>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className={isSelected ? 'text-[#D6F32F]' : 'text-gray-600'} />
                                </div>

                                <div className="grid grid-cols-5 gap-2 text-center">
                                    <StatItem icon={User} label={t('dash.total_visits')} value={`${(sponsor.visits / 1000).toFixed(1)}k`} unit={t('dash.people')} isSelected={isSelected} />
                                    <StatItem icon={Clock} label={t('dash.avg_dwell_time')} value={sponsor.time.replace('m', '')} unit={t('dash.min')} isSelected={isSelected} />
                                    <StatItem icon={Target} label={t('dash.reach')} value={sponsor.reach} isSelected={isSelected} />
                                    <StatItem icon={ShoppingBag} label={t('dash.engagement')} value={sponsor.eng} isSelected={isSelected} />
                                    <StatItem icon={CreditCard} label={t('dash.conversion')} value={sponsor.conversion} isSelected={isSelected} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <button className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-bold transition-colors">
                {t('dash.more')}
            </button>
        </div>
    );
}

function StatItem({ icon: Icon, label, value, unit, isSelected }: any) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1 opacity-50">
                <Icon size={10} className={isSelected ? 'text-[#D6F32F]' : 'text-white'} />
                <span className={`text-[9px] text-gray-400`}>{label}</span>
            </div>
            <div className={`text-xs font-bold text-white`}>
                {value} <span className="text-[8px] font-normal opacity-70">{unit}</span>
            </div>
        </div>
    );
}

interface SponsorDetailProps {
    sponsor: ActiveSponsor;
}

export function SponsorDetail({ sponsor }: SponsorDetailProps) {
    const { t } = useLanguage();

    // Deterministic mock data generation
    const seed = Number(sponsor.id) || 1;
    const scans = 3000 + (seed * 123) % 2000;
    const conversions = 1500 + (seed * 87) % 1000;
    const issued = 4000 + (seed * 234) % 1500;
    const used = 2000 + (seed * 156) % 1000;

    // Charts Data
    const channelData = [
        { name: 'Main Stage QR', value: 1200 + (seed * 50) % 300 },
        { name: 'Social Media', value: 800 + (seed * 30) % 200 },
        { name: 'Flyer', value: 600 + (seed * 20) % 150 },
        { name: 'App Push', value: 400 + (seed * 40) % 100 },
    ];
    const maxChannel = Math.max(...channelData.map(d => d.value));

    // Organic Trend Data (Wavy)
    const trendData = [30, 60, 45, 80, 55, 90, 70]; 
    
    // Smooth Bezier Generator (Catmull-Rom to Cubic Bezier)
    const getPath = (data: number[], width: number, height: number, margin: number = 20) => {
        const points = data.map((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - margin - (val / 100) * (height - margin * 2);
            return {x, y};
        });

        // Simple smoothing
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[Math.max(i - 1, 0)];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[Math.min(i + 2, points.length - 1)];

            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;

            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return { d, points };
    };

    const { d: pathD, points } = getPath(trendData, 100, 100, 20);

    return (
        <div className="bg-[#111] rounded-3xl p-8 border border-white/5 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">
                {sponsor.name} <span className="text-lg font-normal text-gray-500 ml-2">{t('dash.channel_perf')}</span>
            </h3>

            {/* Top Cards (White) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-6 relative shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                            <QrCode size={16} />
                        </div>
                        <span className="text-[#10B981] font-bold text-sm">{t('dash.qr_performance')}</span>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                        <div>
                            <p className="text-xs text-gray-400 mb-1 font-bold">{t('dash.scans')}</p>
                            <p className="text-2xl font-black text-gray-900">{scans.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 mb-1 font-bold">{t('dash.conversions')}</p>
                            <div className="flex items-baseline gap-2 justify-end">
                                <p className="text-xl font-black text-gray-900">{conversions.toLocaleString()}</p>
                                <span className="text-sm font-bold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                                    {Math.round((conversions/scans)*100)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 relative shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white">
                            <Ticket size={16} />
                        </div>
                        <span className="text-[#3B82F6] font-bold text-sm">{t('dash.coupon_performance')}</span>
                    </div>
                     <div className="flex justify-between items-end relative z-10">
                        <div>
                            <p className="text-xs text-gray-400 mb-1 font-bold">{t('dash.issued')}</p>
                            <p className="text-2xl font-black text-gray-900">{issued.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-gray-400 mb-1 font-bold">{t('dash.used')}</p>
                             <div className="flex items-baseline gap-2 justify-end">
                                <p className="text-xl font-black text-gray-900">{used.toLocaleString()}</p>
                                <span className="text-sm font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded">
                                    {Math.round((used/issued)*100)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dark Chart Container */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 flex-1 border border-white/5 space-y-8">
                
                {/* Bar Chart */}
                <div> 
                    <div className="flex items-center gap-2 mb-6">
                        <div className="grid grid-cols-2 gap-0.5"><div className="w-1 h-1 bg-white rounded-full"/><div className="w-1 h-1 bg-white rounded-full"/><div className="w-1 h-1 bg-white rounded-full"/><div className="w-1 h-1 bg-gray-600 rounded-full"/></div>
                        <span className="text-gray-400 text-xs font-bold">{t('dash.channel_perf')}</span>
                    </div>
                    <div className="h-[140px] flex items-end justify-between gap-4 relative">
                        {/* Dotted Lines */}
                        <div className="absolute inset-0 border-t border-dashed border-white/10 top-[0%]" />
                         <div className="absolute inset-0 border-t border-dashed border-white/10 top-[50%]" />

                        {channelData.map((d, i) => (
                             <div key={i} className="flex-1 flex flex-col justify-end items-center h-full group">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.value / maxChannel) * 80}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className={`w-full max-w-[48px] rounded-t-lg ${i % 2 === 0 ? 'bg-[#D6F32F]/20' : 'bg-[#10B981]'} relative`}
                                >
                                     {/* Inner Highlight for 3D effect */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/20" />
                                </motion.div>
                                <span className="text-[10px] text-gray-500 mt-3 font-medium text-center leading-3">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Line Chart */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#D6F32F] text-xs">⚡</span>
                        <span className="text-gray-400 text-xs font-bold">{t('dash.stage_effect_analysis')}</span>
                    </div>
                    <div className="h-[120px] w-full relative">
                         <div className="absolute inset-0 border-t border-dashed border-white/10 top-[20%]" />
                         <div className="absolute inset-0 border-t border-dashed border-white/10 top-[60%]" />

                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D6F32F" stopOpacity="0.2"/>
                                    <stop offset="100%" stopColor="#D6F32F" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                            
                            <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#trendGradient)" />
                            
                            <motion.path 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                d={pathD}
                                fill="none" 
                                stroke="#D6F32F" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ filter: "drop-shadow(0 0 4px rgba(214, 243, 47, 0.5))" }}
                            />

                            {points.map((p, i) => (
                                <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 + i * 0.1 }}>
                                    <circle cx={p.x} cy={p.y} r="3" fill="#1A1A1A" stroke="#D6F32F" strokeWidth="2" />
                                </motion.g>
                            ))}
                        </svg>

                        {/* Labels */}
                        <div className="flex justify-between text-[10px] text-gray-600 mt-2 font-mono">
                            <span>14:00</span>
                            <span className="hidden sm:inline">17:00</span>
                            <span>21:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
