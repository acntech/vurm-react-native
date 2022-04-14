import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { FlatList, StyleSheet, View } from "react-native";
import { coordToIdx, createCoord } from "../utilities/conversion";

export default Grid = (snakeCoords) => {
  const gridData = createGridData(snakeCoords);
  return (
    <FlatList
      style={styles.container}
      data={gridData}
      renderItem={renderBox}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item) => item.id}
    />
  );
};

const createGridData = ({ snakeCoords }) => {
  let grid = new Array(NUM_COLUMNS * NUM_ROWS);

  for (let xx = 0; xx < NUM_COLUMNS; xx++) {
    for (let yy = 0; yy < NUM_ROWS; yy++) {
      grid[coordToIdx(createCoord(xx, yy))] = {
        hasSnake: false,
        id: `(${xx},${yy})`,
      };
    }
  }

  snakeCoords.forEach((coord) => {
    grid[coordToIdx(coord)].hasSnake = true;
  });

  return grid;
};

const renderBox = ({ item }) => (
  <View style={[styles.item, item.hasSnake && styles.snakeBody]}></View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#aaa",
    padding: 6,
    flex: 1,
    alignSelf: "center",
    marginVertical: 0.5,
    marginHorizontal: 0.5,
  },
  snakeBody: { backgroundColor: "#fed" },
});
