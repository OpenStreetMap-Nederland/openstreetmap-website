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
  description:
    "OpenAED is een project om alle AED's in Nederland in kaart te brengen.",
  longdescription:
    "OpenAED is een project om alle AED's in Nederland in kaart te brengen. Het toont de AED's op een kaart en stelt een API beschikbaar.",
  links: [
    {
      name: "Website",
      url: "https://openaed.nl/",
    },
    {
      name: "Code",
      url: "https://github.com/openaed/openaed",
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
    "De standaard OpenStreetMap stijl voor de kaart op openstreetmap.org.",
  longdescription:
    "De standaard OpenStreetMap stijl voor de kaart op openstreetmap.org. Het is geschreven in CartoCSS en gepubliceerd als de openstreetmap-carto stijl op GitHub.",
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
    "Een gebruiksvriendelijke webeditor voor OpenStreetMap. Aanbevolen voor beginnende mappers.",
  longdescription:
    "iD is een gebruiksvriendelijke webeditor voor OpenStreetMap. Het is met opzet eenvoudig, maar krachtig. iD is geschreven in JavaScript en gebruikt [d3] (https://d3js.org/)",
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
    "JOSM is een editor voor OpenStreetMap. Het ondersteunt een groot aantal plug-ins. JOSM is geschreven in Java. Aanbevolen voor meer geavanceerde mappers.",
  longdescription:
    "JOSM is een editor voor OpenStreetMap. Het ondersteunt een groot aantal plug-ins. JOSM is geschreven in Java. Aanbevolen voor meer geavanceerde mappers.",
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
