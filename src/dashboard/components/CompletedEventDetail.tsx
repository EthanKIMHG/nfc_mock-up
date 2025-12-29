import { getAnalytics, getEvents } from "@/dashboard/data";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { CompletedCrowdAnalysis } from "./completed/detail/CompletedCrowdAnalysis";
import { CompletedDetailedInfo } from "./completed/detail/CompletedDetailedInfo";
import { CompletedHeader } from "./completed/detail/CompletedHeader";
import { CompletedInsights } from "./completed/detail/CompletedInsights";
import { CompletedSponsorPerf } from "./completed/detail/CompletedSponsorPerf";
import { CompletedStatsCards } from "./completed/detail/CompletedStatsCards";

interface CompletedEventDetailProps {
    eventId: string;
    onBack: () => void;
    onViewAIReport: () => void;
}

export function CompletedEventDetail({ eventId, onBack, onViewAIReport }: CompletedEventDetailProps) {
    const { language, t } = useLanguage();
    const event = getEvents(language).find(e => e.id === eventId);
    const analytics = getAnalytics(eventId, language);
    
    // Mock Zones Data (Lifted State)
    const zones = [
        { id: 1, name: t('zone.main_stage'), count: 11820, capacity: 15000, color: "bg-orange-500", width: "78%", pct: 78, gender:{m:45, f:55}, age:{a10:9, a20:41, a30:28, a40:18} },
        { id: 2, name: t('zone.electronic_arena'), count: 3336, capacity: 4800, color: "bg-yellow-500", width: "69%", pct: 69, gender:{m:60, f:40}, age:{a10:15, a20:55, a30:25, a40:5} },
        { id: 3, name: t('zone.indie_stage'), count: 1031, capacity: 2000, color: "bg-yellow-500", width: "51%", pct: 51, gender:{m:30, f:70}, age:{a10:5, a20:30, a30:45, a40:20} },
        { id: 4, name: t('zone.food_court_1f'), count: 744, capacity: 1200, color: "bg-green-500", width: "62%", pct: 62, gender:{m:50, f:50}, age:{a10:10, a20:30, a30:30, a40:30} },
        { id: 5, name: t('zone.acoustic_lounge'), count: 684, capacity: 2000, color: "bg-green-500", width: "34%", pct: 34, gender:{m:20, f:80}, age:{a10:0, a20:20, a30:50, a40:30} },
        { id: 6, name: t('zone.redbull_zone'), count: 99, capacity: 120, color: "bg-red-500", width: "82%", pct: 82, gender:{m:80, f:20}, age:{a10:30, a20:60, a30:10, a40:0} },
        { id: 7, name: t('zone.activity_zone'), count: 80, capacity: 100, color: "bg-red-500", width: "80%", pct: 80, gender:{m:40, f:60}, age:{a10:40, a20:40, a30:10, a40:10} },
    ];

    const [selectedZoneId, setSelectedZoneId] = useState<number>(1);
    const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];

    if (!event || !analytics || !analytics.chartData) return <div>Data not available</div>;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <CompletedHeader eventName={event.name} onBack={onBack} />
                <CompletedStatsCards 
                    totalAttendees={event.attendees.checkedIn} 
                    maxCapacity={event.attendees.total} 
                    revenue={event.revenue} 
                    topZones={analytics.topZones}
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
                <CompletedCrowdAnalysis 
                    zones={zones} 
                    selectedZoneId={selectedZoneId}
                    onSelectZone={setSelectedZoneId}
                />
                <CompletedDetailedInfo zone={selectedZone} />
            </div>
            
            <div className="grid grid-cols-12 gap-6">
                 {/* Sponsor Performance */}
                 <CompletedSponsorPerf />
            </div>

            {/* Insights and Alerts */}
            <CompletedInsights insights={analytics.aiInsights} />
        </div>
    );
}
