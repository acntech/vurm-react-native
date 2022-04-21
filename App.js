// import React, { useState } from "react";
import GameScreen from "./src/screens/GameScreen";
import MainMenuScreen, {
  startGame,
  instructions,
} from "./src/screens/MainMenuScreen";
import InstructionsScreen from "./src/screens/InstructionsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GAME_TITLE } from "./src/constants";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <HomeScreen label="Vurm" values={[START_GAME, INSTRUCTIONS]}></HomeScreen>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainMenu"
          component={MainMenuScreen}
          options={{ title: "Main Menu" }}
        />
        <Stack.Screen name={instructions} component={InstructionsScreen} />
        <Stack.Screen
          name={startGame}
          component={GameScreen}
          options={{ title: GAME_TITLE, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
