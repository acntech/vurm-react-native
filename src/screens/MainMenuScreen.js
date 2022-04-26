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

const MainMenuScreen = ({ navigation }) => {
  const navigateToGame = () => navigation.navigate(startGameLabel);
  const navigateToInstructions = () => navigation.navigate(instructionsLabel);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.gameTitle}>{GAME_TITLE}</Text>
      <View style={styles.column}>
        <MainMenuButton
          onPress={navigateToGame}
          label={startGameLabel}
          buttonStyle={styles.startGameButton}
          labelStyle={styles.startGameButtonLabel}
        />
        <MainMenuButton
          onPress={navigateToInstructions}
          label={instructionsLabel}
          buttonStyle={styles.instructionsButton}
          labelStyle={styles.instructionsButtonLabel}
        />
      </View>
    </SafeAreaView>
  );
};

const MainMenuButton = ({ label, onPress, buttonStyle, labelStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
    <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
  </TouchableOpacity>
);

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
    alignSelf: "center",
    marginBottom: 5,
    minWidth: "50%",
    borderWidth: 0,
    backgroundColor: "oldlace",
  },
  startGameButton: {
    backgroundColor: "coral",
  },
  instructionsButton: {
    backgroundColor: "oldlace",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  startGameButtonLabel: {
    color: "white",
  },
  instructionsButtonLabel: {
    color: "coral",
  },
  gameTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 26,
  },
});

export default MainMenuScreen;
