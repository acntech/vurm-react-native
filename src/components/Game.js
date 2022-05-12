import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Snake from "../classes/Snake";
import { MIN_TICK_INTERVAL_MS } from "../constants";
import {
  generateRandomCoord,
  generateRandomName,
} from "../utilities/generators";
import Controller from "./Controller";
import Grid from "./Grid";
import { Alert } from "react-native";
import { constainsCoord } from "../utilities/comparison";
import * as rtdb from "../firebase/rtdb";
import { auth } from "../firebase/auth";

export default class Game extends Component {
  state = getInitialGameState();

  componentDidMount() {
    this.props.navigation.addListener("transitionStart", () => {
      clearInterval(this._interval);
    });
    this.start();
  }

  componentWillUnmount() {
    this.push();
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

  start() {
    this.state.boundBerryEaten = async () => this.berryEaten();
    this.state.boundSetDirection = this.state.snake.setDirection.bind(
      this.state.snake
    );
    this.pull();
    this.placeBerry();
    // await this.difficultySelectionPrompt();;
    this._interval = setInterval(() => {
      this.tick();
    }, this.state.difficulty.tickIntervalMs);
  }

  reset() {
    this.setState(getInitialGameState());
  }

  async tick() {
    if (this.isGameOver()) {
      clearInterval(this._interval);
      this.push();
      this.gameOverPrompt();
    } else {
      const eatCallback = async () => {
        this.state.boundBerryEaten();
        this.updateHighscore();
      };
      this.state.snake.move();
      this.state.snake.eat(this.state.berry, eatCallback);
      this.setState({ ticks: this.state.ticks + 1 });
    }
  }

  async berryEaten() {
    this.setState({
      berry: generateRandomCoord(this.state.snake.getCoords()),
      score: this.state.score + 1,
    });
  }

  async placeBerry() {
    this.setState({
      berry: generateRandomCoord(this.state.snake.getCoords()),
    });
  }

  async push() {
    user = this.state.user;
    highscore = this.state.highscore;
    difficulty = this.state.difficulty.name;

    remoteHighscore = await rtdb.getUserProperty(user, "score", 0, () => {});

    if (highscore > remoteHighscore) {
      remoteNickname = await rtdb.getUserProperty(user, "name", null, () => {});
      const name =
        remoteNickname == null ? generateRandomName() : remoteNickname;
      rtdb.setUserData(user, {
        name: name,
        score: highscore,
        difficulty: difficulty,
      });
    }
  }

  async pull() {
    await this._pullHighscore();
    await this._pullHighscoreDifficultyName();
    this.updateHighscore();
  }

  async _pullHighscore() {
    setHighscoreCallback = this._setHighscore.bind(this);
    await rtdb.getUserProperty(
      this.state.user,
      "score",
      0,
      setHighscoreCallback
    );
  }

  async _pullHighscoreDifficultyName() {
    setHighscoreDifficultyNameCallback =
      this._setHighscoreDifficultyName.bind(this);
    rtdb.getUserProperty(
      this.state.user,
      "difficulty",
      "",
      setHighscoreDifficultyNameCallback
    );
  }

  async _setHighscore(score) {
    this.setState({ highscore: score });
    this._updateHighscoreText();
  }

  async _setHighscoreDifficultyName(highscoreDifficultyName) {
    this.setState({ highscoreDifficultyName: highscoreDifficultyName });
    this._updateHighscoreText();
  }

  async updateHighscore() {
    if (this.state.score > this.state.highscore) {
      this.setState({
        highscore: this.state.score,
        highscoreDifficultyName: this.state.difficulty.name,
      });
      this._updateHighscoreText();
    }
  }

  async _updateHighscoreText() {
    highscoreText = "";
    if (!this.state.user) {
      highscoreText = "Log in to track highscore";
    } else {
      if (this.state.highscore == -1) {
        highscoreText = "Retrieving highscore...";
      } else if (this.state.highscore == null) {
        highscoreText = "Failed to retreive highscore";
      } else {
        // const difficulty = this.state.highscoreDifficultyName
        //   ? `(${this.state.highscoreDifficultyName})`
        //   : "";
        highscoreText = `Highscore\n${this.state.highscore}`;
      }
    }
    this.setState({ highscoreText: highscoreText });
  }

  render() {
    return (
      <SafeAreaView style={styles.container} testID={"Game"}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.score, { flex: 1 }]}>
            Score {`\n${this.state.score}`}
          </Text>
          <Text style={[styles.score, { flex: 1 }]}>
            {this.state.highscoreText}
          </Text>
          {/* <Text style={[styles.score, { flex: 1 }]}>
            Difficulty {`\n${this.state.difficulty.name}`}
          </Text> */}
        </View>
        <Grid
          snakeCoords={this.state.snake.getCoords()}
          berryCoord={this.state.berry}
        ></Grid>
        <Controller
          setSnakeDirection={this.state.boundSetDirection}
        ></Controller>
      </SafeAreaView>
    );
  }
}

const getInitialGameState = () => {
  const snake = new Snake();
  return {
    snake: snake,
    berry: generateRandomCoord(snake.getCoords()),
    difficulty: { name: "default", tickIntervalMs: MIN_TICK_INTERVAL_MS * 2 },
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
