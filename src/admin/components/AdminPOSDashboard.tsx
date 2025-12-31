import { EVENTS } from "@/dashboard/data";
import { useState } from "react";
import { useNFC } from "@/hooks/useNFC";
import { useLanguage } from "../../context/LanguageContext";
import { EventInfo } from "./EventInfo";
import { POSHeader } from "./pos/POSHeader";
import { POSModeSwitcher, type POSMode } from "./pos/POSModeSwitcher";
import { POSScanFlow, type ScanStep } from "./pos/POSScanFlow";
import { POSStatusCard } from "./pos/POSStatusCard";

interface AdminPOSDashboardProps {
    eventId: string;
    onBack: () => void;
}

export function AdminPOSDashboard({ eventId, onBack }: AdminPOSDashboardProps) {
    const event = EVENTS.find(e => e.id === eventId);

    const { t } = useLanguage();

    const [mode, setMode] = useState<POSMode>("ENTRANCE");
    const [scanStep, setScanStep] = useState<ScanStep>("IDLE");
    const [scannedUser, setScannedUser] = useState<{ name: string; type: string; nfcUid: string } | null>(null);
    const [checkedIn, setCheckedIn] = useState(event?.attendees.checkedIn || 0);
    const [shouldFailNext, setShouldFailNext] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    // Simulated Data
    const DEVICE_ID = "DEV-POS-082";

    const { startScan, stopScan, serialNumber, isSupported } = useNFC();

    const handleScan = async () => {
        if (scanStep !== "IDLE") return;
        setScanStep("SCANNING");

        if (isSupported) {
            await startScan({
                onReading: () => {
                    stopScan();
                    setScanStep("SIGNING");
                },
                onError: (err) => {
                    stopScan();
                    setScanStep("ERROR");
                    setErrorMessage(err);
                    console.error(err);
                    setTimeout(() => {
                        setScanStep("IDLE");
                        setErrorMessage(undefined);
                    }, 3000);
                }
            });
        } else {
            // Fallback for desktop/unsupported devices
            setTimeout(() => setScanStep("SIGNING"), 5000);
        }
    };

    const handleSignature = () => {
        setScanStep("VERIFYING");
        const currentNfcUid = serialNumber || "04:A2:3C:91"; // Capture current UID for display
        const payload = {
            nfc_uid: currentNfcUid, // Use scanned UID or fallback
            device_id: DEVICE_ID,
            timestamp: new Date().toISOString(),
            signature: "admin_signed_hash"
        };
        console.log("Submitting Payload to Server:", payload);

        setTimeout(() => {
            const success = !shouldFailNext;

            if (success) {
                setScanStep("SUCCESS");
                if (mode === "ENTRANCE") setCheckedIn(prev => prev + 1);
                setScannedUser({
                    name: "Kim Min-soo",
                    type: mode === "ENTRANCE" ? "VIP ACCESS" : "PAYMENT APPROVED",
                    nfcUid: currentNfcUid
                });
                setTimeout(() => {
                    setScanStep("IDLE");
                    setScannedUser(null);
                    stopScan(); // Ensure scan is stopped
                }, 2500);
            } else {
                setScanStep("ERROR");
                setTimeout(() => {
                    setScanStep("IDLE");
                    setShouldFailNext(false);
                    stopScan(); // Ensure scan is stopped
                }, 2500);
            }
        }, 1500);
    };

    const triggerFailTest = () => {
        if (scanStep !== "IDLE") return;
        setShouldFailNext(true);
        // Start the flow
        setScanStep("SCANNING");
        setTimeout(() => setScanStep("SIGNING"), 1500);
    };

    if (!event) return <div>Event not found</div>;

    return (
        <div className="flex flex-col h-[100dvh] relative overflow-hidden bg-black">
            <POSHeader eventName={event.name} onBack={onBack} />

            <div className="text-[10px] text-zinc-600 font-mono text-center mt-2 mb-2 uppercase tracking-widest">
                {t('dashboard.term')}: {DEVICE_ID}
            </div>

            <POSModeSwitcher mode={mode} setMode={setMode} disabled={scanStep !== "IDLE"} />

            <div className="flex-1 flex flex-col px-6 pb-6">
                <POSStatusCard
                    mode={mode}
                    isVisible={scanStep === "IDLE" || scanStep === "SCANNING"}
                    checkedIn={checkedIn}
                    totalAttendees={event.attendees.total}
                />

                {(scanStep === "IDLE" || scanStep === "SCANNING") && <EventInfo event={event} />}


                <POSScanFlow
                    scanStep={scanStep}
                    mode={mode}
                    onScan={handleScan}
                    onSignature={handleSignature}
                    scannedUser={scannedUser}
                    deviceId={DEVICE_ID}
                    errorMessage={errorMessage}
                    currentNfcUid={serialNumber || "04:A2:3C:91"}
                />
            </div>

            {/* Debug / Test Controls */}
            {scanStep === "IDLE" && (
                <button
                    onClick={triggerFailTest}
                    className="absolute bottom-4 right-4 z-50 bg-red-500/20 hover:bg-red-500/40 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full border border-red-500/30 transition-colors"
                >
                    TEST FAIL
                </button>
            )}
        </div>
    );
}
