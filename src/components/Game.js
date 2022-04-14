import React, { Component } from "react";
import { View } from "react-native";
import Snake from "../classes/Snake";
import Grid from "./Grid";

export default class Game extends Component {
  state = {
    snake: new Snake(),
    tickIntervalMs: 1000,
  };

  componentDidMount() {
    this._interval = setInterval(() => {
      this.state.snake.tick();
      this.setState({ snake: this.state.snake });
    }, this.state.tickIntervalMs);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return (
      <View>
        <Grid snake={this.state.snake}></Grid>
      </View>
    );
  }
}
