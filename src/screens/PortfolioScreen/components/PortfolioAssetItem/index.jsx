import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles.js";

const PortfolioAssetItem = () => {
  return (
    <View style={styles.coinContainer}>
      <Image source={{ uri: "" }} style={{ height: 30, width: 30 }} />
      <View>
        <Text style={styles.title}>Bitcoin</Text>
        <Text style={styles.ticker}>BTC</Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
