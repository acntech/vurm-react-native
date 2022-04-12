import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const title = "Vurm";
  const startGame = "Start Game";
  const instructions = "Instructions";

  const buttonLabels = [startGame, instructions];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.row}>
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
  },
  row: {
    flexDirection: "column",
    alignContent: "center",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "center",
    marginBottom: 6,
    minWidth: "48%",
  },
  primaryButton: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "500",
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
