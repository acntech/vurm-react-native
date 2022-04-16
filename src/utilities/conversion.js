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

export const unicodeArrowToButtonLabelDirection = (unicodeArrow) => {
  switch (unicodeArrow) {
    case "↑":
      return "U";
    case "↓":
      return "D";
    case "←":
      return "L";
    case "→":
      return "R";
    default:
      throw new Error("Unknown unicode arrow passed");
  }
};
