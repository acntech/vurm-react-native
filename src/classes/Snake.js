import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { createCoord, idxToCoord } from "../utilities/conversion";

export default class Snake {
  constructor() {
    this.coords = initializeCoords();
    this.direction = "L";
    this.digestionCoords = [];
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

  getTail() {
    return this.coords[this.coords.length - 1];
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
    const newCoords = [...this.getCoords()];

    const tail = this.getTail();
    if (
      this.digestionCoords.length > 0 &&
      this.digestionCoords[0].x == tail.x &&
      this.digestionCoords[0].y == tail.y
    ) {
      this.digestionCoords.pop();
    } else {
      newCoords.pop();
    }
    newCoords.unshift(this.getNextHead());
    this.coords = newCoords;
  }

  eat(berry, berryEaten) {
    const head = this.getHead();
    if (head.x == berry.x && head.y == berry.y) {
      console.log("YUM!");
      this.digestionCoords.unshift(berry);
      berryEaten();
    }
  }
}

const initializeCoords = () => {
  const middleIdx =
    NUM_COLUMNS * Math.round(NUM_ROWS / 2) + Math.round(NUM_COLUMNS / 2);
  const middleCoord = idxToCoord(middleIdx);

  const rawCoords = [
    [middleCoord.x - 3, middleCoord.y],
    [middleCoord.x - 2, middleCoord.y],
    [middleCoord.x - 1, middleCoord.y],
    [middleCoord.x, middleCoord.y],
    [middleCoord.x + 1, middleCoord.y],
    [middleCoord.x + 2, middleCoord.y],
    [middleCoord.x + 3, middleCoord.y],
    [middleCoord.x + 4, middleCoord.y],
  ];

  return rawCoords.map((rawCoord) => createCoord(rawCoord[0], rawCoord[1]));
};
