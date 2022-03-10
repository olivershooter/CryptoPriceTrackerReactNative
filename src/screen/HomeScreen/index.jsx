import React from "react";
import { FlatList } from "react-native";

import CoinItem from "../../components/CoinItem";
import cryptocurrency from "../../../assets/data/cryptocurrencies.json";

const HomeScreen = () => {
  return (
    <FlatList
      data={cryptocurrency} //passing in the JSON and sending the item as a prop to CoinItem.js
      renderItem={({ item }) => <CoinItem marketCoin={item} />} // no key needed (auto done)
    />
  );
};

export default HomeScreen;
