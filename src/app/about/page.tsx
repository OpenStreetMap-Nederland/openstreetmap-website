import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenStreetMap About",
  description:
    "Hoe werkt OpenStreetMap? Wat kan je met OpenStreetMap? En hoe kan je zelf meehelpen?",
};

export default function AboutPage() {
  return (
    <TitledPage title="About">
      OpenStreetMap Nederland is een vereniging van vrijwilligers die zich
      inzetten voor het verzamelen, bewerken en beschikbaar stellen van vrije
      geografische gegevens.
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Hoe jij kan helpen
      </h2>
      <p>
        Iedereen kan meehelpen aan OpenStreetMap. Een goede manier om te
        beginnen is om in een gebied te bekijken waar je bekend mee bent. Klop
        er iets niet? Pas het aan! Je kan zelf iets aanpassen door op Bewerken
        te klikken.
      </p>
      <p>
        Wees niet bang om iets fout te doen. De eerste paar edits worden door
        een ervaren mapper gecontroleerd. Deze kan je dan tips geven om je edits
        te verbeteren. Mocht je er niet uitkomen, dan kan je altijd een vraag
        stellen op het forum van OpenStreetMap.
      </p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Voor bedrijven
      </h2>
      <p>
        In OpenStreetMap staan ook bedrijven. Wij vinden de kwaliteit van de
        kaart erg belangrijk. Daarom hebben we een aantal richtlijnen opgesteld
        voor bedrijven die zichzelf op de kaart willen zetten. Om te beginnen
        zijn niet alle bedrijven geschikt om op te nemen in OpenStreetMap.
        Alleen bedrijven die een fysieke locatie hebben, waarbij deze locatie
        ook voor klanten toegankelijk is, mogen op de kaart worden gezet.
        Voorbeelden van bedrijven die welkom zijn in OpenStreetMap zijn onder
        andere winkels, restaurants en hotels.
      </p>
      <p>
        Bij bedrijven die niet publiek toegankelijk zijn, zoals kantoren,
        fabrieken en distributiecentra, is het toegestaan om het bedrijf op te
        nemen mits er een duidelijke ingang is waar bezoekers zich kunnen
        melden, inclusief een bord met de naam van het bedrijf.
      </p>
      <p>
        Voor bedrijven die helemaal geen bezoekers ontvangen en of geen
        duidelijke borden hebben is het niet de bedoeling om deze op te nemen in
        OpenStreetMap. Dit zijn bijvoorbeeld online webshops en eenmanszaken.
      </p>
    </TitledPage>
  );
}
