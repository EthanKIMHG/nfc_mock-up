import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 h-[60px] bg-black text-white relative z-50">
      <div className="flex flex-col leading-none">
        <h1 className="text-[40px] font-bold tracking-tighter text-[#A3C7D6]">
          linkplay
        </h1>
        <span className="text-xs text-gray-400 tracking-wider">
          TAP. GO. LIVE.
        </span>
      </div>
      <button className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors">
        <Menu size={24} />
      </button>
    </header>
  );
}
