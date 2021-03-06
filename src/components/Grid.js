import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { Component } from "react";
import { coordToIdx } from "../utilities/conversion";
import { useEffect, useState } from "react";
import { useRef } from "react";
import deepcopy from "deepcopy";
import {
  HIGHLIGHT_COLOR,
  ODD_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
} from "../colors";

export default Grid = ({ snakeCoords, berryCoord }) => {
  const [gridData, setGridData] = useState(createInitializedGridData());
  const prevSnakeCoords = useRef([]);
  const prevBerryCoord = useRef(null);

  const updateData = () => {
    newData = deepcopy(gridData);
    prevSnakeCoords.current.forEach((coord) => {
      newData[coordToIdx(coord)].hasSnake = false;
    });

    if (prevBerryCoord.current != null) {
      newData[coordToIdx(prevBerryCoord.current)].hasBerry = false;
    }

    if (prevSnakeCoords.current.length > 0) {
      newData[coordToIdx(prevSnakeCoords.current[0])].hasSnakeHead = false;
    }

    snakeCoords.forEach((coord) => {
      newData[coordToIdx(coord)].hasSnake = true;
    });

    if (berryCoord != null) {
      newData[coordToIdx(berryCoord)].hasBerry = true;
    }
    if (snakeCoords.length > 0) {
      newData[coordToIdx(snakeCoords[0])].hasSnakeHead = true;
    }

    setGridData(newData);
    prevSnakeCoords.current = snakeCoords;
    prevBerryCoord.current = berryCoord;
  };

  useEffect(() => {
    updateData();
  }, [snakeCoords, berryCoord]);

  return (
    <FlatList
      style={styles.container}
      data={gridData}
      renderItem={renderBox}
      numColumns={NUM_COLUMNS}
      keyExtractor={keyExtractor}
      scrollEnabled={false}
      initialNumToRender={gridData.length}
    />
  );
};

const keyExtractor = (item) => item.id;

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
        item.hasSnakeHead && styles.snakeHead,
      ]}
    ></Box>
  );
};

class Box extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.item.hasSnake != this.props.item.hasSnake ||
      nextProps.item.hasBerry != this.props.item.hasBerry ||
      nextProps.item.hasSnakeHead != this.props.item.hasSnakeHead
    );
  }

  render() {
    return <View style={this.props.style}></View>;
  }
}

const createInitializedGridData = () => {
  let data = new Array(NUM_COLUMNS * NUM_ROWS);

  for (let i = 0; i < data.length; i++) {
    data[i] = {
      hasSnake: false,
      hasSnakeHead: false,
      hasBerry: false,
      id: i,
    };
  }
  return data;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_COLOR,
  },

  item: {
    backgroundColor: PRIMARY_COLOR,
    padding: 1,
    flexGrow: 1,
    marginVertical: 0.5,
    marginHorizontal: 0.5,
  },
  snakeBody: { backgroundColor: PRIMARY_TEXT_COLOR },
  snakeHead: { backgroundColor: HIGHLIGHT_COLOR },
  berry: { backgroundColor: ODD_COLOR },
});
