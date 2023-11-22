type Polygon = {
  coordinates: Array<Array<Array<Coordinate>>>;
};

type Building = {
  id: number;
  complexId: number;
  reference: string;
  type: string;
  startDate: number;
  sourceDate: string;
  polygon: Polygon;
  hash: string;
};

type Coordinate = {
  lat: number;
  lng: number;
};
