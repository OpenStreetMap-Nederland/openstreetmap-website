import { notFound } from "next/navigation";
import { TitledPage } from "@/components/layouts/titled-page";
import { EventClass } from "@/types/event";
import { ExternalButton } from "@/components/external-button";
import { Event } from "@/types/event";
import { WindowContainer } from "@/components/map/containers/window-conatiner";

const getFutureEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events?in=nl", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

const getPastEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events/past?in=nl", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

type Props = {
  params: { slug: string[] };
};

export default async function EventDetailPage({ params }: Props) {
  if (!params) return notFound();

  const id = params?.slug?.[1];
  if (!id) return notFound();

  const pastEvents: Event[] = await getPastEvents();
  const futureEvents: Event[] = await getFutureEvents();
  const events: Event[] = [...pastEvents, ...futureEvents];
  const eventClasses: EventClass[] = events.map(
    (event) => new EventClass(event)
  );

  const event = eventClasses.find((event) => event.id === id);

  if (!event) return notFound();

  return (
    <TitledPage
      title={event.name}
      subTitle={event.location?.short}
      backLink={"/events"}
      actions={<ExternalButton href={event.url}>OSMcal</ExternalButton>}
    >
      <div className="flex flex-col gap-4">
        <p>{event.date.human}</p>
      </div>
      {!event?.location?.venue.toLowerCase().includes("online") && (
        <div className="h-64 col-span-1 rounded overflow-hidden">
          <WindowContainer location={event.location.coords} />
        </div>
      )}
    </TitledPage>
  );
}
