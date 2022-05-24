import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  SECONDARY_COLOR,
  SECONDARY_TEXT_COLOR,
} from "../colors";
import { GAME_TITLE } from "../constants";

export const startGameLabel = "Start Game";
export const instructionsLabel = "Instructions";
export const leaderboardLabel = "Leaderboard";

const MainMenuScreen = ({ navigation }) => {
  const navigateToGame = () => navigation.navigate(startGameLabel);
  const navigateToInstructions = () => navigation.navigate(instructionsLabel);
  const navigateToLeaderboard = () => navigation.navigate(leaderboardLabel);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.gameTitle}>{GAME_TITLE}</Text>
      <View style={styles.column}>
        <MainMenuButton
          onPress={navigateToGame}
          label={startGameLabel}
          buttonStyle={styles.primaryButton}
          labelStyle={styles.primaryButtonLabel}
        />
        <MainMenuButton
          onPress={navigateToInstructions}
          label={instructionsLabel}
          buttonStyle={styles.secondaryButton}
          labelStyle={styles.secondaryButtonLabel}
        />
        <MainMenuButton
          onPress={navigateToLeaderboard}
          label={leaderboardLabel}
          buttonStyle={styles.secondaryButton}
          labelStyle={styles.secondaryButtonLabel}
        ></MainMenuButton>
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
  },
  primaryButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  secondaryButton: {
    backgroundColor: SECONDARY_COLOR,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  primaryButtonLabel: {
    color: PRIMARY_TEXT_COLOR,
  },
  secondaryButtonLabel: {
    color: SECONDARY_TEXT_COLOR,
  },
  gameTitle: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 26,
  },
});

export default MainMenuScreen;
