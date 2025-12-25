import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { EVENTS } from "../data";

interface EventHistoryListProps {
    onSelectEvent: (eventId: string) => void;
}

export function EventHistoryList({ onSelectEvent }: EventHistoryListProps) {
    const pastEvents = EVENTS.filter(e => e.status === "COMPLETED");

    return (
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="p-4 font-medium">Event Name</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Location</th>
                        <th className="p-4 font-medium text-right">Attendees</th>
                        <th className="p-4 font-medium text-right">Revenue</th>
                        <th className="p-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {pastEvents.map((event) => (
                        <tr
                            key={event.id}
                            onClick={() => onSelectEvent(event.id)}
                            className="group hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <td className="p-4">
                                <div className="font-bold text-white">{event.name}</div>
                                <div className="text-xs text-gray-500">{event.id}</div>
                            </td>
                            <td className="p-4 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-500" />
                                    {event.date}
                                </div>
                            </td>
                            <td className="p-4 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-gray-500" />
                                    {event.location}
                                </div>
                            </td>
                            <td className="p-4 text-right text-white font-mono">
                                {event.attendees.total.toLocaleString()}
                            </td>
                            <td className="p-4 text-right text-green-400 font-mono">
                                ₩{event.revenue.toLocaleString()}
                            </td>
                            <td className="p-4 text-right">
                                <ChevronRight className="inline-block text-gray-600 group-hover:text-white transition-colors" size={20} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {pastEvents.length === 0 && (
                <div className="p-8 text-center text-gray-500">No past events found.</div>
            )}
        </div>

    );
}


