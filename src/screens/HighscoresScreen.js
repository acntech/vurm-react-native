import { SafeAreaView } from "react-native";

import HighscoreTable from "../components/HighscoreTable";
import LogInOutButton from "../components/LogInOutButton";
const HighscoresScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HighscoreTable></HighscoreTable>
      <LogInOutButton></LogInOutButton>
    </SafeAreaView>
  );
};

export default HighscoresScreen;
