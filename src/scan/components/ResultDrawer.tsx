import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ShieldCheck } from "lucide-react";
import type { NFTTicket } from "@/types/ticket";
import { useTicketContext } from "@/context/TicketContextTypes"; // Updated path since we are in components/
import type { ScanMode } from "@/scan/types";

interface ResultDrawerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    scannedData: NFTTicket | null;
    mode: ScanMode;
    onReset: () => void;
}

export function ResultDrawer({ isOpen, setIsOpen, scannedData, mode, onReset }: ResultDrawerProps) {
    const { incrementEntered } = useTicketContext();

    const handleConfirm = () => {
        if (mode === "ENTRY") incrementEntered();
        onReset();
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent className="bg-zinc-950/90 backdrop-blur-xl border-zinc-800 text-white pb-8">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="mb-4">
                        <DrawerTitle className="text-3xl font-medium text-center text-white tracking-tight">
                            {mode === "ENTRY" ? "Access Granted" : "Payment Success"}
                        </DrawerTitle>
                        <DrawerDescription className="text-center text-gray-400 font-light">
                            transaction confirmed.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-6 pb-2">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                                {scannedData?.owner.name.charAt(0)}
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-medium text-white">{scannedData?.owner.name}</h3>
                                <p className="text-xs text-lime-400 font-mono mt-1">{scannedData?.id}</p>
                            </div>

                            {/* Transaction Info (Dynamic based on Mode) */}
                            <div className="w-full bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">{mode === "ENTRY" ? "Action" : "Amount"}</span>
                                <span className="text-lg font-bold font-mono">
                                    {mode === "ENTRY" ? "ENTRY LOG" : "₩ 10,000"}
                                </span>
                            </div>

                            {/* Device Signature Info Badge */}
                            <div className="w-full bg-cyan-950/30 border border-cyan-500/20 rounded-lg p-2 flex items-center justify-center gap-2">
                                <ShieldCheck size={12} className="text-cyan-400" />
                                <span className="text-[10px] text-cyan-400 font-mono">
                                    Signed by {mode === "ENTRY" ? "GATE-01" : "POS-01"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <DrawerFooter className="gap-3">
                        <Button
                            onClick={handleConfirm}
                            className="w-full bg-white text-black hover:bg-gray-200 rounded-full h-14 text-base font-medium tracking-wide"
                        >
                            Confirm
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="ghost" onClick={onReset} className="w-full text-white/50 hover:text-white rounded-full h-12">
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
