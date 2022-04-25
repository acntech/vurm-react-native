import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { constainsCoord } from "./comparison";
import { idxToCoord } from "./conversion";
import shuffle from "./shuffle";

export const generateRandomCoord = (invalidCoords) => {
  const numIdxs = NUM_COLUMNS * NUM_ROWS;
  const idxs = Array.from({ length: numIdxs }, (v, k) => k);
  shuffle(idxs);
  for (let i of idxs) {
    const candidate = idxToCoord(i);
    if (!constainsCoord(invalidCoords, candidate)) {
      return candidate;
    }
  }

  // return idxToCoord(Math.floor(Math.random() * numIdxs));
};

export const createCoord = (x, y) => ({ x: x, y: y });
