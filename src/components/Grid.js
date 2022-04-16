import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
// import { useDimensions } from "@react-native-community/hooks";
import { coordToIdx, createCoord } from "../utilities/conversion";

export default Grid = ({ snake }) => {
  return (
    <FlatList
      style={styles.container}
      // contentContainerStyle={{ flexGrow: 1 }}
      data={createGridData(snake.getCoords())}
      renderItem={renderBox}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item) => item.id}
    />
  );
};

const createGridData = (snakeCoords) => {
  let gridData = new Array(NUM_COLUMNS * NUM_ROWS);

  for (let xx = 0; xx < NUM_COLUMNS; xx++) {
    for (let yy = 0; yy < NUM_ROWS; yy++) {
      gridData[coordToIdx(createCoord(xx, yy))] = {
        hasSnake: false,
        id: `(${xx},${yy})`,
      };
    }
  }

  snakeCoords.forEach((coord) => {
    gridData[coordToIdx(coord)].hasSnake = true;
  });

  return gridData;
};

const renderBox = ({ item }) => {
  const height = Dimensions.get("window").height;
  return (
    <View
      style={[
        styles.item,
        { paddingVertical: Math.round(height / (4.5 * NUM_ROWS)) },
        item.hasSnake && styles.snakeBody,
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "coral",
  },

  item: {
    backgroundColor: "coral",
    padding: 1,
    flexGrow: 1,
    // marginVertical: 0.5,
    // marginHorizontal: 0.5,
  },
  snakeBody: { backgroundColor: "white" },
});
