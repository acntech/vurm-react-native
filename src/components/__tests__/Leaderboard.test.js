import React from "react";
import { render } from "@testing-library/react-native";
import Leaderboard from "../Leaderboard";
import { onValue, query } from "firebase/database";
import { deleteApp, getApps } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";

jest.mock("firebase/database", () => ({
  ...jest.requireActual("firebase/database"),
  onValue: jest.fn(),
  query: jest.fn(),
  extractDataFromUsersSnapshot: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  onAuthStateChanged: jest.fn(),
}));

afterEach(async () => {
  apps = getApps();
  await Promise.all(apps.map((app) => deleteApp(app)));
});

describe("<Leaderboard />", () => {
  it("renders correctly", () => {
    // Arrange & Act
    children = [
      { key: "uid1", val: () => ({ score: 1, name: "BigBlueDonkey" }) },
      { key: "uid2", val: () => ({ score: 2, name: "BigRedDonkey" }) },
      { key: "uid3", val: () => ({ score: 3, name: "BigPurpleDonkey" }) },
    ];
    const snapshot = {
      val: () => children,
      forEach: (callback) => children.forEach((child) => callback(child)),
      hasChildren: () => !!children.length,
    };

    onValue.mockImplementation((ref, callback) => {
      callback(snapshot);
      return jest.fn();
    });
    query.mockImplementation((query, ...queryConstraints) => jest.fn());

    onAuthStateChanged.mockImplementation((auth, callback) => {
      return jest.fn();
    });

    const tree = render(<Leaderboard />).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
