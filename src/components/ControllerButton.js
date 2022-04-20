import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const ControllerButton = ({ label, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={[styles.buttonLabel]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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

export default ControllerButton;
