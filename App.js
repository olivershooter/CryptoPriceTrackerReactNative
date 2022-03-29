import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import WatchlistProvider from "./src/Contexts/WatchlistContext";
import { RecoilRoot } from "recoil";
import { useFonts } from "expo-font";
import { Inter_900Black } from "@expo-google-fonts/inter";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Poppins_600SemiBold,
    DroidSans: require("./assets/fonts/DroidSans.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <NavigationContainer theme={{ colors: { background: "#121212" } }}>
      <RecoilRoot>
        <WatchlistProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="light" />
          </View>
        </WatchlistProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});
