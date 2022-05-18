import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";
import {
  startGameLabel,
  instructionsLabel,
} from "../src/screens/MainMenuScreen";

jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("<App />", () => {
  it("has 1 child", () => {
    // Arrange & Act
    const tree = render(<App />).toJSON();

    // Assert
    expect(tree.children.length).toBe(1);
  });
  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<App />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });

  it("takes you to the game screen when clicking the Start Game button", () => {
    // Arrange
    const { getByText, getByTestId } = render(<App />);
    const toClick = getByText(startGameLabel);

    // Act
    fireEvent(toClick, "press");
    const game = getByTestId("Game");

    // Assert
    expect(game).toBeTruthy();
  });

  it("takes you to the instructions screen when clicking the Instructions button", () => {
    // Arrange
    const { getByText, getByTestId } = render(<App />);
    const toClick = getByText(instructionsLabel);

    // Act
    fireEvent(toClick, "press");
    const instructions = getByTestId("Instructions");

    // Assert
    expect(instructions).toBeTruthy();
  });
});
