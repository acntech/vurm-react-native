import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Game from "../Game";
import { createCoord } from "../../utilities/conversion";

jest.useFakeTimers();

const mockCreateCoord = (x, y) => createCoord(x, y);
jest.mock("../../utilities/generators", () => {
  const originalModule = jest.requireActual("../../utilities/generators");

  return {
    __esModule: true,
    ...originalModule,
    generateRandomCoord: jest.fn(() => mockCreateCoord(0, 0)),
  };
});

describe("<Game />", () => {
  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<Game />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
