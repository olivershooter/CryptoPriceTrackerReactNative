import React from "react";
import { View, Text, FlatList } from "react-native";
import { useWatchList } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";

const WatchListScreen = () => {
  const { watchlistCoinIds } = useWatchList();
  console.log(watchlistCoinIds);
  return <FlatList data={watchlistCoinIds} />;
};

export default WatchListScreen;
