import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { EventData } from "@/dashboard/data";
import { Calendar, Info, MapPin, ShieldAlert, Ticket } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface EventInfoProps {
  event: EventData;
}

export function EventInfo({ event }: EventInfoProps) {
  const { t } = useLanguage();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-xl h-12 mt-4 transition-all">
          <Info size={16} />
          {t('dashboard.view_policy')}
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
                        <Ticket size={18} /> {t('policy.ticket_collection')}
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed space-y-2 border-l-2 border-lime-400">
                        <p>{t('policy.ticket_collection_desc')}</p>
                        <p>{t('policy.bring_id')}</p>
                        <p className="text-gray-500 text-xs">{t('policy.booth_open')}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <ShieldAlert size={18} /> {t('policy.age_policy')}
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed border-l-2 border-orange-400">
                        <p>{t('policy.adults_only')}</p>
                        <p>{t('policy.min_age')}</p>
                        <p className="text-gray-500 text-xs mt-2">{t('policy.no_minors')}</p>
                    </div>
                </div>

                <div className="space-y-2">
                     <h3 className="font-bold text-lg">{t('policy.important_info')}</h3>
                     <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 ml-1 marker:text-lime-400">
                        <li>{t('policy.info_1')}</li>
                        <li>{t('policy.info_2')}</li>
                        <li>{t('policy.info_3')}</li>
                        <li>{t('policy.info_4')}</li>
                     </ul>
                </div>
            </div>

          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
