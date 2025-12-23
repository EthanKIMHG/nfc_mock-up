
import "@/components/hologram.css"; // We will create this CSS file
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface TicketProps {
    status: "VALID" | "INVALID";
    data?: {
        name: string;
        id: string;
        tier: string;
        seat: string;
    }
}

export function HologramTicket({ status, data }: TicketProps) {
    if (status === "INVALID") {
        return (
             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full aspect-[3/4] rounded-2xl bg-red-950/30 border border-red-500/50 flex flex-col items-center justify-center gap-4 p-8 text-center"
            >
                <XCircle size={64} className="text-red-500 animate-pulse" />
                <div>
                    <h2 className="text-2xl font-bold text-red-500">INVALID TICKET</h2>
                    <p className="text-gray-400 mt-2">This NFC band is not registered or valid for this event.</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="holo-card relative w-full aspect-[3/4] rounded-3xl overflow-hidden"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
        >
            {/* Holographic Shine Effects - Handled by CSS */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
            
            {/* Content Layer */}
            <div className="relative z-10 h-full flex flex-col p-6 items-center text-center justify-between border border-white/10 rounded-3xl">
                {/* Header */}
                <div className="w-full flex justify-between items-start opacity-70">
                    <img src="/vite.svg" className="w-8 h-8 opacity-50 grayscale" alt="Logo" />
                    <span className="text-xs font-mono border border-white/20 px-2 py-1 rounded">OFFICIAL NFT</span>
                </div>

                {/* Main Identity */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-lime-400/30 p-1">
                             <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden">
                                {/* Placeholder Avatar */}
                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-3xl font-bold">
                                    {data?.name.charAt(0)}
                                </div>
                             </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-lime-400 text-black rounded-full p-1 border-4 border-black">
                            <CheckCircle2 size={24} />
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-white mb-1">{data?.name}</h2>
                        <p className="font-mono text-lime-400 tracking-widest text-sm">{data?.id}</p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="w-full grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
                    <div className="bg-white/5 p-4 flex flex-col items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Access Tier</span>
                        <span className="font-bold text-lg text-purple-300">{data?.tier}</span>
                    </div>
                    <div className="bg-white/5 p-4 flex flex-col items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Seat Zone</span>
                        <span className="font-bold text-lg text-white">{data?.seat}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
