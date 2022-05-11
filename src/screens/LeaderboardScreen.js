import { SafeAreaView } from "react-native";

import Leaderboard from "../components/Leaderboard";
import Social from "../components/Social";
const LeaderboardScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Leaderboard scrollEnabled={true}></Leaderboard>
      <Social></Social>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
