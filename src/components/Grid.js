import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { Component } from "react";
import { coordToIdx } from "../utilities/conversion";

export default Grid = ({ snakeCoords, berryCoord }) => (
  <FlatList
    style={styles.container}
    data={createGridData(snakeCoords, berryCoord)}
    renderItem={renderBox}
    numColumns={NUM_COLUMNS}
    keyExtractor={keyExtractor}
    scrollEnabled={false}
  />
);

const keyExtractor = (item) => item.id;

const createGridData = (snakeCoords, berryCoord) => {
  let gridData = new Array(NUM_COLUMNS * NUM_ROWS);

  for (let i = 0; i < gridData.length; i++) {
    gridData[i] = {
      hasSnake: false,
      hasBerry: false,
      id: i,
    };
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
    <Box
      item={item}
      style={[
        styles.item,
        { paddingVertical: height / (4.6 * NUM_ROWS) },
        item.hasSnake && styles.snakeBody,
        item.hasBerry && styles.berry,
      ]}
    ></Box>
  );
};

class Box extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.item.hasSnake != this.props.item.hasSnake ||
      nextProps.item.hasBerry != this.props.item.hasBerry
    );
  }

  render() {
    return <View style={this.props.style}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "coral",
    // maxHeight: "30%",
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
