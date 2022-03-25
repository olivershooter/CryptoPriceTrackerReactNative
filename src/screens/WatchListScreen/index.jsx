import React from "react";
import { View, Text, FlatList } from "react-native";
import { useWatchList } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";

const WatchListScreen = () => {
  const { watchlistCoinIds } = useWatchList();
  return (
    <FlatList
      data={watchlistCoinIds}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
    />
  );
};

export default WatchListScreen;
