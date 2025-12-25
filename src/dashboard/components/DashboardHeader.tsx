import { Search } from "lucide-react";

export function DashboardHeader() {
    return (
        <header className="h-[60px] w-full flex items-center justify-between px-6 bg-transparent z-0">
            {/* Logo Area */}
            <div className="flex items-center gap-2">
                <span className="text-md font-bold text-white tracking-tight">NFC Admin +</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                    <span className="text-sm">Event Search</span>
                    <Search size={14} />
                </div>

                <button className="text-sm text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg">
                    Login
                </button>
            </div>
        </header>
    );
}
