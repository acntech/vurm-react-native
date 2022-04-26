import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
// import renderer from "react-test-renderer";
import App from "../App";
import {
  startGameLabel,
  instructionsLabel,
} from "../src/screens/MainMenuScreen";

jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = render(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
  it("renders correctly", () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("takes you to the game screen when clicking the Start Game button", () => {
    const { getByText, getByTestId } = render(<App />);
    const toClick = getByText(startGameLabel);

    fireEvent(toClick, "press");
    const game = getByTestId("Game");
    expect(game).toBeTruthy();
  });

  it("takes you to the instructions screen when clicking the Instructions button", () => {
    const { getByText, getByTestId } = render(<App />);
    const toClick = getByText(instructionsLabel);

    fireEvent(toClick, "press");
    const instructions = getByTestId("Instructions");
    expect(instructions).toBeTruthy();
  });
});
