
import { HologramTicket } from "@/components/HologramTicket";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock Data (In real app, fetch by ID)
const HISTORY_DATA = {
  "LOG-001": { id: "NFT-882910", name: "Jaehee Kim", tier: "VIP Access", seat: "Zone A - Row 1", status: "VALID" as const },
  "LOG-002": { id: "NFT-000000", name: "Unknown", tier: "-", seat: "-", status: "INVALID" as const },
  "LOG-003": { id: "NFT-123456", name: "Minsoo Park", tier: "VIP Access", seat: "Zone VIP", status: "VALID" as const },
};

export default function HistoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = HISTORY_DATA[id as keyof typeof HISTORY_DATA];

    if (!data) {
        return <div className="text-white p-10">Log not found.</div>
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col">
            {/* Nav */}
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
                    <ArrowLeft size={24} />
                </Button>
                <div className="text-sm font-mono text-gray-500">
                    SCAN DETAILS
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Share2 size={20} />
                </Button>
            </div>

            {/* Ticket Card */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                 <HologramTicket status={data.status} data={data} />
                 
                 <div className="text-center space-y-2">
                    <p className="text-sm text-gray-500">Scan Timestamp</p>
                    <p className="font-mono text-xl">2024.05.20 10:42:15</p>
                 </div>
            </div>

            {/* Actions for History Review */}
             <div className="mt-8">
                <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700 h-12 rounded-xl">
                    Report Issue
                </Button>
             </div>
        </div>
    );
}
