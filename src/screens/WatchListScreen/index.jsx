import React, { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useWatchlist } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import { getWatchlistedCoins } from "../../services/requests";

const WatchlistScreen = () => {
  const { watchlistCoinIds } = useWatchlist(); //our hook we created from the context

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchlistCoinIds.join("%2C"); //simple function that .join()s the coin ids

  //fetching the watchlisted coins
  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(
      1,
      transformCoinIds() //making sure to transform the incoming API call
    );
    setCoins(watchlistedCoinsData); //setting the coins to the watchlisted coins
    setLoading(false);
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]); //mounts the component and fetches the coins, but when the watchlistCoinIds changes, it will re-fetch the coins

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null}
        />
      }
    />
  );
};

export default WatchlistScreen;
