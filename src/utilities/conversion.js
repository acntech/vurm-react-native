import { NUM_COLUMNS } from "../constants";

export const createCoord = (x, y) => ({ x: x, y: y });

export const coordToIdx = (coord) => {
  return coord.y * NUM_COLUMNS + coord.x;
};

export const idxToCoord = (i) => {
  const y = Math.trunc(i / NUM_COLUMNS);
  const x = i - y * NUM_COLUMNS;
  return createCoord(x, y);
};
