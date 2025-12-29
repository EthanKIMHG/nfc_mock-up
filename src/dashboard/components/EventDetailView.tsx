import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getAnalytics, getEvents } from "../data";
import { AIReportView } from "./AIReportView";
import { CompletedEventDetail } from "./CompletedEventDetail";
import { ActiveDetailedInfo } from "./active/detail/ActiveDetailedInfo";
import { ActiveInsights } from "./active/detail/ActiveInsights";
import { ActiveStatsCards } from "./active/detail/ActiveStatsCards";
import { CrowdAnalysisSection } from "./active/detail/CrowdAnalysisSection";
import { SponsorPerformance } from "./active/detail/SponsorPerformance";

interface EventDetailViewProps {
    eventId: string;
    onBack: () => void;
}

export function EventDetailView({ eventId, onBack }: EventDetailViewProps) {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'overview' | 'ai'>('overview');
    const [originalEvent, setOriginalEvent] = useState<any>(null);
    const [originalAnalytics, setOriginalAnalytics] = useState<any>(null);

    // Live State
    const [revenue, setRevenue] = useState(0);
    const [attendees, setAttendees] = useState(0);
    const [purchases, setPurchases] = useState<any[]>([]);
    const [zones, setZones] = useState<any[]>([]);
    const [sponsors, setSponsors] = useState([
        { id: 1, name: "Cass Fresh", booth: "Food Court 1F", visits: 13110, time: "28m", reach: "52%", eng: "74%" },
        { id: 2, name: "Red Bull", booth: "Energy Zone", visits: 9580, time: "15m", reach: "38%", eng: "86%" },
        { id: 3, name: "Heineken", booth: "Lounge Area", visits: 8570, time: "31m", reach: "34%", eng: "78%" },
    ]);

    // State for interactive selection
    const [selectedZoneName, setSelectedZoneName] = useState<string>("");

    useEffect(() => {
        const events = getEvents(language);
        const found = events.find(e => e.id === eventId);
        if (found) {
            setOriginalEvent(found);
            setRevenue(found.revenue);
            setAttendees(found.attendees.checkedIn);

            const analytics = getAnalytics(eventId, language);
            setOriginalAnalytics(analytics);
            setPurchases(analytics.recentPurchases);
            setZones(analytics.topZones);
        }
    }, [eventId, language]);

    useEffect(() => {
        if (zones.length > 0 && !selectedZoneName) {
            setSelectedZoneName(zones[0].name);
        }
    }, [zones, selectedZoneName]);
    
    // Simulation Effect
    useEffect(() => {
        if (!originalEvent || originalEvent.status !== "ACTIVE") return;

        const interval = setInterval(() => {
            // 1. Simulate Revenue & Attendees Increase
            setRevenue(prev => prev + Math.floor(Math.random() * 150000));
            setAttendees(prev => prev + Math.floor(Math.random() * 3));

            // 2. Simulate New Purchase (Stacking)
            if (Math.random() > 0.3) {
                const newPurchase = {
                    id: Math.random().toString(36).substr(2, 9),
                    item: ["VIP Upgrade", "Drink Token", "Merch Bundle", "Fast Pass"][Math.floor(Math.random() * 4)],
                    amount: [15000, 35000, 50000, 12000][Math.floor(Math.random() * 4)],
                    time: "Just now"
                };
                setPurchases(prev => [newPurchase, ...prev].slice(0, 7)); // Keep last 7
            }

            // 3. Fluctuate Heatmap
            setZones(prev => prev.map(z => ({
                ...z,
                percentage: Math.min(100, Math.max(5, z.percentage + (Math.random() * 10 - 5)))
            })));

            // 4. Simulate Sponsor Visits
            setSponsors(prev => prev.map(s => ({
                ...s,
                visits: s.visits + Math.floor(Math.random() * 5)
            })));

        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [originalEvent]);
    
    if (!originalEvent) return <div>Loading...</div>;

    // Completed Event View
    if (originalEvent.status === 'COMPLETED') {
        if (activeTab === 'ai') {
            return <AIReportView eventId={eventId} onBack={() => setActiveTab('overview')} />;
        }
        return <CompletedEventDetail eventId={eventId} onBack={onBack} onViewAIReport={() => setActiveTab('ai')} />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header / Top Stats */}
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-white tracking-tight">{originalEvent.name}</h1>
                            <span className="animate-pulse px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold">LIVE</span>
                        </div>
                        <p className="text-gray-400 font-medium flex items-center gap-2">
                             {t('dash.last_updated')}: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                <ActiveStatsCards 
                    attendees={attendees} 
                    maxCapacity={originalEvent.attendees.total} 
                    revenue={revenue} 
                    topZones={zones} 
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
                <CrowdAnalysisSection 
                    zones={zones} 
                    totalAttendees={originalEvent.attendees.total} 
                    eventId={eventId} 
                    selectedZoneName={selectedZoneName}
                    onZoneSelect={setSelectedZoneName}
                />
                
                <ActiveDetailedInfo 
                    selectedZone={zones.find(z => z.name === selectedZoneName) || zones[0]} 
                    totalAttendees={originalEvent.attendees.total} 
                />
            </div>

            <div className="grid grid-cols-12 gap-6">
                <SponsorPerformance sponsors={sponsors} />
            </div>

            {/* Insights and Alerts */}
            <ActiveInsights purchases={purchases} />
        </div>
    );
}

