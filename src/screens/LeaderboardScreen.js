import { SafeAreaView } from "react-native";

import Leaderboard from "../components/Leaderboard";
import SocialLogin from "../components/SocialLogin";

const LeaderboardScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Leaderboard></Leaderboard>
      <SocialLogin></SocialLogin>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
