import { StyleSpecification } from "maplibre-gl";

const PointMapStyle: StyleSpecification = {
  version: 8,
  sources: {
    // Background: {
    //   type: "raster",
    //   tiles: [
    //     "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    //   ],
    //   tileSize: 256,
    //   // "raster-colorizer": "grayscale",
    //   // "raster-opacity": 0
    // },
    Background: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      // "raster-colorizer": "grayscale",
      // "raster-opacity": 0
    },
    // poi: {
    //   type: "vector",
    //   tiles: ["http://localhost:3001/table.public.poi.point/{z}/{x}/{y}"],
    //   minzoom: 0,
    //   maxzoom: 22,
    // },
  },
  // glyphs: "",
  // localIdeographFontFamily: '\'Noto Sans\', \'Noto Sans CJK SC\', sans-serif',
  layers: [
    {
      id: "Background",
      type: "raster",
      source: "Background",
    },
    // {
    //   id: "poi",
    //   type: "circle",
    //   source: "poi",
    //   "source-layer": "table.public.poi.point",
    //   minzoom: 0,
    //   maxzoom: 22,
    //   paint: {
    //     "circle-radius": 5,
    //     "circle-color": "#ff0000",
    //   },
    // },
    // {
    //   id: "poi-prefix",
    //   type: "symbol",
    //   source: "poi",
    //   "source-layer": "table.public.poi.point",
    //   minzoom: 14,
    //   maxzoom: 22,
    //   layout: {
    //     "text-field": "{prefix}",
    //     "text-size": 10,
    //     "text-anchor": "bottom",
    //     "text-offset": [0, -1],
    //   },
    //   paint: {
    //     "text-color": "#000",
    //     "text-halo-color": "#fff",
    //     "text-halo-width": 1,
    //   },
    // },
    // {
    //   id: "poi-label",
    //   type: "symbol",
    //   source: "poi",
    //   "source-layer": "table.public.poi.point",
    //   minzoom: 14,
    //   maxzoom: 22,
    //   layout: {
    //     "text-field": "{name} {branch}",
    //     "text-size": 14,
    //     "text-anchor": "top",
    //     "text-offset": [0, 0.5],
    //   },
    //   paint: {
    //     "text-color": "#000",
    //     "text-halo-color": "#fff",
    //     "text-halo-width": 1,
    //   },
    // },
  ],
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
};

export default PointMapStyle;
