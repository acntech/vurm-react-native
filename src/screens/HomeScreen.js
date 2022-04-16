import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

export const startGame = "Start Game";
export const instructions = "Instructions";

const HomeScreen = ({ navigation }) => {
  const title = "Vurm";

  const buttonLabels = [startGame, instructions];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.column}>
        {buttonLabels.map((buttonLabel) => (
          <TouchableOpacity
            key={buttonLabel}
            onPress={() => navigation.navigate(buttonLabel)}
            style={[
              styles.button,
              buttonLabel === startGame && styles.primaryButton,
            ]}
          >
            <Text
              style={[
                styles.buttonLabel,
                buttonLabel === startGame && styles.primaryButtonLabel,
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
    backgroundColor: "aliceblue",
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
