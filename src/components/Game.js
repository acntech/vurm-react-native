import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Snake from "../classes/Snake";
import { NUM_COLUMNS, NUM_ROWS } from "../constants";
import { generateRandomCoord } from "../utilities/generators";
import Controller from "./Controller";
import Grid from "./Grid";
import { Alert } from "react-native";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    this.start();
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

  gameOverPrompt() {
    Alert.alert("Game Over!", `Your score: ${this.state.numBerriesEaten}`, [
      {
        text: "Exit",
        onPress: () => this.props.navigation.goBack(),
        // style: "cancel",
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
      { title: "Graduate", tickRateMs: 200 },
      { title: "Analyst", tickRateMs: 100 },
      { title: "Senior Analyst", tickRateMs: 50 },
      { title: "Boss", tickRateMs: 25 },
    ];
    promise = new Promise((resolve) => {
      Alert.alert(
        "Choose difficulty",
        null,
        difficulties.map((difficulty) => ({
          text: difficulty.title,
          onPress: () => {
            this.setState({ tickIntervalMs: difficulty.tickRateMs });
            resolve();
          },
        }))
      );
    });

    return promise;
  }

  tick() {
    if (this.isGameOver()) {
      clearInterval(this._interval);
      this.gameOverPrompt();
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

  reset() {
    this.setState(getInitialState());
  }

  async start() {
    await this.difficultySelectionPrompt();
    this._interval = setInterval(() => {
      this.tick();
    }, this.state.tickIntervalMs);
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

const getInitialState = () => ({
  snake: new Snake(),
  berry: null,
  tickIntervalMs: 100,
  ticks: 0,
  numBerriesEaten: 0,
});

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
