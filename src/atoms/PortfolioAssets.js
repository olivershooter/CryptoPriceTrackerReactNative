import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchlistedCoins } from "../services/requests";

//Atoms further reading: https://recoiljs.org/docs/atoms/
//AsyncStorage further reading: https://reactnative.dev/docs/asyncstorage

//Atom for the portfolio assets
//This atom is used to store the portfolio assets in the local storage
export const allPortfolioBoughtAssets = selector({
  key: "allPortfolioBoughtAssets",
  get: async () => {
    const jsonValue = await AsyncStorage.getItem("@portfolio_coins");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },
});

//Atom for the portfolio assets
export const allPortfolioBoughtAssetsFromAPI = selector({
  key: "allPortfolioBoughtAssetsFromAPI",

  get: async ({ get }) => {
    const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage); //get the portfolio assets from the local storage
    const portfolioAssetsMarketData = await getWatchlistedCoins(
      1,
      boughtPortfolioAssets.map((portfolioAsset) => portfolioAsset.id).join(",")
    ); //get the portfolio assets market data from the CoinGecko API and add it to the portfolio assets

    const boughtAssets = boughtPortfolioAssets.map((boughtAsset) => {
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item) => boughtAsset.id === item.id
      )[0];
      return {
        ...boughtAsset,
        currentPrice: portfolioAsset.current_price,
        priceChangePercentage: portfolioAsset.price_change_percentage_24h,
      }; //add the current price and price change percentage to the portfolio assets
      //the current price and price change percentage are retrieved from the CoinGecko API
    });

    return boughtAssets.sort(
      (item1, item2) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice
    ); //sort the portfolio assets by the largest current price
  },
});

export const allPortfolioAssets = atom({
  key: "allPortfolioAssets",
  default: allPortfolioBoughtAssetsFromAPI,
}); //exporting the atom for the portfolio assets

export const allPortfolioBoughtAssetsInStorage = atom({
  key: "allPortfolioBoughtAssetsInStorage",
  default: allPortfolioBoughtAssets,
}); //exporting the atom for the portfolio assets in the local storage
