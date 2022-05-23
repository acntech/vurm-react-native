import React from "react";
import { render } from "@testing-library/react-native";
import ScoreTable from "../ScoreTable";

describe("<ScoreTable />", () => {
  it("renders correctly", () => {
    // Arrange & Act
    mainData = [
      [1, "BigRedDonkey", 32, "uid1"],
      [2, "BigPurpleDonkey", 31, "uid2"],
    ];
    outOfBoundsData = [3, "BigGreenDonkey", 30, "uid3"];
    const tree = render(
      <ScoreTable
        scoreData={mainData}
        scrollEnabled={true}
        highlightUid={"uid3"}
        outOfRangeRow={outOfBoundsData}
      />
    ).toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
  });
});
