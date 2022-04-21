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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
