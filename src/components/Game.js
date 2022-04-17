import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Snake from "../classes/Snake";
import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import Controller from "./Controller";
import Grid from "./Grid";

export default class Game extends Component {
  state = {
    snake: new Snake(),
    tickIntervalMs: 100,
    gameOver: false,
    ticks: 0,
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
    const possibleIntercpetions = snake.getCoords().slice(0, -1);

    const SelfIntercepting = possibleIntercpetions.some(
      (e) => e.x == x && e.y == y
    );

    if (goingOutOfBounds) {
      console.log("GOING OUT OF BOUNDS");
    }
    if (SelfIntercepting) {
      console.log("SELF INTERCEPTING");
    }
    return goingOutOfBounds || SelfIntercepting;
  }

  tick() {
    this.setState({ gameOver: this.isGameOver() });
    if (this.state.gameOver) {
      clearInterval(this._interval);
    } else {
      this.state.snake.move();
      this.forceUpdate();
    }
    this.setState({ ticks: this.state.ticks + 1 });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.score}>Score: {this.state.ticks}</Text>
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
    backgroundColor: "aliceblue",
    flex: 1,
  },
  score: {
    textAlign: "center",
    // justifyContent: "center",
  },
});
