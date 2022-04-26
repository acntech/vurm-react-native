import Snake, { initializeSnakeCoords } from "../Snake";

describe("snake", () => {
  const snake = new Snake();
  describe("is constructed correctly", () => {
    it("has the correct initial coords", () => {
      const correct_initial_coords = initializeSnakeCoords();
      expect(snake.coords).toStrictEqual(correct_initial_coords);
    });

    it("has the correct initial direction", () => {
      const correct_initial_direction = "L";
      expect(snake.direction).toStrictEqual(correct_initial_direction);
    });

    it("has no berries currently in digestion", () => {
      const correct_digestion_coords = [];
      expect(snake.digestionCoords).toStrictEqual(correct_digestion_coords);
    });
  });
});
