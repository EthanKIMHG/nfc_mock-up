export type ChipType = 'TYPE_INVALID' | 'TYPE_NTAG213' | 'TYPE_NTAG215' | 'TYPE_ULTRALIGHT' | 'TYPE_UNKNOWN';

const writeWithTimeout = async (ndef: any, message: any, timeoutMs: number = 2000) => {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("WriteTimeout")), timeoutMs);
    });
    return Promise.race([
        ndef.write(message),
        timeoutPromise
    ]);
};

export const detectChipType = async (serialNumber: string, ndef: any): Promise<ChipType> => {
    // 1. UID Length Check
    const cleanUid = serialNumber.replace(/:/g, '');
    const byteLength = cleanUid.length / 2;

    if (byteLength === 4) return 'TYPE_INVALID';
    if (byteLength !== 7) return 'TYPE_INVALID'; // Fallback

    // 2. Capacity Check (for 7-byte UIDs)
    try {
        console.log(`Starting capacity check for UID: ${serialNumber}`);

        // Create dummy data
        const textSmall = "A".repeat(60);   // ~60-70 bytes (Exceeds Ultralight 48 bytes)
        const textMedium = "B".repeat(160); // ~170-180 bytes (Exceeds NTAG213 144 bytes)

        // Step 1: Try writing 60 bytes (Check if Ultralight)
        // Retry logic: connection might be unstable. Ultralight will fail consistently.
        let step1Success = false;
        let lastError: any = null;

        for (let i = 0; i < 3; i++) {
            try {
                console.log(`Step 1 (Attempt ${i + 1}/3): Writing 60 bytes...`);
                await writeWithTimeout(ndef, {
                    records: [{ recordType: "text", data: textSmall }]
                }, 2500);
                console.log("Write 60 bytes success.");
                step1Success = true;
                break; // Exit loop on success
            } catch (error: any) {
                console.warn(`Step 1 (Attempt ${i + 1}/3) failed:`, error);
                lastError = error;
                // Add explicit delay between retries
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        if (!step1Success) {
            // All retries failed. Analyze the last error.
            const errName = lastError?.name || "";
            const errMsg = (lastError?.message || "").toLowerCase();

            if (
                errName === "QuotaExceededError" ||
                errMsg.includes("quota") ||
                errName === "NetworkError" ||
                errMsg.includes("io error") ||
                errMsg.includes("writetimeout")
            ) {
                // If it failed 3 times consistently, it's likely actually Ultralight (Capacity Full)
                return 'TYPE_ULTRALIGHT';
            }
            if (errName === "NotAllowedError") {
                throw new Error("Tag is locked or write permission denied.");
            }
            throw lastError;
        }

        // Add a small delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Step 2: Try writing 160 bytes (Check if NTAG 213 or 215)
        try {
            console.log("Attempting to write 160 bytes...");
            await writeWithTimeout(ndef, {
                records: [{ recordType: "text", data: textMedium }]
            }, 3000); // 3s Timeout for Step 2
            console.log("Write 160 bytes success.");
            return 'TYPE_NTAG215'; // NTAG 215 (504 bytes)
        } catch (error: any) {
            console.warn("Write 160 bytes failed:", error);
            const errName = error.name || "";
            const errMsg = (error.message || "").toLowerCase();

            // Check for Quota Limit, IO Error, or Timeout
            if (
                errName === "QuotaExceededError" ||
                errMsg.includes("quota") ||
                errName === "NetworkError" ||
                errMsg.includes("io error") ||
                errMsg.includes("writetimeout") // Timeout on large write -> Likely NTAG 213
            ) {
                console.log("Step 2 failed/timed-out. Assuming NTAG 213.");
                return 'TYPE_NTAG213'; // NTAG 213 (144 bytes)
            }

            if (errName === "NotAllowedError") {
                throw new Error("Tag write permission denied.");
            }
            throw error;
        }

    } catch (error: any) {
        console.error("Chip detection failed:", error);
        throw error;
    }
};
