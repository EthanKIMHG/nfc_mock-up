import { useState } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { ActiveEventList } from "./components/ActiveEventList";
import { EventHistoryList } from "./components/EventHistoryList";
import { EventDetailView } from "./components/EventDetailView";

export default function DashboardPage() {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
            <DashboardHeader />

            <main className="w-full">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {selectedEventId ? (
                        <EventDetailView
                            eventId={selectedEventId}
                            onBack={() => setSelectedEventId(null)}
                        />
                    ) : (
                        <div className="space-y-12">
                            <div className="mb-12">
                                <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Discover Events</h1>
                                <p className="text-gray-400 text-lg font-light">
                                    Monitor real-time audience flow or review past event performance.
                                </p>
                            </div>

                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Live Now</h2>
                                    <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors bg-white/5 px-3 py-1 rounded-full">
                                        View All
                                    </button>
                                </div>
                                <ActiveEventList onSelectEvent={setSelectedEventId} />
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Past Events</h2>
                                </div>
                                <EventHistoryList onSelectEvent={setSelectedEventId} />
                            </section>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
