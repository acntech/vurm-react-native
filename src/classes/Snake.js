import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { createCoord, idxToCoord } from "../utilities/conversion";

initializeCoords = () => {
  const middleIdx =
    NUM_COLUMNS * Math.round(NUM_ROWS / 2) + Math.round(NUM_COLUMNS / 2);
  const middleCoord = idxToCoord(middleIdx);

  const rawCoords = [
    [middleCoord.x - 1, middleCoord.y],
    [middleCoord.x, middleCoord.y],
    [middleCoord.x + 1, middleCoord.y],
  ];

  return rawCoords.map((rawCoord) => createCoord(rawCoord[0], rawCoord[1]));
};

export default class Snake {
  constructor() {
    this.coords = initializeCoords();
    this.direction = "L";
  }

  setDirection(newDirection) {
    const validDirections = ["L", "R", "U", "D"];
    if (validDirections.includes(newDirection)) {
      this.direction = newDirection;
    }
  }

  getDirection() {
    return this.direction;
  }

  getHead() {
    return this.coords[0];
  }
}
