
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";
import { QrCode, Ticket, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis
} from "recharts";
import { useLanguage } from "../../../../context/LanguageContext";
import type { ActiveSponsor } from "./SponsorList";

interface SponsorDetailProps {
    sponsor: ActiveSponsor;
}

export function SponsorDetail({ sponsor }: SponsorDetailProps) {
    const { t } = useLanguage();

    // Deterministic mock data generation
    const seed = Number(sponsor.id) || 1;
    const scans = 3000 + (seed * 123) % 2000;
    const conversions = 1500 + (seed * 87) % 1000;
    const scanRate = Math.round((conversions / scans) * 100);

    const issued = 4000 + (seed * 234) % 1500;
    const used = 2000 + (seed * 156) % 1000;
    const useRate = Math.round((used / issued) * 100);

    // Chart Data
    const channelData = [
        { name: t('dash.channel.main_stage'), value: 1200 + (seed * 50) % 300, fill: '#D1D5DB' }, // Gray
        { name: t('dash.channel.social'), value: 800 + (seed * 30) % 200, fill: '#10B981' }, // Green
        { name: t('dash.channel.flyer'), value: 600 + (seed * 20) % 150, fill: '#D1D5DB' }, // Gray
        { name: t('dash.channel.app_push'), value: 400 + (seed * 40) % 100, fill: '#10B981' }, // Green
    ];

    const chartConfigBar = {
        value: {
            label: t('dash.chart.views'),
        },
    } satisfies ChartConfig;

    const timeData = [
        { time: '14:00', visit: 120, stay: 50 },
        { time: '15:00', visit: 250, stay: 80 },
        { time: '16:00', visit: 320, stay: 90 },
        { time: '17:00', visit: 270, stay: 75 },
        { time: '18:00', visit: 390, stay: 100 },
        { time: '19:00', visit: 210, stay: 60 },
        { time: '20:00', visit: 350, stay: 90 },
    ];

    const chartConfigLine = {
        visit: {
            label: t('dash.chart.visits'),
            color: "#D1D5DB", // Beige/Gray
        },
        stay: {
            label: t('dash.chart.stay_time'),
            color: "#10B981", // Green
        },
    } satisfies ChartConfig;

    return (
        <div className="flex flex-col h-full gap-6 p-6 rounded-2xl overflow-y-auto">
            <h3 className="text-2xl font-bold text-white">
                {sponsor.name} <span className="text-lg font-normal text-gray-400 ml-2">{t('dash.promotion_effect')}</span>
            </h3>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
                {/* QR Code Card */}
                <div className="bg-[#10B981]/10 rounded-2xl p-6 relative border border-[#10B981]/20">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                            <QrCode size={16} />
                        </div>
                        <span className="text-[#10B981] font-bold text-sm">{t('dash.qr_performance')}</span>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400 font-bold">{t('dash.scans')}</span>
                            <span className="text-xl font-bold text-white">{scans.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#10B981] font-bold">{t('dash.conversions')}</span>
                            <span className="text-xl font-bold text-[#10B981]">{conversions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-2 border-t border-[#10B981]/10">
                            <span className="text-[#10B981] font-bold">{t('dash.conversion_rate')}</span>
                            <span className="text-xl font-bold text-[#10B981] flex items-center gap-1">
                                {scanRate}% <span className="text-xs">↗</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Coupon Card */}
                <div className="bg-[#3B82F6]/10 rounded-2xl p-6 relative border border-[#3B82F6]/20">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white">
                            <Ticket size={16} />
                        </div>
                        <span className="text-[#3B82F6] font-bold text-sm">{t('dash.coupon_performance')}</span>
                    </div>

                    <div className="space-y-3">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-blue-400 font-bold">{t('dash.issued')}</span>
                            <span className="text-xl font-bold text-white">{issued.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#3B82F6] font-bold">{t('dash.used')}</span>
                            <span className="text-xl font-bold text-[#3B82F6]">{used.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between items-center text-sm pt-2 border-t border-[#3B82F6]/10">
                            <span className="text-[#3B82F6] font-bold">{t('dash.usage_rate')}</span>
                            <span className="text-xl font-bold text-[#3B82F6] flex items-center gap-1">
                                {useRate}% <span className="text-xs">↗</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-8">
                {/* Bar Chart */}
                <div>
                     <div className="flex items-center gap-2 mb-4">
                        <div className="grid grid-cols-2 gap-0.5 text-gray-400">
                             <div className="w-1 h-1 bg-current rounded-full"/>
                             <div className="w-1 h-1 bg-current rounded-full"/>
                             <div className="w-1 h-1 bg-current rounded-full"/>
                             <div className="w-1 h-1 bg-current rounded-full"/>
                        </div>
                        <span className="text-gray-200 text-sm font-bold">{t('dash.channel_perf')}</span>
                    </div>
                    <ChartContainer config={chartConfigBar} className="h-[200px] w-full">
                        <BarChart data={channelData} barSize={50}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333333" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={true} 
                                tickLine={false} 
                                tick={{fontSize: 12, fill: '#9CA3AF'}} 
                                dy={10}
                                stroke="#333333"
                            />
                            <YAxis 
                                axisLine={true} 
                                tickLine={false} 
                                tick={{fontSize: 10, fill: '#6B7280'}} 
                                stroke="#333333"
                            />
                            <ChartTooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                                content={<ChartTooltipContent hideLabel className="bg-[#1A1A1A] border-[#333] text-white" />} 
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {channelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>

                {/* Line Chart */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={16} className="text-yellow-400 fill-current" />
                        <span className="text-gray-200 text-sm font-bold">
                            {t('dash.stage_effect_analysis')}
                        </span>
                    </div>
                    <ChartContainer config={chartConfigLine} className="h-[250px] w-full">
                        <LineChart
                            accessibilityLayer
                            data={timeData}
                            margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#333333" />
                            <XAxis 
                                dataKey="time" 
                                axisLine={true} 
                                tickLine={false} 
                                tick={{fontSize: 12, fill: '#9CA3AF'}} 
                                dy={10}
                                padding={{ left: 20, right: 20 }}
                                stroke="#333333"
                            />
                            <YAxis 
                                axisLine={true} 
                                tickLine={false} 
                                tick={{fontSize: 10, fill: '#6B7280'}} 
                                stroke="#333333"
                            />
                            <ChartTooltip 
                                cursor={{stroke: 'rgba(255,255,255,0.2)'}} 
                                content={<ChartTooltipContent className="bg-[#1A1A1A] border-[#333] text-white" />} 
                            />
                            <Line 
                                type="monotone" 
                                dataKey="visit" 
                                stroke="var(--color-visit)" 
                                strokeWidth={3} 
                                dot={{r: 6, fill: 'var(--color-visit)', strokeWidth: 0}} 
                                activeDot={{r: 8}}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="stay" 
                                stroke="var(--color-stay)" 
                                strokeWidth={3} 
                                dot={{r: 6, fill: 'var(--color-stay)', strokeWidth: 0}} 
                                activeDot={{r: 8}}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
