import { type ClassValue, clsx } from "clsx";
import { ht } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColor(input: string, saturation = 500) {
  const colors500 = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-purple-500",
  ];

  const colors400 = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-indigo-400",
    "bg-pink-400",
    "bg-purple-400",
  ];

  const colors300 = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-orange-300",
    "bg-indigo-300",
    "bg-pink-300",
    "bg-purple-300",
  ];

  const index = input
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((acc, cur) => acc + cur, 0);

  const color500 = colors500[index % colors500.length];
  const color400 = colors400[index % colors400.length];
  const color300 = colors300[index % colors300.length];

  if (saturation === 500) {
    return color500;
  }

  if (saturation === 400) {
    return color400;
  }

  if (saturation === 300) {
    return color300;
  }
}

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export const generateImageLink = (href: string) => {
  return `/_next/image?url=${encodeURIComponent(href)}&w=128&q=75`;
};

declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

export const removeDomain = (url: string) => {
  return url.replace(/^(?:\/\/|[^/]+)*\//, "/");
};

export const toInternalLinks = (html: string) => {
  html = html.replaceAll("https://www.openstreetmap.org/user/", "/mapper/");

  html = html.replaceAll("https://www.openstreetmap.org/", "/");

  return html;
};

export const eclipse = (input: string, length = 20) => {
  if (input.length <= length) return input;

  return input.slice(0, length) + "...";
};

export const richTextToPlainText = (input: string) => {
  // remove all html tags
  input = input.replace(/<[^>]*>?/gm, "");

  // remove all newlines
  input = input.replace(/\n/g, " ");

  // remove all double spaces
  input = input.replace(/  +/g, " ");

  return input;
};
