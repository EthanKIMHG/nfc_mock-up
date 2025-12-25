"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdminEventSelector } from "./components/AdminEventSelector";
import { AdminPOSDashboard } from "./components/AdminPOSDashboard";

export default function AdminPage() {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    return (
        <div className="bg-black min-h-screen text-white font-sans max-w-md mx-auto relative shadow-2xl border-x border-zinc-900">
            <AnimatePresence mode="wait">
                {!selectedEventId ? (
                    <motion.div
                        key="selector"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AdminEventSelector onSelect={setSelectedEventId} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black z-20 "
                    >
                        <AdminPOSDashboard
                            eventId={selectedEventId}
                            onBack={() => setSelectedEventId(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
