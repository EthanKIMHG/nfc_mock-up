import { motion } from "framer-motion";
import { Code, ShieldCheck } from "lucide-react";
import type { ScanStatus } from "../types";

interface PayloadInspectorProps {
    status: ScanStatus;
    payload: any;
}

export function PayloadInspector({ status, payload }: PayloadInspectorProps) {
    if (status !== "SIGNING" && status !== "VERIFYING" && !payload) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 w-full max-w-sm bg-black/50 backdrop-blur-md rounded-xl border border-white/10 p-3 mb-20 overflow-hidden"
        >
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">
                <Code size={10} /> Payload Inspector
            </div>
            <pre className="text-[10px] font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(payload, null, 2)}
            </pre>
            {status === "VERIFYING" && (
                <div className="mt-2 text-[10px] items-center gap-2 flex text-lime-400 font-mono border-t border-white/5 pt-2">
                    <ShieldCheck size={10} /> Signature Valid
                </div>
            )}
        </motion.div>
    );
}
