import { useState, useCallback, useRef, useSyncExternalStore } from 'react';

export interface NFCState {
    isScanning: boolean;
    error: string | null;
    serialNumber: string | null;
    isSupported: boolean;
}

export function useNFC() {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [serialNumber, setSerialNumber] = useState<string | null>(null);

    const isSupported = useSyncExternalStore(
        () => () => { }, // Subscribe
        () => typeof window !== 'undefined' && 'NDEFReader' in window, // Client snapshot
        () => false // Server snapshot
    );

    const ndefRef = useRef<any>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const startScan = useCallback(async (callbacks?: {
        onReading?: (uid: string) => void;
        onError?: (error: string) => void;
    }) => {
        if (!('NDEFReader' in window)) {
            const msg = "Web NFC is not supported on this device.";
            setError(msg);
            callbacks?.onError?.(msg);
            return;
        }

        try {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const ndef = new (window as any).NDEFReader();
            ndefRef.current = ndef;

            await ndef.scan({ signal: controller.signal });

            setIsScanning(true);
            setError(null);
            setSerialNumber(null);

            ndef.onreading = (event: any) => {
                const { serialNumber: uid } = event;
                console.log("NFC Tag detected:", uid);
                setSerialNumber(uid);
                callbacks?.onReading?.(uid);
            };

            ndef.onreadingerror = (error: any) => {
                console.error("NFC Reading Error:", error);
                const msg = "Error reading NFC tag. Please try again.";
                setError(msg);
                callbacks?.onError?.(msg);
            };

        } catch (err: any) {
            console.error("Error starting NFC scan:", err);
            const msg = err.message || "Failed to start NFC scan.";
            setError(msg);
            setIsScanning(false);
            callbacks?.onError?.(msg);
        }
    }, []);

    const stopScan = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setIsScanning(false);
    }, []);

    return {
        startScan,
        stopScan,
        isScanning,
        error,
        serialNumber,
        isSupported,
        ndefRef
    };
}
