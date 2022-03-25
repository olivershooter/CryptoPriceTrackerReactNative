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

  return (
    <WatchlistContext.Provider value={{ watchlistCoinIds }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
