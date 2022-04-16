import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { createCoord, idxToCoord } from "../utilities/conversion";

export default class Snake {
  constructor() {
    this.coords = initializeCoords();
    this.direction = "L";
  }

  getValidDirections() {
    const preHead = this.getPreHead();
    const head = this.getHead();

    const dx = head.x - preHead.x;
    const dy = head.y - preHead.y;

    if (dx > 0) {
      return ["U", "D", "R"];
    } else if (dx < 0) {
      return ["U", "D", "L"];
    } else if (dy < 0) {
      return ["U", "R", "L"];
    } else if (dy > 0) {
      return ["D", "R", "L"];
    } else {
      throw new Error("Could not decide invalid direction");
    }
  }

  setDirection(newDirection) {
    const validDirections = this.getValidDirections();
    // const validDirections = ["U", "L", "D"];
    if (validDirections.includes(newDirection)) {
      this.direction = newDirection;
    }
  }

  getDirection() {
    return this.direction;
  }

  getCoords() {
    return this.coords;
  }

  getHead() {
    return this.coords[0];
  }

  getPreHead() {
    return this.coords[1];
  }

  getNextHead() {
    const direction = this.getDirection();
    const { x, y } = this.getHead();
    switch (direction) {
      case "L":
        return createCoord(x - 1, y);
      case "R":
        return createCoord(x + 1, y);
      case "U":
        return createCoord(x, y - 1);
      case "D":
        return createCoord(x, y + 1);
      default:
        throw new Error("Could not decide next head");
    }
  }

  move() {
    // console.log("TICK!");
    const newCoords = [...this.getCoords()];
    newCoords.pop();
    newCoords.unshift(this.getNextHead());
    this.coords = newCoords;
  }
}

const initializeCoords = () => {
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
