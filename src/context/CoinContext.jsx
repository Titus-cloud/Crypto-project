import React, { createContext, useContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "USD",
    Symbol: "$",
  });

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-QNTu6WPCJpC8tguk2qfvBGEG",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoin(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  // const contextValue = {
  //   allCoin,
  // };
  return (
    <CoinContext.Provider
      value={{ allCoin, currency, setCurrency, setAllCoin }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useStateContext = () => useContext(CoinContext);

// CG-QNTu6WPCJpC8tguk2qfvBGEG
