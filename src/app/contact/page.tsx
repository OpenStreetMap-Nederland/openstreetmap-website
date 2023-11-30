import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { Metadata } from "next";
import { Title } from "@/components/layouts/title";
import { ExternalButton } from "@/components/external-button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "OpenStreetMap Contact",
  description:
    "Contact opnemen met de OpenStreetMap gemeenschap. Welke kanalen zijn er beschikbaar?",
};

export default function ContactPage() {
  return (
    <TitledPage title="Contact">
      Om in contact te komen met de OpenStreetMap gemeenschap zijn er
      verschillende kannalen beschikbaar.
      <Title size="h2" title="Forum" />
      <div className="flex flex-col gap-4">
        Het forum is een plek waar je vragen kan stellen en antwoorden kan
        vinden. Het is ook een plek waar je kan discussiëren over OpenStreetMap
        gerelateerde onderwerpen.
        <ExternalButton href="https://community.openstreetmap.org/c/communities/nl/43">
          Forum
        </ExternalButton>
      </div>
      <Title size="h2" title="Discord" />
      <div className="flex flex-col gap-4">
        Discord is een chat platform waar je in real-time kan chatten met andere
        OpenStreetMap gebruikers. Het is een plek waar je vragen kan stellen en
        antwoorden kan vinden. Op Discord zijn de gesprekken informeler dan op
        het forum.
        <ExternalButton href="https://discord.gg/openstreetmap">
          <div className="flex gap-2 items-center">
            <DiscordLogoIcon />
            Discord
          </div>
        </ExternalButton>
      </div>
    </TitledPage>
  );
}
