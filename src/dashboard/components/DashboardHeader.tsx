import { Globe, Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function DashboardHeader() {
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ko' : 'en');
    };

    return (
        <header className="h-[60px] w-full flex items-center justify-between px-6 bg-transparent z-0">
            {/* Logo Area */}
            <div className="flex items-center gap-2">
                <span className="text-md font-bold text-white tracking-tight">{t('dash.admin_title')} +</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                    <span className="text-sm">{t('dash.search')}</span>
                    <Search size={14} />
                </div>

                <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                    <Globe size={14} />
                    <span className="font-medium">{language === 'en' ? 'KO' : 'EN'}</span>
                </button>

                <button className="text-sm text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg">
                    {t('dash.login')}
                </button>
            </div>
        </header>
    );
}
