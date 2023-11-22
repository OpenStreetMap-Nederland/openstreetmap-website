import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import Link from "next/link";

const getFutureEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events?in=nl", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return [];
  }

  const data = await response.json();

  return data;
};

export async function UpcomingEvents() {
  const events: Event[] = await getFutureEvents();
  const event: Event = events[0];

  return event ? (
    <Link href="/events">
      <Badge className="bg-green-500 text-white pr-1">
        <div className="m-1 mr-2.5">{event.name}</div>
        {events.length > 1 && (
          <Badge className="px-1">+{events.length - 1}</Badge>
        )}
      </Badge>
    </Link>
  ) : null;
}
