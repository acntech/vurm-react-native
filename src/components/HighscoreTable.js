import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Table, Row, Rows } from "react-native-table-component";

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
  const reference = ref(db, "users/");
  useEffect(() => {
    const unsubscribe = onValue(reference, (snapshot) => {
      const snapshotData = processUsersSnapshot(snapshot);
      setData(snapshotData);
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

const processUsersSnapshot = (usersSnapshot) => {
  processedData = [];
  if (!usersSnapshot.hasChildren()) {
    return processedData;
  }
  usersSnapshot.forEach((child) => {
    const childValue = child.val();
    processedData.push([childValue?.name, childValue?.score]);
  });
  return processedData;
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
