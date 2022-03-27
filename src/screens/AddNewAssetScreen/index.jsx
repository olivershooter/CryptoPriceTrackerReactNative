import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
//using SearchableDropDown for ease rather than creating my own
import styles from "./styles";

const AddNewAssetScreen = () => {
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropDown
        items={[]}
        onItemSelect={(item) => console.log(item)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder="Search for an asset..."
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            textColor: "white",
          },
        }}
      />
      <View style={styles.boughtQuantityContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ fontSize: 90, color: "white" }}
            value={boughtAssetQuantity}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={setBoughtAssetQuantity}
          />
          <Text style={styles.ticker}>BTC</Text>
        </View>
        <Text style={styles.pricePerCoin}>$40000 per coin</Text>
      </View>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("AddNewAssetScreen")}
      >
        <Text style={styles.buttonText}>Add New Asset</Text>
      </Pressable>
    </View>
  );
};

export default AddNewAssetScreen;
