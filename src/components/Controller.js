import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { unicodeArrowToButtonLabelDirection } from "../utilities/conversion";

export default Controller = ({ setSnakeDirection: setDirectionCallback }) => {
  const [directions, setDirections] = useState([]);

  const handleOnPressIn = (direction) => {
    if (!directions.includes(direction)) {
      setDirections([...directions, direction]);
      setDirectionCallback(direction);
    }
  };

  const handleOnPressOut = (direction) => {
    if (directions.length == 0) {
      setDirectionCallback(direction);
    }

    var idx = directions.indexOf(direction);
    if (idx !== -1) {
      const newDirections = [...directions];
      newDirections.splice(idx, 1);
      setDirections(newDirections);
      setDirectionCallback(newDirections[newDirections.length - 1]);
    }
  };

  const buttonRowUnicodeArrows = [["↑"], ["←", "→"], ["↓"]];
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {buttonRowUnicodeArrows.map((buttonUnicodeArrows) => (
          <View style={styles.row} key={buttonUnicodeArrows[0]}>
            {buttonUnicodeArrows.map((buttonUnicodeArrow) => (
              <ControllerButton
                key={buttonUnicodeArrow}
                label={buttonUnicodeArrow}
                onPressIn={() =>
                  handleOnPressIn(
                    unicodeArrowToButtonLabelDirection(buttonUnicodeArrow)
                  )
                }
                onPressOut={() =>
                  handleOnPressOut(
                    unicodeArrowToButtonLabelDirection(buttonUnicodeArrow)
                  )
                }
              ></ControllerButton>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const ControllerButton = ({ label, onPressIn, onPressOut }) => (
  <View onTouchStart={onPressIn} onTouchEnd={onPressOut}>
    <TouchableOpacity style={styles.button}>
      <Text style={[styles.buttonLabel]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = new StyleSheet.create({
  container: {
    // backgroundColor: "aliceblue",
  },
  column: {
    flexDirection: "column",
    alignContent: "center",
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    padding: 20,
    borderRadius: 10000,
    backgroundColor: "coral",
    alignSelf: "center",
    margin: 20,
    minWidth: "50.3%",
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
  },
});
