import { cn } from "@/lib/utils";
import { Activity, History, LayoutDashboard, Settings } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface DashboardSidebarProps {
    activeTab: "overview" | "history" | "settings";
    onTabChange: (tab: "overview" | "history" | "settings") => void;
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
    const { t } = useLanguage();

    const navItems = [
        { id: "overview", label: t('dash.nav.overview'), icon: LayoutDashboard },
        { id: "history", label: t('dash.nav.history'), icon: History },
        { id: "settings", label: t('dash.nav.settings'), icon: Settings },
    ] as const;

    return (
        <div className="w-64 border-r border-white/10 h-screen p-4 flex flex-col bg-black/50 backdrop-blur-xl fixed left-0 top-0 z-50">
            <div className="flex items-center gap-3 px-4 py-4 mb-8">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <Activity className="text-white" size={18} />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    {t('dash.admin_title')}
                </span>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                            activeTab === item.id
                                ? "bg-white/10 text-white shadow-lg shadow-purple-500/10 border border-white/5"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon size={18} className={cn(activeTab === item.id ? "text-purple-400" : "text-gray-500")} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto px-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{t('dash.user.name')}</span>
                        <span className="text-xs text-gray-500">{t('dash.user.role')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
