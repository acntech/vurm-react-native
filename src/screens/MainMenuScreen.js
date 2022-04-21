import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { GAME_TITLE } from "../constants";

export const startGameLabel = "Start Game";
export const instructionsLabel = "Instructions";

const HomeScreen = ({ navigation }) => {
  const buttonLabels = [startGameLabel, instructionsLabel];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{GAME_TITLE}</Text>
      <View style={styles.column}>
        {buttonLabels.map((buttonLabel) => (
          <TouchableOpacity
            key={buttonLabel}
            onPress={() => navigation.navigate(buttonLabel)}
            style={[
              styles.button,
              buttonLabel === startGameLabel && styles.primaryButton,
            ]}
          >
            <Text
              style={[
                styles.buttonLabel,
                buttonLabel === startGameLabel && styles.primaryButtonLabel,
              ]}
            >
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  column: {
    flexDirection: "column",
    alignContent: "center",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "center",
    marginBottom: 5,
    minWidth: "50%",
  },
  primaryButton: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "coral",
    textAlign: "center",
  },
  primaryButtonLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 26,
  },
});

export default HomeScreen;
