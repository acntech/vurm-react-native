// import React, { useState } from "react";
import GameScreen from "./src/screens/GameScreen";
import MainMenuScreen, {
  startGameLabel,
  instructionsLabel,
} from "./src/screens/MainMenuScreen";
import InstructionsScreen from "./src/screens/InstructionsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GAME_TITLE } from "./src/constants";
import LeaderboardScreen from "./src/screens/LeaderboardScreen";
import { LogBox } from "react-native";

// firebase has yet to fix this, see https://github.com/firebase/firebase-js-sdk/issues/1847
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
// See https://developer.apple.com/forums/thread/702391
LogBox.ignoreLogs([
  "[UIKitCore] -[UIApplication getKeyboardDevicePropertiesForSenderID:shouldUpdate:usingSyntheticEvent:],",
]);
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainMenu"
          component={MainMenuScreen}
          options={{ title: "Main Menu" }}
        />
        <Stack.Screen name={instructionsLabel} component={InstructionsScreen} />
        <Stack.Screen
          name={startGameLabel}
          component={GameScreen}
          options={{ title: GAME_TITLE, gestureEnabled: false }}
        />
        <Stack.Screen
          name={"Leaderboard"}
          component={LeaderboardScreen}
          options={{ title: "Leaderboard" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
