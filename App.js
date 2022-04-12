// import React, { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";
import InstructionsScreen from "./src/screens/InstructionsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <HomeScreen label="Vurm" values={[START_GAME, INSTRUCTIONS]}></HomeScreen>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen
          name="Start Game"
          component={GameScreen}
          options={{ title: "Vurm" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
