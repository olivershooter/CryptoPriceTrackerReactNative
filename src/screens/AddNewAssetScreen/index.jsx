import React from "react";
import { View } from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
//using SearchableDropDown for ease rather than creating my own
import styles from "./styles";

const AddNewAssetScreen = () => {
  return (
    <View>
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
    </View>
  );
};

export default AddNewAssetScreen;
