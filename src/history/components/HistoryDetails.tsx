import { HologramTicket } from "@/components/HologramTicket";

interface HistoryDetailsProps {
    data: any;
}

export function HistoryDetails({ data }: HistoryDetailsProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <HologramTicket status={data.status} data={data} />

            <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">Scan Timestamp</p>
                <p className="font-mono text-xl">2024.05.20 10:42:15</p>
            </div>
        </div>
    );
}
