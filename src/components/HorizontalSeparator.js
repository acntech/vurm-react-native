import { View, Text } from "react-native";
export default HorizontalSeparator = ({ text }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
    <View>
      <Text style={{ textAlign: "center" }}>{`${text}     `}</Text>
    </View>
    <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
  </View>
);
