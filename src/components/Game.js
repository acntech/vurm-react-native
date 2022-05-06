import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Snake from "../classes/Snake";
import { MIN_TICK_INTERVAL_MS } from "../constants";
import { generateRandomCoord } from "../utilities/generators";
import Controller from "./Controller";
import Grid from "./Grid";
import { Alert } from "react-native";
import { constainsCoord } from "../utilities/comparison";

export default class Game extends Component {
  state = getInitialGameState();

  componentDidMount() {
    this.props.navigation.addListener("transitionStart", () => {
      clearInterval(this._interval);
    });
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  isGameOver() {
    const snake = this.state.snake;
    const nextHead = snake.getNextHead();

    const possibleInterceptions = snake.getCoords().slice(0, -1);

    const selfIntercepting = constainsCoord(possibleInterceptions, nextHead);

    if (selfIntercepting) {
      console.log("SELF INTERCEPTING");
    }
    return selfIntercepting;
  }

  gameOverPrompt() {
    Alert.alert("Game Over!", `Your score: ${this.state.numBerriesEaten}`, [
      {
        text: "Exit",
        onPress: () => this.props.navigation.goBack(),
      },
      {
        text: "Try Again",
        onPress: () => {
          this.reset();
          this.start();
        },
      },
    ]);
  }

  difficultySelectionPrompt() {
    difficulties = [
      { title: "Analyst", tickIntervalMs: MIN_TICK_INTERVAL_MS * 10 },
      { title: "Senior Analyst", tickIntervalMs: MIN_TICK_INTERVAL_MS * 4 },
      { title: "Associate", tickIntervalMs: MIN_TICK_INTERVAL_MS * 3 },
      { title: "BAWS", tickIntervalMs: MIN_TICK_INTERVAL_MS * 2 },
    ];
    return new Promise((resolve) => {
      Alert.alert(
        "Choose difficulty",
        null,
        difficulties.map((difficulty) => ({
          text: difficulty.title,
          onPress: () => {
            this.setState({ tickIntervalMs: difficulty.tickIntervalMs });
            resolve();
          },
        }))
      );
    });
  }

  tick() {
    if (this.isGameOver() && !this.state.exiting) {
      clearInterval(this._interval);
      this.gameOverPrompt();
    } else {
      this.ensureBerryExistence();
      this.state.snake.move();
      this.state.snake.eat(this.state.berry, this.boundBerryEaten);
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

  reset() {
    this.setState(getInitialGameState());
  }

  async start() {
    await this.difficultySelectionPrompt();
    this.boundBerryEaten = () => this.berryEaten();
    this.boundSetDirection = this.state.snake.setDirection.bind(
      this.state.snake
    );
    this._interval = setInterval(() => {
      this.tick();
    }, this.state.tickIntervalMs);
  }

  render() {
    return (
      <SafeAreaView style={styles.container} testID={"Game"}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.score, { flex: 1 }]}>
            Score: {this.state.numBerriesEaten}
          </Text>
          <Text style={[styles.score, { flex: 1 }]}>
            Tick: {this.state.ticks}
          </Text>
        </View>
        <Grid
          snakeCoords={this.state.snake.getCoords()}
          berryCoord={this.state.berry}
        ></Grid>
        <Controller setSnakeDirection={this.boundSetDirection}></Controller>
      </SafeAreaView>
    );
  }
}

const getInitialGameState = () => {
  const snake = new Snake();
  return {
    snake: snake,
    berry: generateRandomCoord(snake.getCoords()),
    tickIntervalMs: 100,
    ticks: 0,
    numBerriesEaten: 0,
  };
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  score: {
    textAlign: "center",
  },
});
