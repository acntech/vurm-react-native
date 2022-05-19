import { useState, useEffect } from "react";
import { onValue, orderByChild, query } from "firebase/database";
import { getUsersReference } from "../firebase/rtdb";
import ScoreTable from "./ScoreTable";
import { auth } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default Leaderboard = () => {
  const [topData, setTopData] = useState([[]]);
  const [uidData, setUidData] = useState([["", "Loading...", ""]]);
  const [uid, setUid] = useState(auth?.currentUser?.uid);

  const topN = 20;
  const allUsersReferenceOrderedByScore = query(
    getUsersReference(),
    orderByChild("score")
  );

  const unsubscribeOnAuthStateChanged = onAuthStateChanged(auth, (user) => {
    setUid(user?.uid);
  });

  useEffect(() => {
    const unsubscribeTopData = onValue(
      allUsersReferenceOrderedByScore,
      async (usersSnapshot) => {
        const leaderboardData = extractLeaderboardDataFromUsersSnapshot(
          usersSnapshot,
          uid,
          topN
        );
        if (leaderboardData.length > topN) {
          setUidData(leaderboardData.pop());
        } else {
          setUidData([]);
        }
        setTopData(leaderboardData);
      }
    );
    return () => {
      unsubscribeTopData();
      unsubscribeOnAuthStateChanged();
    };
  }, [uid]);

  return (
    <ScoreTable
      scoreData={topData}
      scrollEnabled={true}
      highlightUid={uid}
      outOfRangeRow={uidData}
    ></ScoreTable>
  );
};

export const extractLeaderboardDataFromUsersSnapshot = (
  usersSnapshot,
  userUid,
  topN
) => {
  let processedData = [];
  if (!usersSnapshot.hasChildren()) {
    return processedData;
  }

  let negRank = 0;
  let idx = 0;
  let prevScore = 0;
  let adjustedTopN = Object.keys(usersSnapshot.val()).length - topN - 1;

  usersSnapshot.forEach((child) => {
    const childValue = child.val();
    if (prevScore < childValue?.score) {
      negRank--;
      prevScore = childValue.score;
    }
    const youIndicator = child?.key == userUid ? " (You)" : "";
    childData = [
      negRank,
      childValue?.name + youIndicator,
      childValue?.score,
      child?.key,
    ];
    if (idx > adjustedTopN || child?.key == userUid) {
      processedData.push(childData);
    }
    idx++;
  });

  if (processedData.length > 0) {
    negRankIdx = 0;
    minNegRank = processedData[processedData.length - 1][negRankIdx];
    for (let i = 0; i < processedData.length; i++) {
      processedData[i][negRankIdx] += Math.abs(minNegRank) + 1;
    }
  }
  return processedData.reverse();
};
