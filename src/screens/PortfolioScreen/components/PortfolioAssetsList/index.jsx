import React from "react";
import { View, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles.js";

//ea3943 || 16c784
const PortfolioAssetsList = () => {
  return (
    <View>
      <FlatList
        data={[]}
        renderItem={() => <Text>item</Text>}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>$20,000</Text>
                <Text style={styles.valueChange}>$1000 (All Time)</Text>
              </View>
              <View style={styles.priceChangePercentageContainer}>
                <AntDesign
                  name={"caretup"}
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>1.2%</Text>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
};

export default PortfolioAssetsList;
