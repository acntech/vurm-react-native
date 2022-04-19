import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Snake from "../classes/Snake";
import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { createCoord } from "../utilities/conversion";
import { generateRandomCoord } from "../utilities/generators";
import Controller from "./Controller";
import Grid from "./Grid";

export default class Game extends Component {
  state = {
    snake: new Snake(),
    berry: null,
    tickIntervalMs: 50,
    ticks: 0,
    numBerriesEaten: 0,
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

    const selfIntercepting = possibleIntercpetions.some(
      (e) => e.x == x && e.y == y
    );

    if (goingOutOfBounds) {
      console.log("GOING OUT OF BOUNDS");
    }
    if (selfIntercepting) {
      console.log("SELF INTERCEPTING");
    }
    return goingOutOfBounds || selfIntercepting;
  }

  tick() {
    if (this.isGameOver()) {
      clearInterval(this._interval);
    } else {
      this.ensureBerryExistence();
      this.state.snake.move();
      this.state.snake.eat(this.state.berry, this.berryEaten.bind(this));
      this.setState({ ticks: this.state.ticks + 1 });
    }
  }

  berryEaten() {
    this.setState({
      berry: null,
      numBerriesEaten: this.state.numBerriesEaten + 1,
    });
  }

  ensureBerryExistence() {
    if (this.state.berry == null) {
      this.setState({
        berry: generateRandomCoord(this.state.snake.getCoords()),
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.score}>Score: {this.state.numBerriesEaten}</Text>
        <Grid
          snakeCoords={this.state.snake.getCoords()}
          berryCoord={this.state.berry}
        ></Grid>
        <Controller
          setDirection={this.state.snake.setDirection.bind(this.state.snake)}
        ></Controller>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "aliceblue",
    flex: 1,
  },
  score: {
    textAlign: "center",
    // justifyContent: "center",
  },
});
