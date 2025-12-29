import { cn } from "@/lib/utils";
import { CheckCircle2, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import type { EventData } from "../data";

interface PaymentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventData;
}

export function PaymentDrawer({ open, onOpenChange, event }: PaymentDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("stripe");

  // Parse price string to number "220,000 원" -> 220000
  const priceNumber = parseInt(event.price.replace(/[^0-9]/g, ""), 10);
  const totalPrice = priceNumber * quantity;
  const totalPriceString = totalPrice.toLocaleString() + " 원";

  const increment = () => setQuantity((q) => Math.min(q + 1, 4)); // Max 4 tickets maybe?
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 h-fit fixed bottom-0 left-0 right-0 z-50">
          <div className="p-4 bg-white rounded-t-[32px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6 px-2">
                <div className="flex gap-2">
                     <span className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full">
                        {event.tag}
                    </span>
                    <span className="px-3 py-1 bg-[#D6F32F] text-black text-[10px] font-bold rounded-full">
                        D-29
                    </span>
                </div>
                <Drawer.Close className="w-8 h-8 rounded-full bg-[#D6F32F] flex items-center justify-center">
                    <X size={16} className="text-black" />
                </Drawer.Close>
            </div>

            {/* Event Info */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black mb-1">{event.title}</h2>
                <p className="text-lg font-bold text-gray-500">{event.artist}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col items-center gap-2 mb-10">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={decrement}
                        disabled={quantity <= 1}
                        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-50"
                    >
                        <Minus size={20} />
                    </button>
                    <span className="text-4xl font-bold font-mono tracking-tighter w-8 text-center">{quantity}</span>
                    <button 
                        onClick={increment}
                        className="w-12 h-12 rounded-full bg-[#B4C5A0] flex items-center justify-center text-black"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="text-2xl font-black">{totalPriceString}</div>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <PaymentOption id="stripe" label="stripe" color="bg-black text-blue-500" selected={selectedMethod} onSelect={setSelectedMethod} />
                <PaymentOption id="visa" label="VISA" color="bg-[#B4C5A0] text-gray-600" selected={selectedMethod} onSelect={setSelectedMethod} />
                <PaymentOption id="master" label="●●" color="bg-[#B4C5A0] text-gray-600" selected={selectedMethod} onSelect={setSelectedMethod} />
                <PaymentOption id="paypal" label="PayPal" color="bg-[#B4C5A0] text-gray-600" selected={selectedMethod} onSelect={setSelectedMethod} />
                <PaymentOption id="apple" label=" Pay" color="bg-[#B4C5A0] text-gray-600" selected={selectedMethod} onSelect={setSelectedMethod} />
                <PaymentOption id="google" label="G Pay" color="bg-[#B4C5A0] text-gray-600" selected={selectedMethod} onSelect={setSelectedMethod} />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mb-6 justify-center">
                <CheckCircle2 size={16} className="text-black fill-white" />
                <span className="text-[10px] font-bold text-black">서비스 이용약관에 동의하며, 환불 규정을 확인하였습니다.</span>
            </div>

            {/* Pay Button */}
            <div className="mb-4">
               <button className="w-full h-16 bg-black text-[#D6F32F] text-2xl font-bold rounded-none flex items-center justify-center">
                   {totalPriceString} 결제하기
               </button>
            </div>

          </div>
          {/* Bottom spacer for safe area if needed */}
          <div className="h-4 bg-black"></div> 
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function PaymentOption({ id, label, color, selected, onSelect }: { id: string, label: string, color: string, selected: string, onSelect: (id: string) => void }) {
    const isSelected = selected === id;
    return (
        <button 
            onClick={() => onSelect(id)}
            className={cn(
                "h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-all border-2",
                color,
                isSelected ? "border-black scale-105 shadow-md" : "border-transparent opacity-80"
            )}
        >
            {label}
        </button>
    )
}
