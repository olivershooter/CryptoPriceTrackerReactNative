import React from "react";
import { FlatList } from "react-native";
import CoinItem from "../../components/CoinItem";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";

const HomeScreen = () => {
  return (
    //Flatlist with the data for the home screen
    //the params are the data from the json, parsed via the named function
    <FlatList
      data={cryptocurrencies}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
    />
  );
};

export default HomeScreen;
