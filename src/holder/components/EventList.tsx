import { MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { EVENTS } from "../data";

export function EventList() {
  // Filter out the main event (GD) to show the others
  const listEvents = EVENTS.filter((e) => e.id !== "gd");

  return (
    <div className="px-5 pb-10 space-y-6">
      {listEvents.map((event) => (
        <Link
          key={event.id}
          to={`/holder/event/${event.id}`}
          className="relative block w-full aspect-[2/1.1] rounded-[24px] overflow-hidden group"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Tag */}
          <div className="absolute top-4 left-4">
             <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold border border-white/10 uppercase">
              {event.tag}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-2xl font-bold mb-0.5 leading-tight text-white/90">
                {event.title}
            </h3>
            <p className="text-xs text-gray-400 mb-3">{event.artist}</p>

            <div className="space-y-1 text-[11px] font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <Ticket size={11} className="text-gray-400" />
                <span>{event.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 flex items-center justify-center">📅</span>
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={11} className="text-gray-400" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
