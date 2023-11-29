import { notFound } from "next/navigation";
import { TitledPage } from "@/components/layouts/titled-page";
import { EventClass, EventDetail } from "@/types/event";
import { ExternalButton } from "@/components/external-button";
import { Event } from "@/types/event";
import { WindowContainer } from "@/components/map/containers/window-conatiner";
import { env } from "process";
import Link from "next/link";
import Markdown from "react-markdown";
import { Metadata } from "next";
import { eclipse, toInternalLinks } from "@/lib/utils";
import { MarkdownWrapper } from "@/components/markdown-wrapper";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params) return notFound();

  const id = params?.slug?.[1];
  if (!id) return notFound();

  const eventDetail = await getEventDetail(id);

  if (!eventDetail) return notFound();

  let keywords = eventDetail.name.split(" ");
  let keyword = `${keywords[0]} ${keywords[1]}`;

  return {
    title: eclipse(eventDetail.name, 50) + " OpenStreetMap event",
    description: eclipse(eventDetail.description, 200),
    keywords: ["OpenStreetMap", "Event", keyword, "OSM"],
  };
}

export async function generateStaticParams() {
  const events = await getAllEvents();

  const eventClasses: EventClass[] = events.map(
    (event) => new EventClass(event)
  );

  const params = eventClasses.map((event) => {
    return {
      slug: [event.toHash(), event.id],
    };
  });

  return params;
}

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

const getAllEvents = async () => {
  const futureEvents: Event[] = await getFutureEvents();
  const pastEvents: Event[] = await getPastEvents();
  const events: Event[] = [...pastEvents, ...futureEvents];

  return events;
};

type Props = {
  params: { slug: string[] };
};

const getEventDetail = async (id: string) => {
  if (!id) return null;

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/event/${id}`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return notFound();
  }

  const eventDetail: EventDetail = await response.json();

  return eventDetail;
};

export default async function EventDetailPage({ params }: Props) {
  if (!params) return notFound();

  const id = params?.slug?.[1];
  if (!id) return notFound();

  const eventDetail = await getEventDetail(id);
  if (!eventDetail) return notFound();

  const events: Event[] = await getAllEvents();
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
      actions={
        eventDetail.website && (
          <ExternalButton href={eventDetail.website}>
            Event website
          </ExternalButton>
        )
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-full w-full col-span-1">
          <div className="flex flex-col gap-6">
            <p>
              <strong>{event.date.human}</strong>
            </p>

            <MarkdownWrapper>{eventDetail.description}</MarkdownWrapper>

            <p>
              <strong>Created by: </strong>
              <Link href={`/mapper/${eventDetail.creator}`}>
                {eventDetail.creator}
              </Link>
            </p>

            {eventDetail.attendees.length > 0 && (
              <p>
                <strong>Attendees: </strong>{" "}
                {eventDetail.attendees.map((attendee, i) => (
                  <span key={attendee}>
                    <Link href={`/mapper/${attendee}`}>{attendee}</Link>
                    {i < eventDetail.attendees.length - 2 && ", "}
                    {i === eventDetail.attendees.length - 2 && ", and "}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-lg overflow-hidden col-span-1 h-[32rem]">
          {!event?.location?.venue.toLowerCase().includes("online") && (
            <WindowContainer location={event.location.coords} />
          )}
        </div>
      </div>
    </TitledPage>
  );
}
