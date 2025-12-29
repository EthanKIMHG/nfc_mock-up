
import { Sparkles } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";

interface ActivePurchase {
    id: string;
    item: string;
    amount: number;
    time: string;
}

interface ActiveInsightsProps {
    purchases: ActivePurchase[];
}

export function ActiveInsights({ purchases }: ActiveInsightsProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-[#1A1A1A] rounded-3xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t('dash.insights_alerts')}</h3>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full">{t('dash.filter_all')}</span>
                    <span className="px-3 py-1 bg-white/5 text-gray-500 text-xs font-bold rounded-full">{t('dash.filter_insight')}</span>
                    <span className="px-3 py-1 bg-white/5 text-gray-500 text-xs font-bold rounded-full">{t('dash.filter_alert')}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <div className="flex justify-between items-start mb-1 gap-4">
                            <h4 className="font-bold text-red-400">{t('dash.alert.crowd_density')}</h4>
                            <span className="text-[10px] bg-red-500 text-black px-1.5 py-0.5 rounded font-bold shrink-0">{t('dash.high_priority')}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            {t('dash.alert.crowd_desc')}
                        </p>
                        <p className="text-[10px] text-gray-600 mt-2">{t('dash.just_now')}</p>
                    </div>
                </div>

                {purchases.length > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start animate-in zoom-in duration-300">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <div className="flex justify-between items-start mb-1 gap-4">
                                <h4 className="font-bold text-blue-400">{t('dash.insight.live_tx')}</h4>
                                <span className="text-[10px] bg-blue-500 text-black px-1.5 py-0.5 rounded font-bold shrink-0">{t('dash.filter_insight')}</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                {t('dash.insight.new_purchase')} <b className="text-white">{purchases[0].item}</b> ({purchases[0].amount.toLocaleString()} KRW). {t('dash.insight.revenue_velocity')}
                            </p>
                            <p className="text-[10px] text-gray-600 mt-2">{t('dash.just_now')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
