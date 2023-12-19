import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { Metadata } from "next";
import { Title } from "@/components/layouts/title";
import { ExternalButton } from "@/components/external-button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "OpenStreetMap Contact",
  description:
    "Contact opnemen met de OpenStreetMap gemeenschap in Nederland. Welke kanalen zijn er beschikbaar?",
};

export default function ContactPage() {
  return (
    <TitledPage title="Contact">
      Om in contact te komen met de OpenStreetMap (OSM) gemeenschap in Nederland zijn de volgende kanalen beschikbaar.
      <Title size="h2" title="Forum" />
      <div className="flex flex-col gap-4">
        Het wereldwijde OpenStreetMap Forum heeft een "NL Hoek" ("Category"). Dit is een (de!) plek, waar je vragen, "schroom niet!", kunt stellen aan leden van de Nederlandse OSM-Community.
        Zij zullen die graag beantwoorden.
        Het is ook een plek waar je kunt discussiëren, uiteraard ook internationaal, over OpenStreetMap-gerelateerde onderwerpen.
        De discussies zijn georganiseerd in "Topics". Daarin kun je zoeken en vaak al antwoorden vinden, of zelf een Topic starten. 
        <ExternalButton href="https://community.openstreetmap.org/c/communities/nl/43">
          Forum
        </ExternalButton>
      </div>
      <Title size="h2" title="Discord" />
      <div className="flex flex-col gap-4">
        Discord is een communicatie platform waar je in real-time kan chatten met andere
        OpenStreetMappers. Dit is ook een plek waar je vragen kunt stellen en
        antwoorden kan vinden. Op Discord zijn de gesprekken informeler dan op het Forum. 
        <ExternalButton href="https://discord.gg/openstreetmap">
          <div className="flex gap-2 items-center">
            <DiscordLogoIcon />
            Discord (OSM Globaal)
          </div>
        </ExternalButton>
        Ook op Discord is er een Nederlandstalig "Channel": Languages | #Nederlands. Via de button hieronder kun je daar direct heen: 
        <ExternalButton href="https://discord.com/channels/413070382636072960/805079423505661993">
          <div className="flex gap-2 items-center">
            <DiscordLogoIcon />
            Discord (OSM NL Kanaal)
          </div>
        </ExternalButton>
      </div>
    </TitledPage>
  );
}
