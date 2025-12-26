import { useLanguage } from "../../context/LanguageContext";

export function AdminHeader() {
    const { t } = useLanguage();
    return (
        <div className="flex justify-between items-center z-10">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent tracking-tighter">
                    {t('dash.event_admin')}
                </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
                <span className="text-[10px] font-bold tracking-widest text-green-500">{t('dash.live_status')}</span>
            </div>
        </div>
    );
}
