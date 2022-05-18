import React from "react";
import { render } from "@testing-library/react-native";
import GoogleLoginButton from "../GoogleLoginButton";

jest.mock("expo-auth-session/providers/google", () => {
  const originalModule = jest.requireActual(
    "expo-auth-session/providers/google"
  );

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    useIdTokenAuthRequest: jest.fn(() => [undefined, undefined, undefined]),
  };
});

describe("<GoogleLoginButton />", () => {
  it("renders correctly", () => {
    // Arrange & Act
    const tree = render(<GoogleLoginButton />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
