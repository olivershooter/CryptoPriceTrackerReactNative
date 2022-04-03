import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailedCoinData } from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]); //allCoins is the array of all the coins
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState(""); //boughtAssetQuantity is the quantity of the coin that is being bought
  const [loading, setLoading] = useState(false); //loading is the boolean that is used to show the loading screen
  const [selectedCoinId, setSelectedCoinId] = useState(null); //selectedCoinId is the id of the coin that is being bought
  const [selectedCoin, setSelectedCoin] = useState(null); //selectedCoin is the coin that is being bought

  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  ); //useRecoilState is used to get the data from the atom

  //this is the navigation hook
  const navigation = useNavigation();

  //this is the function that is called when the user presses the add button
  const isQuantityEntered = () => boughtAssetQuantity === "";

  //fetches all the coins from the API
  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  //fetches the detailed coin data from the API
  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailedCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  //use effect at start runs once when the component is loaded
  useEffect(() => {
    fetchAllCoins();
  }, []);

  //use effect runs every time the selectedCoinId changes
  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  //this function is called when the user presses the add button
  //it adds the coin to the assetsInStorage array
  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SearchableDropdown
        items={allCoins} //items is the array of all the coins
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinId || "Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={styles.ticker}>
                {selectedCoin.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoin.market_data.current_price.usd} per coin
            </Text>
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntered() ? "#303030" : "#4169E1",
            }}
            onPress={onAddNewAsset}
            disabled={isQuantityEntered()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntered() ? "grey" : "white",
              }}
            >
              Add New Asset
            </Text>
          </Pressable>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default AddNewAssetScreen;
