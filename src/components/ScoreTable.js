import { View, ScrollView, StyleSheet } from "react-native";
import { Table, Rows, Row } from "react-native-table-component";

const columnFlex = [1, 1, 5, 2];

export default ScoreTable = ({ data, scrollEnabled, flex }) => (
  <View style={{ flex: 1 }}>
    <View>
      <Table borderStyle={{ borderWidth: 0, borderColor: "white" }}>
        <Row
          flexArr={columnFlex}
          data={["Rank", "Score", "Nickname", "Difficulty"]}
          style={styles.head}
          textStyle={{ color: "white", textAlign: "center" }}
        />
      </Table>
    </View>
    <ScrollView bounces={false} scrollEnabled={scrollEnabled}>
      <Table>
        <Rows
          data={data}
          textStyle={styles.text}
          style={{ backgroundColor: "oldlace" }}
          flexArr={columnFlex}
        />
      </Table>
    </ScrollView>
  </View>
);

export const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: "coral" },
  text: { margin: 6, color: "coral", textAlign: "center" },
});
