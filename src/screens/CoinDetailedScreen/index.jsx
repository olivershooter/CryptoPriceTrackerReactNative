import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import Coin from "../../../assets/data/crypto.json";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";

//values coming from the crypto json
//can parse data further with the {}
const CoinDetailedScreen = () => {
  const {
    image: { small },
    name,
    symbol,
    prices,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = Coin;

  //props is the data coming from outside, state is the data the components is responsible for
  //for the price converter function
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState(current_price.usd.toString());

  //the colour of the percentage changes based on if it's below 0 or above 0
  //read like: if the price_change_percentage_24h is less than 0, then make the colour ea3943
  //otherwise if price_change_percentage_24h is more than 0, then make the colour 16c784
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  //changing the colour of the chart with the same formula as above
  //the prices[0][1] is the plotting marks (X,Y)
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

  //needed for the @rainbow-me/animated-charts
  const screenWidth = Dimensions.get("window").width;

  //this updates the value at the top of the screen
  //"value" is being passed in as an argument with nothing assigned
  const formatCurrency = (value) => {
    //"worklet" only updates the UI thread instead of Javascript, "worklet" is part of the animated-charts library
    //this means that you save a function because you dont need to update constantly (also its quicker)
    //it will also snapback to the original value
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`; //returns this value as default (toFixed turns a int to string, the param is to make it more suitable for currency)
    }
    return `$${parseFloat(value).toFixed(2)}`; //(parsefloat changes number to string) the float is coming from the pointer on the chart, which is being assigned to value then fixed to two decimal
  };

  //you change the coin value (aka 2BTC) then change the USD value
  const changeCoinValue = (value) => {
    setCoinValue(value); //this needs to be a string for input so you can use decimals
    const floatValue = parseFloat(value.replace(",", ".")) || 0; //change the value to a float so we can multiply
    setUsdValue((floatValue * current_price.usd).toString()); // multiply then convert back to string for the usd result
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ChartPathProvider
        data={{
          points: prices.map(([x, y]) => ({ x, y })),
          smoothingStrategy: "bezier",
        }}
      >
        <CoinDetailedHeader
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <ChartYLabel format={formatCurrency} style={styles.currentPrice} />
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <ChartPath
            strokeWidth={2} //make the line thicker
            height={screenWidth / 2}
            stroke={chartColor}
            width={screenWidth}
          />
          <ChartDot style={{ backgroundColor: chartColor }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput //text input always returns string even though numeric is set
              style={styles.input}
              value={coinValue} //comes from the useState
              keyboardType="numeric"
              onChangeText={changeCoinValue} //comes from the function
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue} //comes from the useState
              keyboardType="numeric"
              onChangeText={changeUsdValue} //comes from the function
            />
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
};

export default CoinDetailedScreen;
