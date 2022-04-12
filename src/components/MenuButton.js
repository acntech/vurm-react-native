import { StyleSheet, TouchableOpacity, Text } from "react-native";

const MenuButton = ({ text }) => {
  return (
    <TouchableOpacity styles={styles.button}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MenuButton;
