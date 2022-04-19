import react from "react";
import { View, StyleSheet } from "react-native";
import ControllerButton from "./ControllerButton";
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
});

{
  /* {buttonLabels.map((buttonLabel) => (
          <TouchableOpacity
            key={buttonLabel}
            onPress={() => navigation.navigate(buttonLabel)}
            style={[styles.button]}
          >
            <Text style={[styles.buttonLabel]}>{buttonLabel}</Text>
          </TouchableOpacity>
        ))} */
}
