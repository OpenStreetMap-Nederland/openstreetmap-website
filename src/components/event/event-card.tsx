import Link from "next/link";
import { Card } from "../ui/card";
import { EventClass } from "@/types/event";
import { WindowContainer } from "../map/containers/window-conatiner";

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
            <WindowContainer location={event.location.coords} />
          </div>
        )}
      </Card>
    </Link>
  );
}
