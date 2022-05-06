import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
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
  const db = getDatabase();
  const usersReference = ref(db, "users/");
  useEffect(() => {
    const unsubscribe = onValue(usersReference, (usersSnapshot) => {
      const usersSnapshotData = processUsersSnapshot(usersSnapshot);
      setData(usersSnapshotData);
    });
    return unsubscribe;
  }, []);
  const head = ["Name", "Score"];
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
