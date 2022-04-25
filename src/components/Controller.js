import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { unicodeArrowToButtonLabelDirection } from "../utilities/conversion";

export default Controller = ({ setSnakeDirection }) => {
  const [directions, setDirections] = useState([]);

  const handleOnPressIn = (direction) => {
    if (!directions.includes(direction)) {
      setDirections([...directions, direction]);
      setSnakeDirection(direction);
    }
  };

  const handleOnPressOut = (direction) => {
    if (directions.length == 0) {
      setSnakeDirection(direction);
    }

    var idx = directions.indexOf(direction);
    if (idx !== -1) {
      const newDirections = [...directions];
      newDirections.splice(idx, 1);
      setDirections(newDirections);
      setSnakeDirection(newDirections[newDirections.length - 1]);
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
    <TouchableOpacity
      style={styles.button}
      // onPressIn={() => onPressIn()}
      // onPressOut={() => onPressOut()}
    >
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
    // marginBottom: 10,
    margin: 20,
    minWidth: "50.3%",
    // maxWidth: "10.0%",
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
  },
});
