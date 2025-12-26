import { Map } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getAnalytics, getEvents } from "../data";
import { AIReportView } from "./AIReportView";
import { CompletedEventDetail } from "./CompletedEventDetail";
import { FestivalMap } from "./FestivalMap";
import { ActiveEventHeader } from "./active/ActiveEventHeader";
import { LiveStatsSidebar } from "./active/LiveStatsSidebar";

interface EventDetailViewProps {
    eventId: string;
    onBack: () => void;
}

export function EventDetailView({ eventId, onBack }: EventDetailViewProps) {
    const { t, language } = useLanguage();
    const originalEvent = getEvents(language).find(e => e.id === eventId);
    const [viewMode, setViewMode] = useState<"DATA" | "AI_REPORT">("DATA");
    const originalAnalytics = getAnalytics(eventId, language);

    const [revenue, setRevenue] = useState(originalEvent?.revenue || 0);
    const [attendees, setAttendees] = useState(originalEvent?.attendees.checkedIn || 0);
    const [purchases, setPurchases] = useState(originalAnalytics?.recentPurchases || []);
    const [zones, setZones] = useState(originalAnalytics?.topZones || []);

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

        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [originalEvent]);

    if (!originalEvent) return <div>Event not found</div>;

    if (originalEvent.status === "COMPLETED") {
        if (viewMode === "AI_REPORT") {
            return <AIReportView eventId={eventId} onBack={() => setViewMode("DATA")} />;
        }
        return (
            <CompletedEventDetail
                eventId={eventId}
                onBack={onBack}
                onViewAIReport={() => setViewMode("AI_REPORT")}
            />
        );
    }

    return (
        <div className="space-y-8">
            <ActiveEventHeader
                eventName={originalEvent.name}
                eventDate={originalEvent.date}
                eventLocation={originalEvent.location}
                onBack={onBack}
                currentRevenue={revenue}
            />

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6 items-start">

                {/* Movement Map */}
                <div className="col-span-8 bg-zinc-900/50 border border-white/10 rounded-3xl p-6 min-h-[500px] flex flex-col relative overflow-hidden">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 z-10 relative">
                        <Map size={20} className="text-purple-500" />
                        {t('dash.density_map')}
                    </h3>

                    {/* Interactive SVG Map */}
                    <div className="flex-1 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-950 to-zinc-950 -z-10" />

                        <FestivalMap eventId={eventId} zones={zones} />

                        <p className="absolute bottom-4 right-4 text-xs text-gray-500 flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            {t('dash.updating')}
                        </p>
                    </div>
                </div>

                <LiveStatsSidebar
                    currentAttendees={attendees}
                    totalAttendees={originalEvent.attendees.total}
                    purchases={purchases}
                />
            </div>
        </div>
    );
}
