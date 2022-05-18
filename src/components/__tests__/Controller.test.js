import React from "react";
import { render } from "@testing-library/react-native";
import Controller from "../Controller";

describe("<Controller />", () => {
  it("has 1 child", () => {
    // Arrange & Act
    const tree = render(<Controller />).toJSON();

    // Assert
    expect(tree.children.length).toBe(1);
  });

  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<Controller />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
