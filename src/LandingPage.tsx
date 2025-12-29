import { ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#D6F32F]/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#A3C7D6]/20 rounded-full blur-[100px]" />

      <div className="z-10 w-full max-w-sm flex flex-col gap-12">
        {/* Branding */}
        <div className="text-center">
            <h1 className="text-[48px] font-black tracking-tighter text-[#A3C7D6] mb-2 leading-none">
            linkplay
            </h1>
            <p className="text-sm text-gray-400 tracking-widest font-medium uppercase opacity-60">
            TAP. GO. LIVE.
            </p>
        </div>

        {/* Navigation Cards */}
        <div className="flex flex-col gap-5">
            {/* Ticket Holder Card */}
            <Link to="/holder" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D6F32F] to-[#9ABA84] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:bg-[#222] transition-colors group-hover:border-[#D6F32F]/50">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#D6F32F] flex items-center justify-center text-black">
                            <Ticket size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white group-hover:text-[#D6F32F] transition-colors">Ticket Holder</span>
                            <span className="text-[11px] text-gray-500 font-medium">유저용 티켓 예매 및 확인</span>
                        </div>
                    </div>
                    <ArrowRight size={20} className="text-gray-600 group-hover:text-[#D6F32F] group-hover:translate-x-1 transition-all" />
                </div>
            </Link>

            {/* Admin Card */}
            <Link to="/admin" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A3C7D6] to-[#7A98A6] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:bg-[#222] transition-colors group-hover:border-[#A3C7D6]/50">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#A3C7D6] flex items-center justify-center text-black">
                            <ShieldCheck size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white group-hover:text-[#A3C7D6] transition-colors">Administrator</span>
                            <span className="text-[11px] text-gray-500 font-medium">관리자용 대시보드 및 스캔</span>
                        </div>
                    </div>
                    <ArrowRight size={20} className="text-gray-600 group-hover:text-[#A3C7D6] group-hover:translate-x-1 transition-all" />
                </div>
            </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-10">
            <p className="text-[10px] text-gray-600 font-medium">
                © 2025 LINKPLAY Inc. All rights reserved.<br/>
                Design Draft Interface v1.0
            </p>
        </div>
      </div>
    </div>
  );
}
