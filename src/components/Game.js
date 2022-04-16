import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Snake from "../classes/Snake";
import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import Controller from "./Controller";
import Grid from "./Grid";

export default class Game extends Component {
  state = {
    snake: new Snake(),
    tickIntervalMs: 500,
    gameOver: false,
  };

  componentDidMount() {
    this._interval = setInterval(() => {
      this.tick();
    }, this.state.tickIntervalMs);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  isGameOver() {
    const snake = this.state.snake;
    const nextHead = snake.getNextHead();
    const { x, y } = nextHead;

    const goingOutOfBounds =
      x < 0 || x > NUM_COLUMNS - 1 || y < 0 || y > NUM_ROWS - 1;
    const selfIntercepting = snake.getCoords().includes(nextHead);

    return goingOutOfBounds || selfIntercepting;
  }

  tick() {
    this.state.snake.move();
    this.setState({ gameOver: this.isGameOver() });
    if (this.state.gameOver) {
      clearInterval(this._interval);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Grid snake={this.state.snake}></Grid>
        <Controller
          setDirection={this.state.snake.setDirection.bind(this.state.snake)}
        ></Controller>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
    backgroundColor: "aliceblue",
    flex: 1,
    // flexDirection: "column",
  },
});
