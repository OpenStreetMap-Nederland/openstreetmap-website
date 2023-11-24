import Link from "next/link";
import { MapLocationContainer } from "../map/containers/map-location-container";
import { Card } from "../ui/card";
import { EventClass } from "@/types/event";

type Props = {
  event: EventClass;
};

export function EventCard({ event }: Props) {
  return (
    <Link href={`/events/${event.toHash()}`} key={event.name}>
      <Card className="p-4 grid grid-cols-3">
        <div className="flex flex-col col-span-2">
          <h1 className="text-xl font-bold tracking-tight mb-4">
            {event.name}
          </h1>
          <p>{event.date.human}</p>
          <p>{event?.location?.venue}</p>
        </div>
        {!event?.location?.venue.toLowerCase().includes("online") && (
          <div className="h-64 col-span-1">
            <MapLocationContainer location={event.location.coords} />
          </div>
        )}
      </Card>
    </Link>
  );
}
