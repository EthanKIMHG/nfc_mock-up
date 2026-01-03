import { EVENTS } from "@/dashboard/data";
import { useState, useRef } from "react";
import { useNFC } from "@/hooks/useNFC";
import { useLanguage } from "../../context/LanguageContext";
import { EventInfo } from "./EventInfo";
import { POSHeader } from "./pos/POSHeader";
import { POSModeSwitcher, type POSMode } from "./pos/POSModeSwitcher";
import { POSScanFlow, type ScanStep } from "./pos/POSScanFlow";
import { POSStatusCard } from "./pos/POSStatusCard";
import { detectChipType, type ChipType } from "@/utils/nfcUtils";

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
    const [detectedType, setDetectedType] = useState<ChipType | null>(null);

    const [pendingTransaction, setPendingTransaction] = useState<{ item: string, price: string } | null>(null);

    // Simulated Data
    const DEVICE_ID = "DEV-POS-082";

    const { startScan, stopScan, serialNumber, isSupported, ndefRef } = useNFC();
    const isValidatingRef = useRef(false);

    const handleScan = async () => {
        if (scanStep !== "IDLE") return;
        setScanStep("SCANNING");
        isValidatingRef.current = false; // Reset lock

        if (isSupported) {
            await startScan({
                onReading: async (uid) => {
                    // Prevent multiple re-entries while verifying
                    if (isValidatingRef.current) return;
                    isValidatingRef.current = true;

                    // Start Validation
                    setScanStep("VERIFYING");

                    if (ndefRef.current) {
                        try {
                            // Add a timeout to prevent infinite hanging
                            const detectionPromise = detectChipType(uid, ndefRef.current);
                            const timeoutPromise = new Promise<ChipType>((_, reject) =>
                                setTimeout(() => reject(new Error("Detection Timeout")), 12000)
                            );

                            const type = await Promise.race([detectionPromise, timeoutPromise]);

                            setDetectedType(type);

                            if (type === 'TYPE_INVALID') {
                                stopScan();
                                setScanStep("ERROR");
                                setErrorMessage("Invalid Chip (4-byte UID)");
                                setTimeout(() => {
                                    setScanStep("IDLE");
                                    setErrorMessage(undefined);
                                }, 3000);
                            } else if (type === 'TYPE_UNKNOWN') {
                                stopScan();
                                setScanStep("ERROR");
                                setErrorMessage("Unknown Chip Error");
                                setTimeout(() => {
                                    setScanStep("IDLE");
                                    setErrorMessage(undefined);
                                }, 3000);
                            }
                            // Success cases
                            else {
                                stopScan();
                                // Calculate Pending Transaction HERE
                                if (mode === 'PAYMENT') {
                                    let item = "Unknown Item";
                                    let price = "0 KRW";
                                    if (type === 'TYPE_ULTRALIGHT') { item = "Mineral Water"; price = "3,000 KRW"; }
                                    else if (type === 'TYPE_NTAG213') { item = "Craft Beer (IPA)"; price = "8,000 KRW"; }
                                    else if (type === 'TYPE_NTAG215') { item = "Limited T-Shirt"; price = "35,000 KRW"; }
                                    setPendingTransaction({ item, price });
                                } else {
                                    setPendingTransaction(null);
                                }
                                setScanStep("SIGNING");
                            }

                        } catch (err: any) {
                            stopScan();
                            setScanStep("ERROR");
                            console.warn("Validation Error:", err);
                            setErrorMessage(err.message || "Validation Error");
                            setTimeout(() => {
                                setScanStep("IDLE");
                                setErrorMessage(undefined);
                            }, 3000);
                        } finally {
                            isValidatingRef.current = false;
                        }
                    } else {
                        isValidatingRef.current = false;
                        stopScan();
                        setScanStep("ERROR");
                        setErrorMessage("NFC Reader not ready");
                        setTimeout(() => {
                            setScanStep("IDLE");
                            setErrorMessage(undefined);
                        }, 3000);
                    }
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
            setTimeout(() => {
                const simulatedType = 'TYPE_NTAG215';
                setDetectedType(simulatedType);

                // Simulate Payment Calc
                if (mode === 'PAYMENT') {
                    setPendingTransaction({ item: "Limited T-Shirt", price: "35,000 KRW" });
                } else {
                    setPendingTransaction(null);
                }

                setScanStep("SIGNING");
            }, 3000);
        }
    };

    const handleSignature = () => {
        setScanStep("VERIFYING");
        const currentNfcUid = serialNumber || "04:A2:3C:91";

        let displayTitle = "Unknown User";
        let displaySubtitle = "UNKNOWN TYPE";

        if (mode === 'ENTRANCE') {
            displayTitle = "Kim Min-soo";
            if (detectedType === 'TYPE_ULTRALIGHT') displaySubtitle = "BASIC TICKET";
            else if (detectedType === 'TYPE_NTAG213') displaySubtitle = "VIP TICKET";
            else if (detectedType === 'TYPE_NTAG215') displaySubtitle = "VVIP TICKET";
            else displaySubtitle = "VIP ACCESS";
        } else {
            if (pendingTransaction) {
                displayTitle = pendingTransaction.item;
                displaySubtitle = pendingTransaction.price;
            }
        }

        const payload = {
            nfc_uid: currentNfcUid,
            device_id: DEVICE_ID,
            timestamp: new Date().toISOString(),
            signature: "admin_signed_hash",
            chip_type: detectedType,
            mode: mode,
            item: displayTitle
        };
        console.log("Submitting Payload to Server:", payload);

        // Simulate Server Validation Delay
        setTimeout(() => {
            const success = !shouldFailNext;

            if (success) {
                setScanStep("SUCCESS");
                if (mode === "ENTRANCE") setCheckedIn(prev => prev + 1);
                setScannedUser({
                    name: displayTitle,
                    type: displaySubtitle,
                    nfcUid: currentNfcUid
                });
                setTimeout(() => {
                    setScanStep("IDLE");
                    setScannedUser(null);
                    setDetectedType(null);
                    setPendingTransaction(null);
                    stopScan();
                }, 2500);
            } else {
                setScanStep("ERROR");
                setPendingTransaction(null);
                setTimeout(() => {
                    setScanStep("IDLE");
                    setShouldFailNext(false);
                    setDetectedType(null);
                    stopScan();
                }, 2500);
            }
        }, 1500);
    };

    const triggerFailTest = () => {
        if (scanStep !== "IDLE") return;
        setScanStep("SCANNING");
        // Simulate Invalid Chip
        setTimeout(() => {
            setScanStep("ERROR");
            setErrorMessage("Invalid Chip (4-byte UID)");
            setTimeout(() => {
                setScanStep("IDLE");
                setErrorMessage(undefined);
            }, 3000);
        }, 1500);
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
                    pendingTransaction={pendingTransaction}
                />
            </div>

        </div>
    );
}
