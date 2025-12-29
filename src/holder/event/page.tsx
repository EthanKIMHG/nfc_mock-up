import { ArrowLeft, Copy, Info, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentDrawer } from "../components/PaymentDrawer";
import { getEventById } from "../data";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = getEventById(id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!event) {
    return <div className="text-white text-center pt-20">Event not found</div>;
  }

  // Determine text color based on background (assuming dark image, light text overlay)
  // For the content section, we use the theme color.
  
  return (
    <div className="min-h-screen bg-black relative pb-24">
      {/* Top Image Section */}
      <div className="relative w-full h-[360px]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 z-10"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div 
        className="relative -mt-6 rounded-t-[32px] px-6 pt-10 pb-10 min-h-[500px]"
        style={{ backgroundColor: event.themeColor }}
      >
        {/* Header Badges */}
        <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full">
            {event.tag}
            </span>
            <span className="px-3 py-1 bg-white/50 text-black text-[10px] font-bold rounded-full backdrop-blur-sm">
            D-29
            </span>
        </div>

        {/* Title & Artist */}
        <h1 className="text-[28px] font-extrabold text-black leading-tight mb-1">
            {event.title}
        </h1>
        <p className="text-[16px] font-bold text-black/70 mb-6">{event.artist}</p>

        {/* Description */}
        <p 
            className="text-[12px] font-medium text-black/80 leading-relaxed mb-8 whitespace-pre-wrap"
            style={{ whiteSpace: "pre-wrap" }}
        >
            {event.description}
        </p>

        {/* Info Cards */}
        <div className="space-y-6">
            {/* Price */}
            <div>
                 <div className="bg-black/10 backdrop-blur-sm rounded-xl px-4 py-3 w-fit mb-2 flex items-center gap-2">
                    <Ticket size={18} className="text-black" />
                    <span className="text-[18px] font-black text-black">{event.price}</span>
                 </div>
                 <p className="text-[11px] text-black/60 font-medium pl-1">
                    티켓은 선착순으로 판매되며,<br/>
                    한정 수량으로 1인당 최대 2매까지 구매할 수 있습니다.
                 </p>
            </div>

             {/* Date */}
            <div>
                 <div className="bg-black/10 backdrop-blur-sm rounded-xl px-4 py-3 w-fit mb-2 flex items-center gap-2">
                    <span className="text-[18px] font-black text-black">📅 {event.date}</span>
                 </div>
                 <p className="text-[11px] text-black/60 font-medium pl-1">
                    공연은 오후 8시에 정시에 시작됩니다.<br/>
                    현장 상황에 따라 지각 입장이 제한될 수 있습니다.
                 </p>
            </div>

            {/* Location */}
            <div>
                 <div className="bg-black/10 backdrop-blur-sm rounded-xl px-4 py-3 w-fit mb-2 flex items-center gap-2">
                    <MapPin size={18} className="text-black" />
                    <span className="text-[18px] font-black text-black">{getRawLocation(event.location)}</span>
                 </div>
                 <div className="flex items-center gap-1 pl-1 mb-4">
                    <span className="text-[11px] text-black/60 font-medium">경기도 고양시 일산서구 덕이동 83-1</span>
                    <Copy size={11} className="text-black/40" />
                 </div>
                 
                 {/* Placeholder Map */}
                 <div className="w-full h-[180px] bg-[#E5E5E5] rounded-xl overflow-hidden relative border-2 border-white/50">
                     <iframe 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        loading="lazy" 
                        allowFullScreen 
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1580.898822003893!2d126.7374780824888!3d37.67666299108929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8582772592d7%3A0xc3485ab980312681!2z6rOg7JaR7K2i7ZWp7Jq064-Z7J6l!5e0!3m2!1sko!2skr!4v1703666000000!5m2!1sko!2skr">
                    </iframe>
                 </div>
            </div>
        </div>

        <hr className="border-black/10 my-8" />

        {/* Bottom Info Section */}
        <div className="space-y-6 pb-20">
            <InfoSection 
                title="티켓 수령 안내" 
                content={`티켓은 공연장 내 매표소에서 수령하실 수 있습니다.
유효한 신분증을 반드시 지참해 주세요.
매표소는 공연 시작 2시간 전부터 운영됩니다.`} 
            />
            <InfoSection 
                title="연령 제한" 
                content={`본 공연은 성인 전용 행사입니다.
만 19세 이상만 입장이 가능하며, 보호자 동반 여부와 관계없이 미성년자는 어떠한 경우에도 입장할 수 없습니다.`} 
            />
            <InfoSection 
                title="취소 및 환불 규정" 
                content={`공연일 7일 전까지 취소가 가능합니다.
취소 시 취소 수수료 10%가 부과됩니다.
공연일 7일 이내에는 취소, 환불, 변경이 불가합니다.
티켓 발권 후에는 어떠한 경우에도 환불이 불가합니다.`} 
            />
            
            <div className="pt-2">
                 <h4 className="font-bold text-[13px] text-black mb-2 flex items-center gap-1">
                    <Info size={14} /> 고객 지원
                 </h4>
                 <div className="text-[11px] text-black/70 font-medium leading-relaxed">
                    Email: support@ticketplatform.com<br/>
                    Phone: +82-10-231-9920<br/>
                    운영 시간: 월-금 10:00-18:00 (KST)
                 </div>
            </div>
             
             <div className="pt-4">
                 <h4 className="font-bold text-[13px] text-black mb-1 flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-serif">!</span> 유의사항
                 </h4>
                 <p className="text-[10px] text-black/60 leading-relaxed">
                    연령 제한은 티켓 판매처의 기준을 따릅니다.<br/>
                    입장 시 신분증 확인이 요구될 수 있습니다.<br/>
                    촬영 및 사진 촬영은 공연장 규정에 따릅니다.<br/>
                    구매를 완료하는 즉시, 상기 모든 정책에 동의한 것으로 간주됩니다.
                 </p>
             </div>
        </div>
      </div>

      {/* Sticky Bottom Bar with Strap Design */}
      <div className="fixed bottom-0 left-0 right-0 p-5 z-50 flex justify-center pb-8 pointer-events-none">
        {/* Pointer events auto on children to allow interaction while letting clicks pass through the container areas if needed */}
        <div className="flex items-center pointer-events-auto filter drop-shadow-xl">
            {/* Spotify Button */}
            <button className="w-16 h-14 rounded-3xl bg-[#1DB954] flex items-center justify-center text-black border-[5px] border-black z-10 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.758-8.78-1.006-.328.08-.663-.122-.736-.453-.06-.33.16-.653.5-.722 3.84-.79 7.155-.422 9.873 1.116.315.18.406.565.2.86zm1.226-2.72c-.226.37-.7.49-1.07.264-2.69-1.65-6.79-2.126-9.967-1.162-.412.126-.85-.11-.976-.522-.125-.413.11-.848.525-.973 3.66-1.077 8.24-.555 11.378 1.373.37.227.49.697.264 1.07-.054-.055-.07.054-.154.054zm.105-2.836c-3.226-1.916-8.55-2.092-11.63-1.15-.497.155-1.026-.118-1.18-.614-.153-.496.118-1.025.615-1.18 3.597-1.09 9.5-.88 13.23 1.334.456.27.606.862.336 1.317-.27.456-.86.608-1.317.338z"/></svg>
            </button>

            {/* Connector */}
            <div className="w-3 h-4 bg-black -mx-1 z-0 relative" />

            {/* Share/Like Pill */}
            <div className="h-14 bg-black rounded-2xl flex items-center px-4 border-[5px] border-black z-10 shrink-0">
                <div className="text-sm font-medium text-gray-300 flex items-center gap-2 font-mono">
                    share <span className="text-white/20">|</span> <span className="text-pink-500">♥</span> <span className="text-pink-400">like</span>
                </div>
            </div>

            {/* Connector */}
            <div className="w-3 h-4 bg-black -mx-1 z-0 relative" />

            {/* Ticket Button */}
            <button 
                onClick={() => setIsDrawerOpen(true)}
                className="h-14 px-8 bg-gradient-to-r from-[#D6F32F] to-[#9ABA84] rounded-2xl flex items-center justify-center font-bold text-black text-lg border-[5px] border-black z-10 hover:brightness-110 transition-all shrink-0"
            >
                티켓 예매
            </button>
        </div>
      </div>

      <PaymentDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        event={event} 
      />
    </div>
  );
}

function InfoSection({ title, content }: { title: string; content: string }) {
    return (
        <div>
             <h4 className="font-bold text-[13px] text-black mb-1">{title}</h4>
             <p 
                className="text-[12px] text-black/70 font-medium leading-relaxed whitespace-pre-wrap"
                style={{ whiteSpace: "pre-wrap" }}
             >
                {content}
             </p>
        </div>
    )
}

function getRawLocation(loc: string) {
    // Simple helper to remove address detail if needed, or just return as is
    return loc;
}
