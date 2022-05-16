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
  constructor(props) {
    super(props);
    this.state = getInitialGameState();
    this.snake = new Snake();
    this.berry = generateRandomCoord(this.snake.getCoords());
    this.boundBerryEaten = this.berryEaten.bind(this);
    this.boundSetDirection = this.snake.setDirection.bind(this.snake);
  }

  componentDidMount() {
    this.props.navigation.addListener("transitionStart", () => {
      clearInterval(this._interval);
    });

    boundStart = this.start.bind(this);
    this.pull().finally(() => {
      if (this.props?.onFinishedLoading) {
        this.props.onFinishedLoading();
        boundStart();
      }
    });
  }

  componentWillUnmount() {
    this.push();
    clearInterval(this._interval);
  }

  isGameOver() {
    const nextHead = this.snake.getNextHead();
    const possibleInterceptions = this.snake.getCoords().slice(0, -1);
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
          this.restart();
        },
      },
    ]);
  }

  /**
   * @deprecated The game no longer uses different difficulties
   */
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
    this._interval = setInterval(() => {
      this.tick();
    }, this.state.difficulty.tickIntervalMs);
  }

  restart() {
    this.pull();
    this.reset();
    this.start();
  }

  reset() {
    this.setState(getInitialGameState());
    this.snake = new Snake();
    this.berry = generateRandomCoord(this.snake.getCoords());
    this.boundSetDirection = this.snake.setDirection.bind(this.snake);
  }

  tick() {
    if (this.isGameOver() || this.state.ticks > 500) {
      clearInterval(this._interval);
      this.push();
      this.gameOverPrompt();
    } else {
      const eatCallback = async () => {
        this.boundBerryEaten();
        this.updateHighscore();
      };
      this.snake.move();
      this.snake.eat(this.berry, eatCallback);
      this.setState({ ticks: this.state.ticks + 1 });
    }
  }

  async berryEaten() {
    this.setState({
      score: this.state.score + 1,
    });
    this.berry = generateRandomCoord(this.snake.getCoords());
  }

  async placeBerry() {
    if (!this.berry) {
      this.setState({
        berry: generateRandomCoord(this.snake.getCoords()),
      });
    }
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
    await this.updateHighscore();
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
        </View>
        <Grid
          snakeCoords={this.snake.getCoords()}
          berryCoord={this.berry}
        ></Grid>
        <Controller setSnakeDirection={this.boundSetDirection}></Controller>
      </SafeAreaView>
    );
  }
}

const getInitialGameState = () => ({
  difficulty: { name: "default", tickIntervalMs: MIN_TICK_INTERVAL_MS * 2 },
  ticks: 0,
  score: 0,
  user: auth.currentUser,
  highscore: -1,
  highscoreText: "",
  highscoreDifficultyName: "",
});

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
  },
});
