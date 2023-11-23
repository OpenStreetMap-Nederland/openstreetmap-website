import { notFound } from "next/navigation";
import { getFutureEvents, getPastEvents } from "../page";
import { TitledPage } from "@/components/layouts/titled-page";
import { EventClass } from "@/types/event";
import { ExternalButton } from "@/components/external-button";
import { Event } from "@/types/event";

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
    </TitledPage>
  );
}
