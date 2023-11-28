export type Project = {
  name: string;
  altName?: string;
  description: string;
  longdescription: string;
  links: {
    name?: string;
    url: string;
  }[];
  image?: string;
  startDate?: string;
};

const OpenAED: Project = {
  name: "OpenAED",
  description: "OpenAED is a project to map all AEDs in the Netherlands.",
  longdescription:
    "OpenAED is a project to map all AEDs in the Netherlands. It displays the AEDs on a map.",
  links: [
    {
      name: "Website",
      url: "https://openaed.nl/",
    },
    {
      name: "Code",
      url: "https://github.com/openaed",
    },
    {
      name: "Creator",
      url: "https://github.com/jxpsert",
    },
  ],
  image: "/openAEDPreview.png",
  startDate: "2023",
};

const OpenStreetMapCarto: Project = {
  name: "OSM Carto",
  altName: "OpenStreetMap Carto",
  description:
    "The default OpenStreetMap style for the map on openstreetmap.org.",
  longdescription:
    "The default OpenStreetMap style for the map on openstreetmap.org. It is written in CartoCSS and published as the openstreetmap-carto style on GitHub.",
  links: [
    {
      name: "Code",
      url: "https://github.com/gravitystorm/openstreetmap-carto",
    },
    {
      name: "Wiki",
      url: "https://wiki.openstreetmap.org/wiki/Standard_tile_layer",
    },
  ],
  image: "/osmCartoPreviewNL.png",
  startDate: "2012",
};

// editors
const iD: Project = {
  name: "iD",
  altName: "iD editor",
  description:
    "A web editor for OpenStreetMap, that is easy to use. Reccomended for beginning mappers.",
  longdescription:
    "iD is a web editor for OpenStreetMap, that is easy to use. It is intentionally simple, but powerful. iD is written in JavaScript and uses [d3](https://d3js.org/)",
  links: [
    {
      name: "Code",
      url: "https://github.com/openstreetmap/iD",
    },
    {
      name: "Website",
      url: "https://ideditor.com/",
    },
    {
      name: "Wiki",
      url: "https://wiki.openstreetmap.org/wiki/ID",
    },
  ],
  image: "/idPreview.png",
  startDate: "2012",
};

const JOSM: Project = {
  name: "JOSM",
  altName: "Java OpenStreetMap Editor",
  description:
    "JOSM is a desktop editor for OpenStreetMap. It supports a large number of plugins. JOSM is written in Java. Reccomended for more advanced mappers.",
  longdescription:
    "JOSM is a desktop editor for OpenStreetMap. It supports a large number of plugins. JOSM is written in Java. JOSM is the most popular editor for OpenStreetMap. It is used by many advanced mappers. JOSM is written in Java.",
  links: [
    {
      name: "Website",
      url: "https://josm.openstreetmap.de/",
    },
    {
      name: "Wiki",
      url: "https://wiki.openstreetmap.org/wiki/JOSM",
    },
  ],
  image: "/josmPreview.png",
};

export const projects = [OpenAED, OpenStreetMapCarto, iD, JOSM] as Project[];

export const projectLists = [
  {
    name: "Nederlandse projecten",
    description: "Projecten die gemaakt zijn door Nederlanders.",
    projects: [OpenAED] as Project[],
  },
  {
    name: "Maps",
    description: "Kaarten gemaakt met OpenStreetMap data.",
    projects: [OpenStreetMapCarto] as Project[],
  },
  {
    name: "Editors",
    description: "Editors voor OpenStreetMap.",
    projects: [iD, JOSM] as Project[],
  },
  {
    name: "Information",
    projects: [] as Project[],
  },
  {
    name: "Data",
    projects: [] as Project[],
  },
  {
    name: "Quality control",
    projects: [] as Project[],
  },
];
