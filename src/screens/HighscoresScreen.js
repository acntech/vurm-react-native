import { SafeAreaView, View, Text } from "react-native";

import HighscoreTable from "../components/HighscoreTable";
import Social from "../components/Social";
const HighscoresScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HighscoreTable></HighscoreTable>
      <Social></Social>
    </SafeAreaView>
  );
};

export default HighscoresScreen;
