import { Metadata } from "next";
import { HistoryMapContainer } from "@/components/map/containers/history-map-container";

export const metadata: Metadata = {
  title: "OpenStreetMap History",
  description: "De historie van OpenStreetMap. Bekijk de veranderingen.",
};

export default function HistoryPage() {
  return (
    <>
      <HistoryMapContainer />
    </>
  );
}
