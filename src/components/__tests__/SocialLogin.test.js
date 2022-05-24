import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SocialLogin from "../SocialLogin";
import * as database from "firebase/database";
import { extractDataFromUsersSnapshot } from "../../firebase/rtdb";
jest.useFakeTimers();
// jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("../../firebase/auth", () => ({
  auth: null,
}));
jest.mock("../FacebookLoginButton");
jest.mock("../GoogleLoginButton");

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  onAuthStateChanged: jest.fn(() => () => {}),
}));

jest.mock("firebase/database");
database.onValue = jest.fn((query, callback) => {
  callback();
  return () => {};
});
// database.orderByChild = jest.fn();
database.query = jest.fn();

jest.mock("../../firebase/rtdb", () => ({
  ...jest.requireActual("../../firebase/rtdb"),
  extractDataFromUsersSnapshot: jest.fn(() => []),
}));

describe("<SocialLogin />", () => {
  it("renders correctly before login", () => {
    // Arrange & Act
    const tree = render(<SocialLogin />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});

it("renders correctly after login without user data", async () => {
  const tree = render(<SocialLogin />);
  const { getByText, queryByText } = tree;
  const toClick = getByText("Sign in with Google");
  extractDataFromUsersSnapshot.mockImplementationOnce(() => []);
  // Act
  fireEvent(toClick, "press");

  await waitFor(() => {
    expect(getByText("Sign Out")).toBeTruthy();
    expect(queryByText("Delete My Data")).toBeFalsy();
  });
});

it("renders correctly after login with user data", async () => {
  const tree = render(<SocialLogin />);
  const { getByText, queryByText } = tree;
  const toClick = getByText("Sign in with Google");
  extractDataFromUsersSnapshot.mockImplementationOnce(() => {
    return [42, "BigRedDonkey", 4, "testUid"];
  });
  // Act
  fireEvent(toClick, "press");

  await waitFor(() => {
    expect(getByText("Sign Out")).toBeTruthy();
    expect(queryByText("Delete My Data")).toBeTruthy();
  });
});
