import { type ClassValue, clsx } from "clsx";
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
