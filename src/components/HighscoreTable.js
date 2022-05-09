import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { getUsersReference } from "../highscore/rtdb";
import { Table, Row, Rows } from "react-native-table-component";
import { processUsersSnapshot } from "../highscore/rtdb";
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

export default HighscoreTable = () => {
  const [data, setData] = useState();
  const usersReference = getUsersReference();
  useEffect(() => {
    const unsubscribe = onValue(usersReference, (usersSnapshot) => {
      const usersSnapshotData = processUsersSnapshot(usersSnapshot);
      setData(usersSnapshotData);
    });
    return unsubscribe;
  }, []);
  const head = ["Name", "Score", "Difficulty"];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 0, borderColor: "white" }}>
        <Row
          data={head}
          style={styles.head}
          textStyle={{ color: "white", textAlign: "center" }}
        />
        <Rows
          data={data}
          textStyle={styles.text}
          style={{ backgroundColor: "oldlace" }}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  head: { height: 40, backgroundColor: "coral" },
  text: { margin: 6, color: "coral", textAlign: "center" },
});
