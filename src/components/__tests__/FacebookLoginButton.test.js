import React from "react";
import { render } from "@testing-library/react-native";
import FacebookLoginButton from "../FacebookLoginButton";

jest.mock("expo-auth-session/providers/facebook", () => {
  const originalModule = jest.requireActual(
    "expo-auth-session/providers/facebook"
  );

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    useAuthRequest: jest.fn(() => [undefined, undefined, undefined]),
  };
});

describe("<FacebookLoginButton />", () => {
  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<FacebookLoginButton />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
