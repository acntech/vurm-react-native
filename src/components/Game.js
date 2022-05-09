import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Snake from "../classes/Snake";
import { MIN_TICK_INTERVAL_MS } from "../constants";
import { generateRandomCoord } from "../utilities/generators";
import Controller from "./Controller";
import Grid from "./Grid";
import { Alert } from "react-native";
import { constainsCoord } from "../utilities/comparison";
import * as rtdb from "../highscore/rtdb";
import { auth } from "../auth/firebase";

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
    Alert.alert("Game Over!", `Your score: ${this.state.score}`, [
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
      { name: "Analyst", tickIntervalMs: MIN_TICK_INTERVAL_MS * 30 },
      { name: "Senior Analyst", tickIntervalMs: MIN_TICK_INTERVAL_MS * 4 },
      { name: "Associate", tickIntervalMs: MIN_TICK_INTERVAL_MS * 3 },
      { name: "BAWS", tickIntervalMs: MIN_TICK_INTERVAL_MS * 2 },
    ];
    return new Promise((resolve) => {
      Alert.alert(
        "Choose difficulty",
        null,
        difficulties.map((difficulty) => ({
          text: difficulty.name,
          onPress: () => {
            this.setState({ difficulty: difficulty });
            resolve();
          },
        }))
      );
    });
  }

  async start() {
    this.pull();
    await this.difficultySelectionPrompt();
    this.boundBerryEaten = () => this.berryEaten();
    this.boundSetDirection = this.state.snake.setDirection.bind(
      this.state.snake
    );
    this._interval = setInterval(() => {
      this.tick();
    }, this.state.difficulty.tickIntervalMs);
  }

  reset() {
    this.setState(getInitialGameState());
  }

  tick() {
    if (this.isGameOver()) {
      clearInterval(this._interval);
      this.push();
      this.gameOverPrompt();
    } else {
      const eatCallback = () => {
        this.boundBerryEaten();
        this.updateHighscore();
      };
      this.ensureBerryExistence();
      this.state.snake.move();
      this.state.snake.eat(this.state.berry, eatCallback);
      this.setState({ ticks: this.state.ticks + 1 });
    }
  }

  berryEaten() {
    this.setState({
      berry: null,
      score: this.state.score + 1,
    });
  }

  ensureBerryExistence() {
    if (this.state.berry == null) {
      this.setState({
        berry: generateRandomCoord(this.state.snake.getCoords()),
      });
    }
  }

  async push() {
    user = this.state.user;
    score = this.state.score;
    difficulty = this.state.difficulty.name;

    remoteHighscore = await rtdb.getUserProperty(user, "score", 0, () => {});
    if (score > remoteHighscore) {
      rtdb.setUserData(user, { score: score, difficulty: difficulty });
    }
  }

  async pull() {
    await this._pullHighscore();
    await this._pullHighscoreDifficultyName();
    this.updateHighscore();
  }

  async _pullHighscore() {
    setHighscoreCallback = this.setHighscore.bind(this);
    await rtdb.getUserProperty(
      this.state.user,
      "score",
      0,
      setHighscoreCallback
    );
  }

  async _pullHighscoreDifficultyName() {
    setHighscoreDifficultyNameCallback =
      this.setHighscoreDifficultyName.bind(this);
    await rtdb.getUserProperty(
      this.state.user,
      "difficulty",
      "",
      setHighscoreDifficultyNameCallback
    );
  }

  setHighscore(score) {
    this.setState({ highscore: score });
  }

  setHighscoreDifficultyName(highscoreDifficultyName) {
    this.setState({ highscoreDifficultyName: highscoreDifficultyName });
  }

  updateHighscore() {
    if (this.state.score > this.state.highscore) {
      this.setHighscore(this.state.score);
      this.setHighscoreDifficultyName(this.state.difficulty.name);
    }
    this._updateHighscoreText();
  }

  _updateHighscoreText() {
    highscoreText = "";
    if (!this.state.user) {
      highscoreText = "Log in to track highscore";
    } else {
      if (this.state.highscore == -1) {
        highscoreText = "Retrieving highscore...";
      } else if (this.state.highscore == null) {
        highscoreText = "Failed to retreive highscore";
      } else {
        const difficulty = this.state.highscoreDifficultyName
          ? `(${this.state.highscoreDifficultyName})`
          : "";
        highscoreText = `Highscore: ${this.state.highscore} ${difficulty}`;
      }
    }
    this.setState({ highscoreText: highscoreText });
  }

  render() {
    return (
      <SafeAreaView style={styles.container} testID={"Game"}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.score, { flex: 1 }]}>
            Score: {`${this.state.score} \n`}
          </Text>
          <Text style={[styles.score, { flex: 1 }]}>
            {this.state.highscoreText}
          </Text>
          <Text style={[styles.score, { flex: 1 }]}>
            Difficulty: {this.state.difficulty.name}
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
    difficulty: { name: "", tickIntervalMs: 1000 },
    ticks: 0,
    score: 0,
    user: auth.currentUser,
    highscore: -1,
    highscoreText: "",
    highscoreDifficultyName: "",
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
