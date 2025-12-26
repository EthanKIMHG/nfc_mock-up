import { motion } from "framer-motion";
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { EVENTS } from "../../dashboard/data";

interface AdminEventSelectorProps {
    onSelect: (eventId: string) => void;
}

export function AdminEventSelector({ onSelect }: AdminEventSelectorProps) {
    const { t } = useLanguage();
    const activeEvents = EVENTS.filter(e => e.status === "ACTIVE" || e.status === "UPCOMING");

    return (
        <div className="p-6 space-y-6">
            <header className="mb-8 mt-4">
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                    {t('dash.select_event')}
                </h1>
                <p className="text-gray-400">{t('dash.choose_event')}</p>
            </header>

            <div className="space-y-4">
                {activeEvents.map((event, i) => (
                    <motion.button
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => onSelect(event.id)}
                        className="w-full text-left bg-zinc-900 border border-white/10 rounded-2xl p-5 relative overflow-hidden group active:scale-95 transition-transform duration-200"
                    >
                        {/* active glow */}
                        {event.status === "ACTIVE" && (
                            <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
                        )}

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${event.status === "ACTIVE"
                                    ? "bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                                    : "bg-zinc-700 text-gray-300"
                                    }`}>
                                    {event.status === "ACTIVE" ? t('dash.live_now_badge') : t('dash.upcoming_badge')}
                                </span>
                                <ChevronRight className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                {event.name}
                            </h3>

                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{event.date.split(" - ")[0]}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    <span>{event.location}</span>
                                </div>
                                {event.status === "ACTIVE" && (
                                    <div className="flex items-center gap-2 text-green-400 mt-2">
                                        <Users size={14} />
                                        <span className="font-mono font-bold">
                                            {event.attendees.checkedIn.toLocaleString()} / {event.attendees.total.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
