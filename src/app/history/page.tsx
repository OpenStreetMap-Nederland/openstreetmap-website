import { Metadata } from "next";
import { HistoryMapContainer } from "@/components/map/containers/history-map-container";
import { Title } from "@/components/layouts/title";

export const metadata: Metadata = {
  title: "OpenStreetMap History",
  description: "De historie van OpenStreetMap. Bekijk de veranderingen.",
};

export default function HistoryPage() {
  return (
    <div className="h-full w-full grid grid-cols-4">
      <div className="col-span-1 m-4">
        <div className="mb-4">
          <Title size="h1" title="History" titlePostfix="Changesets" />
        </div>
        <div className="mb-4">Work in progress</div>
      </div>

      <div className="w-full h-full col-span-3">
        <HistoryMapContainer />
      </div>
    </div>
  );
}
