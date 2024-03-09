type Coordinate = [number, number];

type Polygon = {
  coordinates: Array<Array<Array<Coordinate>>>;
};

type Building = {
  id: number;
  reference: string;
  type: string;
  startDate: number;
  sourceDate: string;
  polygon: Polygon;
  hash: string;
};
