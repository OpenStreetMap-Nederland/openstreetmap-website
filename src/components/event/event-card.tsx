import Link from "next/link";
import { Card } from "../ui/card";
import { EventClass } from "@/types/event";
import { WindowContainer } from "../map/containers/window-conatiner";

type Props = {
  event: EventClass;
};

export function EventCard({ event }: Props) {
  return (
    <Link href={`/events/${event.toHash()}`}>
      <Card className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col col-span-1 lg:col-span-2">
          <h1 className="text-xl font-bold tracking-tight mb-4">
            {event.name}
          </h1>
          <p>{event.date.human}</p>
          <p>{event?.location?.venue}</p>
        </div>
        {!event?.location?.venue.toLowerCase().includes("online") && (
          <div className="h-64 col-span-1 rounded overflow-hidden">
            <WindowContainer location={event.location.coords} />
          </div>
        )}
      </Card>
    </Link>
  );
}
