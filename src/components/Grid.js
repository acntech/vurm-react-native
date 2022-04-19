import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { coordToIdx, createCoord } from "../utilities/conversion";

export default Grid = ({ snakeCoords, berryCoord }) => {
  return (
    <FlatList
      style={styles.container}
      data={createGridData(snakeCoords, berryCoord)}
      renderItem={renderBox}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item) => item.id}
    />
  );
};

const createGridData = (snakeCoords, berryCoord) => {
  let gridData = new Array(NUM_COLUMNS * NUM_ROWS);

  for (let xx = 0; xx < NUM_COLUMNS; xx++) {
    for (let yy = 0; yy < NUM_ROWS; yy++) {
      gridData[coordToIdx(createCoord(xx, yy))] = {
        hasSnake: false,
        hasBerry: false,
        id: `(${xx},${yy})`,
      };
    }
  }

  snakeCoords.forEach((coord) => {
    gridData[coordToIdx(coord)].hasSnake = true;
  });

  if (berryCoord != null) {
    gridData[coordToIdx(berryCoord)].hasBerry = true;
  }

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
        item.hasBerry && styles.berry,
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
    marginVertical: 0.5,
    marginHorizontal: 0.5,
  },
  snakeBody: { backgroundColor: "white" },
  berry: { backgroundColor: "purple" },
});
