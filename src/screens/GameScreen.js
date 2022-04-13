import React from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, View } from "react-native";
import { NUM_COLUMNS, NUM_ROWS } from "../constants";

const createGrid = () => {
  let grid = new Array(NUM_COLUMNS * NUM_ROWS);

  for (let xx = 0; xx < NUM_COLUMNS; xx++) {
    for (let yy = 0; yy < NUM_ROWS; yy++) {
      grid[NUM_COLUMNS * yy + xx] = { hasSnake: false, id: `(${xx},${yy})` };
    }
  }

  const middleIdx = Math.round(
    NUM_COLUMNS * Math.round(NUM_ROWS / 2) + Math.round(NUM_COLUMNS / 2)
  );

  //DEBUG
  grid[middleIdx].hasSnake = 1;
  grid[middleIdx - 1].hasSnake = 1;
  grid[middleIdx + 1].hasSnake = 1;

  return grid;
};

const renderBox = ({ item }) => (
  <View style={[styles.item, item.hasSnake && styles.snakeBody]}></View>
);

const GameScreen = (navigation) => {
  const data = createGrid();
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Game goes here!</Text> */}
      <FlatList
        style={styles.container}
        data={data}
        renderItem={renderBox}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    // justifyContent: "center",
    // alignSelf: "center",
    flexDirection: "column",
    alignContent: "center",
  },
  item: {
    backgroundColor: "#aaa",
    padding: 6,
    flex: 1,
    alignSelf: "center",
    // marginVertical: 0.5,
    // marginHorizontal: 0.5,
  },
  snakeBody: { backgroundColor: "#fed" },
});

export default GameScreen;
