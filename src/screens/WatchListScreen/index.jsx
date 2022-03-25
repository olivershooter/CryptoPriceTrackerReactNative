import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useWatchList } from "../../Contexts/WatchlistContext";

const WatchListScreen = () => {
  const { watchlistCoinIds } = useWatchList();
  return (
    <View>
      <Text style={{ color: "white" }}>Hello</Text>
    </View>
  );
};

export default WatchListScreen;
