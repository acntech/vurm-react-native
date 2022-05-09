import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { limitToLast, onValue, orderByChild, query } from "firebase/database";
import { getUsersReference } from "../highscore/rtdb";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
// users: {
//     "<uid_1>": {
//         "name": "Bro Sor",
//         "score": 42
//     },
//     "<uid_2>": {
//         "name": "Ha Det",
//         "score": 43
//     }
// }
export const columnFlex = [1, 1, 5, 2];

export default HighscoreTable = () => {
  const [data, setData] = useState();
  const usersReferenceOrderedByScore = query(
    getUsersReference(),
    orderByChild("score"),
    limitToLast(10)
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
  const head = ["Rank", "Score", "Nickname", "Difficulty"];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 0, borderColor: "white" }}>
        <Row
          flexArr={columnFlex}
          data={head}
          style={styles.head}
          textStyle={{ color: "white", textAlign: "center" }}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={data}
            textStyle={styles.text}
            style={{ backgroundColor: "oldlace" }}
            flexArr={columnFlex}
          />
        </TableWrapper>
      </Table>
    </View>
  );
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // paddingTop: 30,
    // backgroundColor: "white",
  },
  head: { height: 40, backgroundColor: "coral" },
  text: { margin: 6, color: "coral", textAlign: "center" },
  wrapper: { flexDirection: "row" },
});
