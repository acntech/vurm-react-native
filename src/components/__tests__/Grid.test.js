import React from "react";
import { render } from "@testing-library/react-native";
import Grid from "../Grid";
import { NUM_COLUMNS, NUM_ROWS } from "../../constants";

describe("<Grid />", () => {
  it("has NUM_COLUMNS*NUM_ROWS boxes", () => {
    // Arrange & Act
    const tree = render(<Grid snakeCoords={[]} berryCoord={null} />).toJSON();

    let numBoxes = 0;
    columns = tree.children[0].children;

    for (i = 0; i < columns.length; i++) {
      rows = columns[i].children[0].children;
      numBoxes += rows.length;
    }

    expect(numBoxes).toBe(NUM_COLUMNS * NUM_ROWS);
  });

  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<Grid snakeCoords={[]} berryCoord={null} />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
