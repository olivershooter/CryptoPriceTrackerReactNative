import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  ticker: {
    color: "gray",
    fontWeight: "700",
  },
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#121212",
  },
  quantityContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  coinImage: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
});

export default styles;
