import { NUM_COLUMNS } from "../../constants";
import { createCoord } from "../../utilities/conversion";
import Snake, { initializeSnakeCoords } from "../Snake";

describe("snake", () => {
  const snake = new Snake();
  describe("is constructed correctly", () => {
    it("has the correct initial coords", () => {
      // Arrange & Act
      const correct_initial_coords = initializeSnakeCoords();

      // Assert
      expect(snake.coords).toStrictEqual(correct_initial_coords);
    });

    it("has the correct initial direction", () => {
      // Arrange & Act
      const correct_initial_direction = "L";

      // Assert
      expect(snake.direction).toStrictEqual(correct_initial_direction);
    });

    it("has no berries currently in digestion", () => {
      // Arrange & Act
      const correct_digestion_coords = [];

      // Assert
      expect(snake.digestionCoords).toStrictEqual(correct_digestion_coords);
    });
  });

  describe("moves as expected", () => {
    it("moves left if it's current direction is left", () => {
      // Arrange
      const snake = new Snake();

      // Act
      snake.setDirection("L");
      const beforeCoords = snake.getCoords();
      snake.move();
      const actualAfterCoords = snake.getCoords();
      newCoord = createCoord(beforeCoords[0].x - 1, beforeCoords[0].y);
      beforeCoords.pop();
      const expectedAfterCoords = [newCoord, ...beforeCoords];

      // Assert
      expect(snake.getDirection()).toBe("L");
      expect(actualAfterCoords).toStrictEqual(expectedAfterCoords);
    });

    it("keeps left direction if its prehead is to the right of the head, but is instructed to go right", () => {
      // Arrange
      const snake = new Snake();
      snake.setDirection("L");
      const [prehead, head] = [snake.getPreHead(), snake.getHead()];
      const [dx, dy] = [head.x - prehead.x, head.y - prehead.y];

      // Act
      snake.setDirection("R");

      // Assert
      expect(dx).toBe(-1);
      expect(dy).toBe(0);
      expect(snake.getDirection()).toBe("L");
    });

    it("wraps around the grid when moving out of bounds to the left", () => {
      // Arrange
      const snake = new Snake();
      snake.setDirection("L");
      let hasReachedBorder = false;
      const maxMoves = NUM_COLUMNS;

      // Act
      for (i = 0; i < maxMoves; i++) {
        if (snake.getHead().x == 0) {
          hasReachedBorder = true;
          break;
        }
        snake.move();
      }
      if (!hasReachedBorder) {
        throw new Error("Snake failed to reach border");
      }
      headBeforeWrap = snake.getHead();
      snake.move();
      headAfterWrap = snake.getHead();

      // Assert
      expect(headAfterWrap.y).toBe(headBeforeWrap.y);
      expect(headAfterWrap.x).toBe(NUM_COLUMNS - 1);
    });
  });

  describe("digests berries as expected", () => {
    it("gains one unit in length after eating a berry and moving its own length", async () => {
      // Arrange
      const snake = new Snake();
      const beforeLength = snake.getCoords().length;
      const berry = snake.getHead();

      // Act
      await snake.eat(berry, () => {});
      for (let i = 0; i < beforeLength; i++) {
        snake.move();
      }
      const afterLength = snake.getCoords().length;

      // Assert
      expect(afterLength).toStrictEqual(beforeLength + 1);
    });
  });
});
