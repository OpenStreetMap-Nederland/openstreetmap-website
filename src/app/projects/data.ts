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
  image: "/osmCartoPreview.png",
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
    "A desktop editor for OpenStreetMap. Reccomended for more advanced mappers.",
  longdescription:
    "JOSM is a desktop editor for OpenStreetMap. It supports a large number of plugins. JOSM is written in Java.",
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

export const projects = [OpenStreetMapCarto, iD, JOSM] as Project[];

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
