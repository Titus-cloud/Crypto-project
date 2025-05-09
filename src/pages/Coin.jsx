import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency, setCurrency } = useStateContext();

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-QNTu6WPCJpC8tguk2qfvBGEG",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-QNTu6WPCJpC8tguk2qfvBGEG",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
    console.log(coinData);
  }, [currency]);

  if ((coinData, historicalData)) {
    return (
      // coin
      <div className="px-0 py-5">
        {/* coin name */}
        <div className="flex flex-col items-center gap-5 mx-[100px] my-auto mb-12.5 ">
          <img src={coinData.image.large} alt="" className="max-w-[100px]  "/>
          <p className="text-[44px] font-bold">
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()}){" "}
            </b>
          </p>
        </div>{" "}
        <div className="max-w-[600px] h-[250px] m-auto ">
          <LineChart historicalData={historicalData} />
        </div>
        {/* coin info */}
        <div className="max-w-[600px] my-[50px] mx-auto flex flex-col">
          <ul className="flex justify-between px-2.5 py-0 border-b border-[#5f5f5f] ">
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>

           <ul className="flex justify-between px-2.5 py-0 border-b border-[#5f5f5f] ">
            <li>Current Rank</li>
            {currency &&
              coinData?.market_data?.current_price[currency.name] && (
                <li>
                  {currency.symbol}{" "}
                  {coinData.market_data.current_price[
                    currency.name
                  ].toLocaleString()}
                </li>
              )}
          </ul>

           <ul className="flex justify-between px-2.5 py-0 border-b border-[#5f5f5f] ">
            <li>Market Cap</li>
            {currency &&
              coinData?.market_data?.current_price[currency.name] && (
                <li>
                  {currency.symbol}{" "}
                  {coinData.market_data.market_cap[
                    currency.name
                  ].toLocaleString()}
                </li>
              )}
          </ul>

           <ul className="flex justify-between px-2.5 py-0 border-b border-[#5f5f5f] ">
            <li>24 Hour high</li>
            {currency &&
              coinData?.market_data?.current_price[currency.name] && (
                <li>
                  {currency.symbol}{" "}
                  {coinData.market_data.high_24h[
                    currency.name
                  ].toLocaleString()}
                </li>
              )}
          </ul>

          <ul className="font-semibold flex justify-between px-2.5 py-0 border-b border-[#5f5f5f]">
            <li>24 Hour low</li>
            {currency &&
              coinData?.market_data?.current_price[currency.name] && (
                <li>
                  {currency.symbol}{" "}
                  {coinData.market_data.low_24h[
                    currency.name
                  ].toLocaleString()}
                </li>
              )}
          </ul>
        </div>
      </div>
    );
  } else {
    // spiner
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-purple-700 rounded-full animate-spin"></div>
    </div>;
  }
};

export default Coin;
