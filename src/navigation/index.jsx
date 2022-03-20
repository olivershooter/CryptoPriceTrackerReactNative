import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CoinDetailedScreen from "../screens/CoinDetailedScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  //Stack.Navigator holds the screens in the app
  //obviously "Stack" comes from the const above
  //name can be anything, component is how we tell it where to look
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"Home"} component={HomeScreen} />
      <Stack.Screen
        name={"CoinDetailedScreen"}
        component={CoinDetailedScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
