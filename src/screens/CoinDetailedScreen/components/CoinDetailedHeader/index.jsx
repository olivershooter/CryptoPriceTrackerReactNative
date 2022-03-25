import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../Contexts/WatchlistContext";

//image, symbol, and marketCapRank coming from CoinDetailedScreen
//this is just for the header of the screen
const CoinDetailedHeader = (props) => {
  //passing in props, doing it this way is cleaner than having props.marketCapRank
  const { coinId, image, symbol, marketCapRank } = props;
  const navigation = useNavigation(); //using the navigation hook
  const { watchlistCoinIds } = useWatchList(); //using the watchlist hook we created

  const checkIfCoinIsWatchlisted = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId); //check if the coin is in the watchlist

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchlisted ? "star" : "star-o"}
        size={25}
        color={checkIfCoinIsWatchlisted ? "#FFBF00" : "white"} //if the coin is in the watchlist, change the color
      />
    </View>
  );
};

export default CoinDetailedHeader;
