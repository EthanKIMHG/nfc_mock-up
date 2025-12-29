import { useMemo, useState } from "react";
import { SponsorDetail } from "./SponsorDetail";
import { type ActiveSponsor, SponsorList } from "./SponsorList";

interface SimpleSponsor {
    id: number | string;
    name: string;
    booth: string;
    visits: number;
    time: string;
    reach: string;
    eng: string;
}

interface SponsorPerformanceProps {
    sponsors: SimpleSponsor[];
}

export function SponsorPerformance({ sponsors }: SponsorPerformanceProps) {
    // Enrich data with missing fields for the design (Category, Grade, Conversion)
    const enrichedSponsors = useMemo<ActiveSponsor[]>(() => {
        return sponsors.map((s, i) => ({
            ...s,
            category: i === 0 ? "F&B" : i === 1 ? "Bev" : i === 2 ? "Exp" : "Tech",
            grade: i < 3 ? "Excellent" : "Average", // First 3 are excellent
            conversion: `${59 - i * 14}%` // Mock conversion
        }));
    }, [sponsors]);

    const [selectedSponsorId, setSelectedSponsorId] = useState<number | string>(enrichedSponsors[0]?.id || 1);

    const selectedSponsor = enrichedSponsors.find(s => s.id === selectedSponsorId) || enrichedSponsors[0];

    return (
        <div className="col-span-12 grid grid-cols-12 gap-6 h-auto min-h-[500px]">
            {/* Left Panel: List */}
            <div className="col-span-12 lg:col-span-5 h-full">
                <SponsorList 
                    sponsors={enrichedSponsors} 
                    selectedId={selectedSponsorId} 
                    onSelect={setSelectedSponsorId} 
                />
            </div>

            {/* Right Panel: Detail */}
            <div className="col-span-12 lg:col-span-7 h-full">
               {selectedSponsor && <SponsorDetail sponsor={selectedSponsor} />}
            </div>
        </div>
    );
}
