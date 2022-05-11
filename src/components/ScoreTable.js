import { View, ScrollView, StyleSheet } from "react-native";
import { Table, Rows, Row } from "react-native-table-component";

const columnFlex = [1, 5, 1];

export default ScoreTable = ({ scoreData, scrollEnabled, highlightUid }) => (
  <View style={{ flex: 1 }}>
    <View>
      <Table borderStyle={{ borderWidth: 0, borderColor: "white" }}>
        <Row
          flexArr={columnFlex}
          data={["Rank", "Nickname", "Score"]}
          style={styles.head}
          textStyle={styles.headText}
        />
      </Table>
    </View>
    <ScrollView bounces={false} scrollEnabled={scrollEnabled}>
      <Table>
        {scoreData?.map((rowData, index) => {
          uid = rowData.pop();
          highlight = uid == highlightUid;
          return (
            <Row
              key={index}
              flexArr={columnFlex}
              data={rowData}
              style={[styles.row, highlight && styles.highlighted]}
              textStyle={styles.rowText}
            />
          );
        })}
        {/* <Rows
          flexArr={columnFlex}
          data={scoreData}
          style={styles.row}
          textStyle={styles.rowText}
        /> */}
      </Table>
    </ScrollView>
  </View>
);

export const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: "coral" },
  headText: { color: "white", textAlign: "center" },
  highlighted: { backgroundColor: "pink" },
  row: { backgroundColor: "oldlace" },
  rowText: { margin: 6, color: "coral", textAlign: "center" },
});
