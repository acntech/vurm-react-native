import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SocialLogin from "../SocialLogin";
import { auth } from "../../firebase/auth";
import { initializeApp, deleteApp, getApps } from "firebase/app";
import * as database from "firebase/database";
import { onValue, orderByChild, query } from "firebase/database";
jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// const mockPromptAsync = jest.fn(() => Promise.resolve());
// auth = { currentUser: { uid: "testUid", displayName: "Test Person" } };

// jest.spyOn(auth, "currentUser").mockImplementation(() => ({
//   uid: "testUid",
//   displayName: "Test Person",
// }));
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
database.onValue = jest.fn(() => () => {});
database.orderByChild = jest.fn();
database.query = jest.fn();

describe("<SocialLogin />", () => {
  describe("renders correctly", () => {
    it("before login", () => {
      // Arrange & Act
      const tree = render(<SocialLogin />).toJSON();

      // Assert
      expect(tree).toMatchSnapshot();
    });
  });

  it("after login without user data", async () => {
    const tree = render(<SocialLogin />);
    const { getByText } = tree;
    const toClick = getByText("Sign in with Google");

    // Act
    fireEvent(toClick, "press");

    await waitFor(() => expect(getByText("Sign Out")).toBeTruthy());
  });

  //   it("after login with user data", () => {
  //     expect(true).toBe(true);
  //   });
});
