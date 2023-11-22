export type Project = {
  name: string;
  description: string;
  link: string;
  image?: string;
};

const OpenStreetMapCarto: Project = {
  name: "OpenStreetMap Carto",
  description:
    "The default OpenStreetMap style for the map on openstreetmap.org.",
  link: "https://github.com/gravitystorm/openstreetmap-carto",
  image: "/osmCartoPreview.png",
};

// editors
const iD: Project = {
  name: "iD",
  description:
    "A web editor for OpenStreetMap, that is easy to use. Reccomended for beginning mappers.",
  link: "https://github.com/openstreetmap/iD",
};

const JOSM: Project = {
  name: "JOSM",
  description:
    "A desktop editor for OpenStreetMap. Reccomended for more advanced mappers.",
  link: "https://josm.openstreetmap.de/",
};

const Achavi: Project = {
  name: "Achavi",
  description:
    "Achavi (Augmented OSM Change Viewer) displays OpenStreetMap changes based on the Augmented Diff.",
  link: "https://wiki.openstreetmap.org/wiki/Achavi",
};

const OSMCha: Project = {
  name: "OSMCha",
  description: "A web application for quality control in OpenStreetMap.",
  link: "https://osmcha.org/",
};

const ohsome: Project = {
  name: "ohsome",
  description: "Easy access to OSM History and Quality Analyses",
  link: "https://dashboard.ohsome.org/",
};

export const projects = [
  OpenStreetMapCarto,
  iD,
  JOSM,
  Achavi,
  OSMCha,
  ohsome,
] as Project[];

export const projectLists = [
  {
    name: "Nederlandse projecten",
    description: "Projecten die gemaakt zijn door Nederlanders.",
    projects: [] as Project[],
  },
  {
    name: "Maps",
    description: "Kaarten gemaakt met OpenStreetMap data.",
    projects: [OpenStreetMapCarto] as Project[],
  },
  {
    name: "Editors",
    description: "Editors voor OpenStreetMap.",
    projects: [
      iD,
      JOSM,
      {
        name: "Vespucci",
        description: "An Android editor for OpenStreetMap.",
        link: "https://vespucci.io/",
      },
      {
        name: "Go Map!!",
        description: "An iOS editor for OpenStreetMap.",
        link: "https://wiki.openstreetmap.org/wiki/Go_Map!!",
      },
      {
        name: "StreetComplete",
        description: "An Android app for completing OpenStreetMap data.",
        link: "https://wiki.openstreetmap.org/wiki/StreetComplete",
      },
      {
        name: "Every Door",
        description:
          "An Android and IOS app and is specifically designed to help users keep amenities and shops up-to-date.",
        link: "https://wiki.openstreetmap.org/wiki/Every_Door",
      },
    ] as Project[],
  },
  {
    name: "Information",
    projects: [
      {
        name: "OSM wiki",
        description: "The wiki for OpenStreetMap.",
        link: "https://wiki.openstreetmap.org/",
      },
      {
        name: "Taginfo",
        description:
          "A web service for viewing information about OpenStreetMap tags.",
        link: "https://taginfo.openstreetmap.org/",
      },
    ] as Project[],
  },
  {
    name: "Data",
    projects: [
      {
        name: "Overpass Turbo",
        description:
          "A web based data mining tool for OpenStreetMap using Overpass API.",
        link: "https://overpass-turbo.eu/",
      },
    ] as Project[],
  },
  {
    name: "Quality control",
    projects: [Achavi, OSMCha, ohsome] as Project[],
  },
];
