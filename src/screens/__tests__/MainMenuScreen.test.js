import React from "react";
import { render } from "@testing-library/react-native";
import MainMenuScreen from "../MainMenuScreen";

describe("<MainMenuScreen />", () => {
  it("has 2 children", () => {
    // Arrange & Act
    const tree = render(<MainMenuScreen />).toJSON();

    // Assert
    expect(tree.children.length).toBe(2);
  });
  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<MainMenuScreen />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
