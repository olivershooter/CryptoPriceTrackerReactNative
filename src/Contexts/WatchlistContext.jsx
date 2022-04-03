import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//this is creating the context
const WatchlistContext = createContext();

//then exporting the context
//basically you need to wrap your component with the provider and then use the context allowing it to be managed globally
//https://www.w3schools.com/react/react_usecontext.asp
export const useWatchlist = () => useContext(WatchlistContext);

const WatchlistProvider = ({ children }) => {
  const [watchlistCoinIds, setWatchlistCoinIds] = useState([]);

  const getWatchlistData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchlistCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  }; //this function is to get the data from the storage (saved as @watchlist_coins) it needs to be parsed too

  useEffect(() => {
    getWatchlistData();
  }, []);

  //storing the selected watchlisted coins via their id
  const storeWatchlistCoinId = async (coinId) => {
    try {
      const newWatchlist = [...watchlistCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchlist);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchlistCoinIds(newWatchlist);
    } catch (e) {
      console.log(e);
    }
  };

  //removing watchlisted coin via their id
  const removeWatchlistCoinId = async (coinId) => {
    const newWatchlist = watchlistCoinIds.filter(
      (coinIdValue) => coinIdValue !== coinId
    ); //filtering out the coinId that is being removed
    const jsonValue = JSON.stringify(newWatchlist);
    await AsyncStorage.setItem("@watchlist_coins", jsonValue);
    setWatchlistCoinIds(newWatchlist); //setting the new watchlist
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
