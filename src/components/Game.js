import React, { Component } from "react";
import { View, Text } from "react-native";
import Snake from "../classes/Snake";
import Grid from "./Grid";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.snake = new Snake();
  }

  render() {
    return (
      <View>
        <Grid snakeCoords={this.snake.coords}></Grid>
      </View>
    );
  }
}
