import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { EventData } from "@/dashboard/data";
import { Calendar, Info, MapPin, ShieldAlert, Ticket } from "lucide-react";

interface EventInfoProps {
  event: EventData;
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-xl h-12 mt-4 transition-all">
          <Info size={16} />
          View Event Information policy
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-zinc-950/95 backdrop-blur-xl border-zinc-800 text-white max-h-[85vh]">
        <div className="mx-auto w-full max-w-md overflow-y-auto">
          <DrawerHeader className="text-left mb-2">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">EVENT</span>
                <span className="bg-lime-400/20 text-lime-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-lime-400/20">{event.status}</span>
            </div>
            <DrawerTitle className="text-3xl font-bold tracking-tight mb-1">{event.name}</DrawerTitle>
             <DrawerDescription className="text-lg text-gray-300 font-medium">{event.description}</DrawerDescription>
          </DrawerHeader>

          <div className="px-6 pb-12 space-y-8">
            
            {/* Event Meta */}
            <div className="space-y-4">
                <div className="bg-lime-300/10 border border-lime-400/20 rounded-xl p-4">
                     <div className="flex items-center gap-3 mb-1">
                        <Calendar className="text-lime-400" size={20}/>
                        <span className="font-bold text-lg font-mono">{event.date}</span>
                     </div>
                     <p className="text-xs text-gray-400 pl-8">Event ID: {event.id}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                     <div className="flex items-center gap-3 mb-1">
                        <MapPin className="text-gray-400" size={20}/>
                        <span className="font-bold text-lg">{event.location}</span>
                     </div>
                     <p className="text-xs text-gray-500 pl-8">Check venue status for updates.</p>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Ticket size={18} /> Ticket Collection
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed space-y-2 border-l-2 border-lime-400">
                        <p>Tickets can be collected at the venue ticket booth.</p>
                        <p>Please bring a valid photo ID.</p>
                        <p className="text-gray-500 text-xs">Ticket booth opens 2 hours before the event.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <ShieldAlert size={18} /> Age Policy
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed border-l-2 border-orange-400">
                        <p>This event is restricted to adults only.</p>
                        <p>Entry is permitted for guests aged 19 and over.</p>
                        <p className="text-gray-500 text-xs mt-2">Minors will not be admitted under any circumstances, even if accompanied by a guardian.</p>
                    </div>
                </div>

                <div className="space-y-2">
                     <h3 className="font-bold text-lg">Important Info</h3>
                     <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 ml-1 marker:text-lime-400">
                        <li>Age policy follows ticket provider guidelines.</li>
                        <li>ID may be required upon entry.</li>
                        <li>Filming and photography subject to venue rules.</li>
                        <li>By completing your purchase, you agree to all policies listed above.</li>
                     </ul>
                </div>
            </div>

          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
