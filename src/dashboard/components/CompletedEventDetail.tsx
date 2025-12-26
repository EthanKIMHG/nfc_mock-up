import { getAnalytics, getEvents } from "@/dashboard/data";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { EventCharts } from "./completed/EventCharts";
import { EventSummaryCards } from "./completed/EventSummaryCards";

interface CompletedEventDetailProps {
    eventId: string;
    onBack: () => void;
    onViewAIReport: () => void;
}

export function CompletedEventDetail({ eventId, onBack, onViewAIReport }: CompletedEventDetailProps) {
    const { t, language } = useLanguage();
    const event = getEvents(language).find(e => e.id === eventId);
    const analytics = getAnalytics(eventId, language);

    if (!event || !analytics || !analytics.chartData) return <div>Data not available</div>;

    const { chartData } = analytics;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {t('dash.back')}
                    </button>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">{event.name}</h1>
                    <div className="flex gap-4 text-gray-400">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                    </div>
                </div>

                <button
                    onClick={onViewAIReport}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 group"
                >
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    {t('dash.view_ai')}
                </button>
            </div>

            <EventSummaryCards
                revenue={event.revenue}
                totalAttendees={event.attendees.total}
                checkedInAttendees={event.attendees.checkedIn}
            />

            <EventCharts
                chartData={chartData}
                revenue={event.revenue}
            />
        </div>
    );
}
