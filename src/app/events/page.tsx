import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ExternalButton } from "@/components/external-button";
import { Card } from "@/components/ui/card";
import { EventClass, Event } from "@/types/event";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenStreetMap Events",
  description: "Zie hier de evenementen van OpenStreetMap Nederland.",
};

const locations: any[] = [];

const addLocations = (events: Event[]) => {
  events.forEach((event: Event) => {
    if (event?.location?.short) {
      let splitLocation = event.location.short.split(",");
      let country = splitLocation[splitLocation.length - 1].trim();
      if (!locations.includes(country)) {
        locations.push(country);
      }
    }
  });
};

const getFutureEvents = async () => {
  const response = await fetch("https://osmcal.org/api/v2/events?in=nl", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  addLocations(data);

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
  addLocations(data);

  return data;
};

export default async function Blog() {
  const futureEvents: Event[] = await getFutureEvents();
  const pastEvents: Event[] = await getPastEvents();

  return (
    <TitledPage
      title="Events"
      titlePostfix="OSMcal"
      subTitle="The upcoming and past events of OpenStreetMap Netherlands"
      actions={
        <ExternalButton href="https://osmcal.org/event/add/">
          Add event
        </ExternalButton>
      }
    >
      <h3 className="text-2xl font-bold tracking-tight mb-4">
        Upcoming events
      </h3>
      {futureEvents.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        futureEvents.map((event) => {
          const eventClass: EventClass = new EventClass(event);

          return (
            <Link href={`/events/${eventClass.toHash()}`} key={event.name}>
              <Card className="flex flex-col p-4">
                <h1>{event.name}</h1>
                <p>{event.date.human}</p>
                <p>{event?.location?.venue}</p>
              </Card>
            </Link>
          );
        })
      )}

      <h3 className="text-2xl font-bold tracking-tight mb-4">Past events</h3>
      <div className="flex flex-col gap-4">
        {pastEvents.length === 0 ? (
          <p>No past events</p>
        ) : (
          pastEvents.map((event) => {
            const eventClass: EventClass = new EventClass(event);

            return (
              <Link href={`/events/${eventClass.toHash()}`} key={event.name}>
                <Card className="flex flex-col p-4">
                  <h1>{event.name}</h1>
                  <p>{event.date.human}</p>
                  <p>{event?.location?.venue}</p>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </TitledPage>
  );
}
