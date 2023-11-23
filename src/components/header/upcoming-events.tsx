import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import Link from "next/link";

const getFutureEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events?in=nl", {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
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
      <Badge className="bg-green-600 dark:bg-green-400  pr-1">
        <div className="m-0.5 mr-2 text-white dark:text-black">
          {event.name}
        </div>
        {events.length > 1 && (
          <Badge className="px-1 h-[16px] text-[10px]">
            +{events.length - 1}
          </Badge>
        )}
      </Badge>
    </Link>
  ) : null;
}
