import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ScanStatus, ScanMode } from "../types";

interface ModeSwitcherProps {
    mode: ScanMode;
    setMode: (mode: ScanMode) => void;
    status: ScanStatus;
}

export function ModeSwitcher({ mode, setMode, status }: ModeSwitcherProps) {
    return (
        <div className="z-10 mt-4">
            <Tabs defaultValue="ENTRY" value={mode} onValueChange={(v) => setMode(v as ScanMode)} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white/50">
                    <TabsTrigger value="ENTRY" disabled={status !== "IDLE"}>Entry</TabsTrigger>
                    <TabsTrigger value="PAYMENT" disabled={status !== "IDLE"}>Pay</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
