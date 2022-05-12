import { useState, useEffect } from "react";
import { limitToLast, onValue, orderByChild, query } from "firebase/database";
import { getUsersReference } from "../firebase/rtdb";
import ScoreTable from "./ScoreTable";
import { auth } from "../firebase/auth";

export default Leaderboard = () => {
  const [data, setData] = useState();
  const usersReferenceOrderedByScore = query(
    getUsersReference(),
    orderByChild("score"),
    limitToLast(50)
  );

  useEffect(() => {
    const unsubscribe = onValue(
      usersReferenceOrderedByScore,
      (usersSnapshot) => {
        const leaderboardData = extractLeaderboardDataFromUsersSnapshot(
          usersSnapshot,
          null
        );
        setData(leaderboardData.reverse());
      }
    );
    return unsubscribe;
  }, []);
  return (
    <ScoreTable
      scoreData={data}
      scrollEnabled={true}
      highlightUid={auth?.currentUser?.uid}
    ></ScoreTable>
  );
};

export const extractLeaderboardDataFromUsersSnapshot = (
  usersSnapshot,
  uidFilter
) => {
  let processedData = [];
  if (!usersSnapshot.hasChildren()) {
    return processedData;
  }
  let rank = Object.keys(usersSnapshot.val()).length;
  usersSnapshot.forEach((child) => {
    const childValue = child.val();
    childData = [rank--, childValue?.name, childValue?.score, child.key];
    if (!uidFilter || uidFilter === child.key) {
      processedData.push(childData);
    }
  });
  return processedData;
};
