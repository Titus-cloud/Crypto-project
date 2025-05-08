import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState()
  const { currency, setCurrency } = useStateContext();

const fetchHistoricalData = async() =>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-QNTu6WPCJpC8tguk2qfvBGEG'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
    .then(res => res.json())
    .then(res => setHistoricalData(res))
    .catch(err => console.error(err));
}

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
    fetchHistoricalData()
    console.log(coinData);
  }, [currency]);

  if (coinData, historicalData) {
    return (
      // coin
      <div>
        {/* coin name */}
        <div>
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()}){" "}
            </b>
          </p>
        </div>{" "}

        <div>
          <LineChart historicalData={historicalData}/>
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
