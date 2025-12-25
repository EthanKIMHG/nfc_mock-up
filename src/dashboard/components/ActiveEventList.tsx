import { ArrowRight, MapPin, Users } from "lucide-react";
import { EVENTS } from "../data";

interface ActiveEventListProps {
    onSelectEvent: (eventId: string) => void;
}

export function ActiveEventList({ onSelectEvent }: ActiveEventListProps) {
    const activeEvents = EVENTS.filter(e => e.status === "ACTIVE" || e.status === "UPCOMING");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEvents.map((event) => (
                <div
                    key={event.id}
                    onClick={() => onSelectEvent(event.id)}
                    className="group relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${event.status === "ACTIVE"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                }`}>
                                {event.status}
                            </span>
                            <ArrowRight className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>

                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                {event.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={14} />
                                {event.attendees.checkedIn.toLocaleString()} / {event.attendees.total.toLocaleString()}
                            </div>
                        </div>

                        {event.status === "ACTIVE" && (
                            <div className="mt-6">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-gray-500">Live Capacity</span>
                                    <span className="text-white font-mono">
                                        {Math.round((event.attendees.checkedIn / event.attendees.total) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                        style={{ width: `${(event.attendees.checkedIn / event.attendees.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
}
