import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetches the coins with the pageNumber (which is 50 coins)
  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber); //this is the data that is returned from the API
    setCoins((existingCoins) => [...existingCoins, ...coinsData]); //addings existing coins to the new coins by spreading an array
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  }; //when the user pulls down the screen, this function is called

  useEffect(() => {
    fetchCoins();
  }, []); //when the component is mounted, this function is called

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "DroidSans",
            color: "white",
            fontSize: 25,
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingBottom: 5,
          }}
        >
          Cryptoassets
        </Text>
        <Text
          style={{ color: "lightgrey", fontSize: 12, paddingHorizontal: 10 }}
        >
          Powered by CoinGecko
        </Text>
      </View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
