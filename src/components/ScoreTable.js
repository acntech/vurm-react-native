import { View, ScrollView, StyleSheet } from "react-native";
import { Table, Row } from "react-native-table-component";
import deepcopy from "deepcopy";
import {
  HIGHLIGHT_COLOR,
  HIGHLIGHT_TEXT_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_COLOR,
  SECONDARY_TEXT_COLOR,
} from "../colors";
const columnFlex = [1, 5, 1];

export default ScoreTable = ({
  scoreData,
  scrollEnabled,
  highlightUid,
  outOfRangeRow,
}) => {
  const data = deepcopy(scoreData);
  const extraRow = deepcopy(outOfRangeRow);
  const extraRowUid = extraRow.pop();
  const highlightExtraRow = highlightUid == extraRowUid && extraRowUid;

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Table borderStyle={{ borderWidth: 0 }}>
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
          {data?.map((rowData, index) => {
            const uid = rowData.pop();
            const highlight = uid == highlightUid && !extraRow?.length > 0;
            return (
              <Row
                key={index}
                flexArr={columnFlex}
                data={rowData}
                style={[styles.row, highlight && styles.highlighted]}
                textStyle={[
                  styles.rowText,
                  highlight && styles.highlightedText,
                ]}
              />
            );
          })}
        </Table>
        {extraRow?.length > 0 && (
          <Table>
            <Row
              columnFlex={columnFlex}
              data={["", "⋮", ""]}
              textStyle={[styles.rowText, { fontSize: 30 }]}
            ></Row>
            <Row
              flexArr={columnFlex}
              data={extraRow}
              style={[styles.row, highlightExtraRow && styles.highlighted]}
              textStyle={[
                styles.rowText,
                highlightExtraRow && styles.highlightedText,
              ]}
            ></Row>
          </Table>
        )}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: PRIMARY_COLOR },
  headText: { color: PRIMARY_TEXT_COLOR, textAlign: "center" },
  highlighted: { backgroundColor: HIGHLIGHT_COLOR },
  highlightedText: { color: HIGHLIGHT_TEXT_COLOR },
  row: { backgroundColor: SECONDARY_COLOR },
  rowText: { margin: 6, color: SECONDARY_TEXT_COLOR, textAlign: "center" },
});
