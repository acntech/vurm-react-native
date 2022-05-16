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
    const childKey = child.key;
    const childScore = childValue?.score;
    if (prevScore < childScore) {
      negRank--;
      prevScore = childScore;
    }
    const youIndicator = childKey == userUid ? " (You)" : "";
    childData = [
      negRank,
      childValue?.name + youIndicator,
      childScore,
      childKey,
    ];
    if (idx > adjustedTopN || childKey == userUid) {
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
  // console.log(minNegRank);

  return processedData.reverse();
};
