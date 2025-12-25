import { useParams } from "react-router-dom";
import { HISTORY_DATA } from "./data";
import { HistoryHeader } from "./components/HistoryHeader";
import { HistoryDetails } from "./components/HistoryDetails";
import { HistoryActions } from "./components/HistoryActions";

export default function HistoryPage() {
    const { id } = useParams();
    const data = HISTORY_DATA[id as keyof typeof HISTORY_DATA];

    if (!data) {
        return <div className="text-white p-10">Log not found.</div>
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col">
            <HistoryHeader />
            <HistoryDetails data={data} />
            <HistoryActions />
        </div>
    );
}
