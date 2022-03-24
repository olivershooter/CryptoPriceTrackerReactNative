import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests.js";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  //asynchronously grabbing the pageNumber from the gecko API
  //this functionally grabs the data and sets it to coins
  //spreading to the array as oppose to making separate arrays for the flatlist
  //finally load function to prevent spamming the API on constant refreshes
  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  //same as above but this time just setting it back to our original 50 coins
  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  //on mount just have the top 50 coins
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    //Flatlist with the data for the home screen
    //the params are the data from the json, parsed via the named function
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      onEndReached={() => fetchCoins(coins.length / 50 + 1)} //do it this way because the list is 50 items long, divide by it and add one = new page number
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={refetchCoins}
        /> //cool thing refresh control
      }
    />
  );
};

export default HomeScreen;
