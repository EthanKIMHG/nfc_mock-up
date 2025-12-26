import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "../../context/LanguageContext";
import type { ScanMode, ScanStatus } from "../types";

interface ModeSwitcherProps {
    mode: ScanMode;
    setMode: (mode: ScanMode) => void;
    status: ScanStatus;
}

export function ModeSwitcher({ mode, setMode, status }: ModeSwitcherProps) {
    const { t } = useLanguage();

    return (
        <div className="z-10 mt-4">
            <Tabs defaultValue="ENTRY" value={mode} onValueChange={(v) => setMode(v as ScanMode)} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white/50">
                    <TabsTrigger value="ENTRY" disabled={status !== "IDLE"}>{t('mode.entrance')}</TabsTrigger>
                    <TabsTrigger value="PAYMENT" disabled={status !== "IDLE"}>{t('mode.payment')}</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
