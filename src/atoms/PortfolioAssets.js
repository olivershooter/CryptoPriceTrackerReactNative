import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchlistedCoins } from "../services/requests";
//what is an atom?
//https://recoiljs.org/docs/basic-tutorial/atoms/

export const allPortfolioBoughtAssets = selector({
  key: "allPortfolioBoughtAssets", // unique ID (with respect to other atoms/selectors)
  get: async () => {
    const jsonValue = await AsyncStorage.getItem("@portfolio_coins"); //get the value from the storage
    return jsonValue != null ? JSON.parse(jsonValue) : []; //if the value is not null, return it, else return an empty array
  },
});

export const allPortfolioBoughtAssetsFromAPI = selector({
  key: "allPortfolioBoughtAssetsFromAPI", // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);
    const portfolioAssetsMarketData = await getWatchlistedCoins(
      1,
      boughtPortfolioAssets.map((portfolioAsset) => portfolioAsset.id).join(",")
    ); //get the market data for the coins in the portfolio

    //loop through the portfolio assets and add the market data to the portfolio asset
    const boughtAssets = boughtPortfolioAssets.map((boughtAsset) => {
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item) => boughtAsset.id === item.id
      )[0];
      return {
        ...boughtAsset,
        currentPrice: portfolioAsset.currentPrice,
        priceChangePercentage: portfolioAsset.price_change_percentage_24,
      }; //return the portfolio asset with the market data
    });

    //returning the bought assets organized by money made
    return boughtAssets.sort(
      (item1, item2) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice
    );
  },
});

export const allPortfolioAssets = atom({
  key: "allPortfolioAssets", // unique ID (with respect to other atoms/selectors)
  default: allPortfolioBoughtAssetsFromAPI, // default value (aka initial value)
});

export const allPortfolioBoughtAssetsInStorage = atom({
  key: "allPortfolioBoughtAssetsInStorage", // unique ID (with respect to other atoms/selectors)
  default: allPortfolioBoughtAssets, // default value (aka initial value)
});
