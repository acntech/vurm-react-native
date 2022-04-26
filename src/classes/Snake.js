import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { createCoord, idxToCoord } from "../utilities/conversion";
import { isEqualCoords } from "../utilities/comparison";
export default class Snake {
  constructor() {
    this.coords = initializeSnakeCoords();
    this.direction = "L";
    this.digestionCoords = [];
  }

  getValidDirections() {
    const preHead = this.getPreHead();
    const head = this.getHead();

    const dx = head.x - preHead.x;
    const dy = head.y - preHead.y;

    if (dx == 1 || dx < -1) {
      return ["U", "D", "R"];
    } else if (dx == -1 || dx > 1) {
      return ["U", "D", "L"];
    } else if (dy == -1 || dy > 1) {
      return ["U", "R", "L"];
    } else if (dy == 1 || dy < -1) {
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
        return createCoord((NUM_COLUMNS + x - 1) % NUM_COLUMNS, y % NUM_ROWS);
      case "R":
        return createCoord((NUM_COLUMNS + x + 1) % NUM_COLUMNS, y % NUM_ROWS);
      case "U":
        return createCoord(x % NUM_COLUMNS, (NUM_ROWS + y - 1) % NUM_ROWS);
      case "D":
        return createCoord(x % NUM_COLUMNS, (NUM_ROWS + y + 1) % NUM_ROWS);
      default:
        throw new Error("Could not decide next head");
    }
  }

  move() {
    const newCoords = [...this.getCoords()];

    if (
      isEqualCoords(
        this.digestionCoords[this.digestionCoords.length - 1],
        this.getTail()
      )
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
    if (isEqualCoords(berry, head)) {
      console.log("YUM!");
      this.digestionCoords.unshift(berry);
      berryEaten();
    }
  }
}

export const initializeSnakeCoords = () => {
  const middleIdx =
    NUM_COLUMNS * Math.round(NUM_ROWS / 2) + Math.round(NUM_COLUMNS / 2);
  const middleCoord = idxToCoord(middleIdx);

  const rawCoords = [
    // [middleCoord.x - 2, middleCoord.y],
    [middleCoord.x - 1, middleCoord.y],
    [middleCoord.x, middleCoord.y],
    [middleCoord.x + 1, middleCoord.y],
    // [middleCoord.x + 2, middleCoord.y],
    // [middleCoord.x + 3, middleCoord.y],
    // [middleCoord.x + 4, middleCoord.y],
  ];

  const [x_idx, y_idx] = [0, 1];
  return rawCoords.map((rawCoord) =>
    createCoord(rawCoord[x_idx], rawCoord[y_idx])
  );
};
