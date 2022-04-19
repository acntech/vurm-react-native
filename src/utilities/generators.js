import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { idxToCoord } from "./conversion";

export const generateRandomCoord = (invalidCoords) => {
  let availableIdxs = [];
  for (let i = 0; i < NUM_COLUMNS * NUM_ROWS; i++) {
    const { x, y } = idxToCoord(i);

    // This will probably be very slow as invalidCoords grows in size
    if (!invalidCoords.some((e) => e.x == x && e.y == y)) {
      availableIdxs.push(i);
    }
  }

  let randomIdx = Math.floor(Math.random() * availableIdxs.length);

  return idxToCoord(randomIdx);
};
