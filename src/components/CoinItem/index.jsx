import React from "react";
import { Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";

//accepting the prop marketCoin from app.js, which gives us ALL the attributes from the JSON
//filtering out in the function to the ones we need, i.e name, current_price, etc.
//then making this marketCoin
const CoinItem = ({ marketCoin }) => {
  const {
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  //simple function
  //if price_change_percentage_24h is less than 0
  //then display as the colour
  //else display as the other colour
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  //Function to fix the numbers so there isn't 13 numbers for the market cap
  //divide the market cap by the number to get a simpler int
  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1000000000000) {
      return `${Math.floor(marketCap / 1000000000000)} T`;
    }

    if (marketCap > 1000000000) {
      return `${Math.floor(marketCap / 1000000000)} B`;
    }

    if (marketCap > 1000000) {
      return `${Math.floor(marketCap / 1000000)} M`;
    }

    if (marketCap > 1000) {
      return `${Math.floor(marketCap / 1000)} K`;
    }

    return marketCap;
  };

  //lots of json being passed in for example {name}
  //mentioned elsewhere but doesn't need a key as the id is automatically found in react
  //all of these are coming from the const above with our chosen attributes
  return (
    <View style={styles.coinContainer}>
      <Image
        source={{ uri: image }}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: "white" }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </View>
  );
};

export default CoinItem;
