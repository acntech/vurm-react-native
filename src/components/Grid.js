import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { FlatList, StyleSheet, View } from "react-native";
import { coordToIdx, createCoord } from "../utilities/conversion";

export default Grid = ({ snake }) => {
  console.log(snake);
  const gridData = createGridData(snake.getCoords());
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

const createGridData = (snakeCoords) => {
  //   console.log(snakeCoords);
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
