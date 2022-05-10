import { useState, useEffect } from "react";
import { limitToLast, onValue, orderByChild, query } from "firebase/database";
import { getUsersReference } from "../highscore/rtdb";
import ScoreTable from "./ScoreTable";

export default HighscoreTable = () => {
  const [data, setData] = useState();
  const usersReferenceOrderedByScore = query(
    getUsersReference(),
    orderByChild("score"),
    limitToLast(30)
  );

  useEffect(() => {
    const unsubscribe = onValue(
      usersReferenceOrderedByScore,
      (usersSnapshot) => {
        const highscoreData = extractHighscoreDataFromUsersSnapshot(
          usersSnapshot,
          null
        );
        setData(highscoreData.reverse());
      }
    );
    return unsubscribe;
  }, []);
  return <ScoreTable data={data} scrollEnabled={true}></ScoreTable>;
};

export const extractHighscoreDataFromUsersSnapshot = (
  usersSnapshot,
  uidFilter
) => {
  processedData = [];
  if (!usersSnapshot.hasChildren()) {
    return processedData;
  }
  let rank = Object.keys(usersSnapshot.val()).length;
  usersSnapshot.forEach((child) => {
    const childValue = child.val();
    childData = [
      rank--,
      childValue?.score,
      childValue?.name,
      childValue?.difficulty,
    ];
    if (!uidFilter || uidFilter === child.key) {
      processedData.push(childData);
    }
  });
  return processedData;
};
