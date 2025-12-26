import { ArrowLeft, Beer, Download, FileText, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { getAnalytics, getEvents } from "../data";

interface AIReportViewProps {
    eventId: string;
    onBack: () => void;
}

export function AIReportView({ eventId, onBack }: AIReportViewProps) {
    const { t, language } = useLanguage();
    const event = getEvents(language).find(e => e.id === eventId);
    const analytics = getAnalytics(eventId, language);

    if (!event || !analytics || !analytics.aiInsights) return <div>{t('dash.report_unavailable')}</div>;

    const getIcon = (type: string) => {
        switch (type) {
            case "users": return <Users size={24} className="text-blue-600" />;
            case "beer": return <Beer size={24} className="text-amber-500" />;
            case "trending": return <TrendingUp size={24} className="text-pink-500" />;
            default: return <FileText size={24} className="text-gray-600" />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {t('dash.back')}
                </button>
            </div>

            {/* Document Container */}
            <div className="max-w-4xl mx-auto bg-white text-black rounded-xl shadow-2xl overflow-hidden min-h-[800px] flex flex-col relative">

                {/* Paper Texture Overlay (Subtle) */}
                <div className="absolute inset-0 bg-stone-50 opacity-50 pointer-events-none" />

                {/* Header Section */}
                <div className="p-12 border-b border-gray-100 relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest mb-4">
                                {t('dash.ai_title')}
                            </div>
                            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                                {t('dash.post_event_report')}
                            </h1>
                            <p className="text-gray-500 text-lg">{event.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">{t('dash.generated_on')}</p>
                            <p className="font-mono font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mt-12">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">{t('dash.total_attendees_cap')}</p>
                            <p className="text-2xl font-bold">{event.attendees.total.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">{t('dash.total_revenue_cap')}</p>
                            <p className="text-2xl font-bold">₩{event.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Avg. Dwell Time</p>
                            <p className="text-2xl font-bold">{analytics.avgDwellTime}</p>
                        </div>
                    </div>
                </div>

                {/* AI Insights Section */}
                <div className="p-12 bg-gray-50/50 flex-1 relative z-10">
                    <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-sans">AI</span>
                        {t('dash.key_insights')}
                    </h2>

                    <div className="space-y-6">
                        {analytics.aiInsights.map((insight, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex gap-6">
                                <div className="shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                    {getIcon(insight.icon)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{insight.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {insight.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-lg">
                        <h4 className="font-bold text-blue-900 mb-2 text-sm uppercase">{t('dash.summary')}</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">
                            Based on the analysis, this event showed strong engagement from the 30-40 age demographic.
                            The correlation between specific age groups and F&B consumption suggests high potential for
                            targeted sponsorship deals in future iterations.
                        </p>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="p-8 bg-gray-900 text-white flex justify-between items-center relative z-10">
                    <div className="text-xs text-gray-500">
                        {t('dash.confidential')}
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors">
                            <Download size={16} />
                            {t('dash.download_pdf')}
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors">
                            <FileText size={16} />
                            {t('dash.download_xls')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
