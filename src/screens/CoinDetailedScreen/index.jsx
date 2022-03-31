import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import FilterComponent from "./components/FilterComponent";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "../../services/requests";

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);

  //for the navigation, receive the object through the parameter
  const route = useRoute();

  const {
    params: { coinId },
  } = route;

  //this state lets us know if its loading or not
  const [loading, setLoading] = useState(false);

  //props is the data coming from outside, state is the data the components is responsible for
  //for the price converter function
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");

  //for price chart filtering
  const [selectedRange, setSelectedRange] = useState("1");

  //method to fetchCoinData
  //set loading so user knows the json is being fetched
  //make fetchedCoinData as await getDetailedCoinData with the params of the coinId
  //after getting said information set the coin to fetchedCoinData
  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
  }, []);

  //little method to display a loading icon
  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  //the colour of the percentage changes based on if it's below 0 or above 0
  //read like: if the price_change_percentage_24h is less than 0, then make the colour ea3943
  //otherwise if price_change_percentage_24h is more than 0, then make the colour 16c784
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

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
      if (current_price.usd < 1) {
        return `$${current_price.usd}`; //returns this value as default (toFixed turns a int to string, the param is to make it more suitable for currency)
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`; //returns this value as default (toFixed turns a int to string, the param is to make it more suitable for currency)
    }
    return `$${parseFloat(value).toFixed(2)}`; //(parsefloat changes number to string) the float is coming from the pointer on the chart, which is being assigned to value then fixed to two decimal
  };

  //you change the coin value (aka 2BTC) then change the USD value
  const changeCoinValue = (value) => {
    setCoinValue(value); //this needs to be a string for input so you can use decimals
    const floatValue = parseFloat(value.replace(",", ".")) || 0; //change the value to a float so we can multiply
    setUsdValue((floatValue * current_price.usd).toString()); // multiply then convert back to string for the usd result
  };

  //same as above but changing the USD value as opposed to the crypto
  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ChartPathProvider
        data={{
          points: prices.map(([x, y]) => ({ x, y })),
        }}
      >
        <CoinDetailedHeader
          coinId={id}
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
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.filtersContainer}>
          {filterDaysArray.map((day) => (
            <FilterComponent
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={onSelectedRangeChange}
              key={day.filterText}
            />
          ))}
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
