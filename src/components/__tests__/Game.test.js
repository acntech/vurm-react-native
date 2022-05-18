import React from "react";
import { render } from "@testing-library/react-native";
import Game from "../Game";

describe("<Game />", () => {
  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<Game />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
