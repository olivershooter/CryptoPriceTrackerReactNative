import axios from "axios";

//axios allows us to handle the json data from CoinGecko
//pass in coinId as a param because this is then inserted into the API call
//so if a user clicks on one of the coins in the list, the id will be replaced in the string calling the right coin
export const getDetailedCoinData = async (coinId) => {
  //put everything in a try/catch to wait for the try
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCoinMarketChart = async (coinId) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
