import { useState, useEffect } from "react";
import { onValue, orderByChild, query } from "firebase/database";
import {
  getUsersReference,
  extractDataFromUsersSnapshot,
} from "../firebase/rtdb";
import ScoreTable from "./ScoreTable";
import { auth } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default Leaderboard = () => {
  const [topData, setTopData] = useState([[]]);
  const [uidData, setUidData] = useState(["", "Loading...", "", ""]);
  const [uid, setUid] = useState(auth?.currentUser?.uid);

  const topN = 30;
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
        const leaderboardData = extractDataFromUsersSnapshot(
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
