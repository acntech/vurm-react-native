import react from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { unicodeArrowToButtonLabelDirection } from "../utilities/conversion";

export default Controller = ({ setDirection }) => {
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
                onPress={() => {
                  setDirection(
                    unicodeArrowToButtonLabelDirection(buttonUnicodeArrow)
                  );
                }}
              ></ControllerButton>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const ControllerButton = ({ label, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.button}>
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
