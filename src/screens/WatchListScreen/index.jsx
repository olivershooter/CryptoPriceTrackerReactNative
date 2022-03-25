import React, { useContext, createContext, useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useWatchlist } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import { getWatchlistedCoins } from "../../services/requests";

const WatchListScreen = () => {
  const { watchlistCoinIds } = useWatchlist();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchlistCoinIds.join("%2C");

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(
      1,
      transformCoinIds() || []
    );
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchListedCoins();
  }, [watchlistCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={fetchWatchListedCoins}
        />
      }
    />
  );
};

export default WatchListScreen;
