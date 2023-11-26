import { format } from "date-fns";

export type EventLocation = {
  short: string;
  detailed: string;
  coords: number[]; // Assuming this is an array of coordinates, adjust accordingly
  venue: string;
};

export type EventDate = {
  human: string;
  human_short: string;
  whole_day: boolean;
  start: string; // Assuming this is in ISO 8601 format
};

export interface Event {
  name: string;
  url: string;
  date: EventDate;
  location: EventLocation;
}

export type EventDetail = {
  id: string;
  name: string;
  description: string;
  creator: string;
  attendees: string[];
  website: string | null;
};

export class EventClass implements Event {
  id: string;
  name: string;
  url: string;
  date: EventDate;
  location: EventLocation;

  constructor(event: Event) {
    let splitUrl = event.url.split("/");
    this.id = splitUrl[splitUrl.length - 2];
    this.name = event.name;
    this.url = event.url;
    this.date = event.date;
    this.location = event.location;
  }

  toHash(): string {
    const formattedDate = format(new Date(this.date.start), "yyyy-MM-dd");
    const lowercaseName = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    return `${lowercaseName}-${formattedDate}/${this.id}`;
  }
}
