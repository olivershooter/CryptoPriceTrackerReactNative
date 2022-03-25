//Context API for research
import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "react-native-async-storage/async-storage";

const WatchlistContext = createContext();

export const useWatchList = () => useContext(WatchlistContext);

const WatchlistProvider = ({ children }) => {
  const [watchlistCoinIds, setWatchlistCoinIds] = useState([]);

  //grabbing the data from Async storage which can store strings
  //this is like a local database on the phone, delete the app = delete the watchlist
  const getWatchlistData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchlistCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []); //need to make sure its not empty
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    getWatchlistData();
  }, []);

  //storing the watchlist data in Async storage
  const storeWatchlistData = async (coinId) => {
    try {
      const newWatchlist = [...watchlistCoinIds, coinId]; //adding the coinId to the watchlist
      const jsonValue = JSON.stringify(newWatchlist); //converting the array to a string
      await AsyncStorage.setItem("@watchlist_coins", jsonValue); //saving the string to Async storage
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlistCoinIds }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
