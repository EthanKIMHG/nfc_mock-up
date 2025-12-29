import { MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export function MainCarousel() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden mt-2">
      <div className="flex items-center justify-center h-full relative">
        {/* Left Image (Partial) */}
        <div className="absolute left-[-15%] w-[60%] h-[80%] rounded-2xl overflow-hidden opacity-50 scale-90 z-0">
          <img
            src="/images/GDleft.png"
            alt="Previous Event"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Image (Main) */}
        <Link to="/holder/event/gd" className="relative w-[75%] h-[95%] z-20 rounded-[32px] overflow-hidden shadow-2xl border border-white/10 block group cursor-pointer">
          <img
            src="/images/GD.png"
            alt="Main Event"
            className="w-full h-full object-cover"
          />
          
          {/* Top Badges */}
          <div className="absolute top-5 left-5 flex gap-2">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
              K-POP
            </span>
            <span className="px-3 py-1 bg-[#D6F32F]/90 backdrop-blur-md rounded-full text-black text-xs font-bold">
              D-29
            </span>
          </div>

          <div className="absolute top-5 right-5">
             <div className="w-8 h-8 rounded-full bg-pink-400/80 backdrop-blur-md flex items-center justify-center">
                <span className="text-white text-[10px]">♥</span>
             </div>
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20">
            {/* Cutout Effect SVG (Simulated visually with the shape above if needed, but here using CSS/Overlay for content) */}
            <div className="bg-[#E4DCCF]/90 backdrop-blur-md rounded-[24px] p-5 text-black relative">
                 {/* Notch decoration */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-transparent rounded-full shadow-[0_10px_0_0_rgb(228,220,207)]"></div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>

                <h2 className="text-2xl font-bold leading-tight">위버멘쉬:Ubermensch</h2>
                <p className="text-sm font-semibold opacity-70 mb-3">지드래곤</p>
                
                <div className="space-y-1 text-xs font-medium opacity-80">
                    <div className="flex items-center gap-2">
                        <Ticket size={12} className="opacity-70" />
                        <span>220,000 원</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 flex items-center justify-center opacity-70">📅</span>
                        <span>2026.01.04 · 20:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={12} className="opacity-70" />
                        <span>고양종합운동장</span>
                    </div>
                </div>
            </div>
          </div>
        </Link>

        {/* Right Image (Partial) */}
        <div className="absolute right-[-15%] w-[60%] h-[80%] rounded-2xl overflow-hidden opacity-50 scale-90 z-0">
          <img
            src="/images/GDRight.jpg"
            alt="Next Event"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
