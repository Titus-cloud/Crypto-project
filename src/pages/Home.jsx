import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/CoinContext";

const Home = () => {
  const { allCoin, setAllCoin, currency, setCurrency } = useStateContext();
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
    console.log(displayCoin);
  }, [allCoin]);

  return (
    <div className="px-0 py-2.5 pb-[100px]">
      {/* hero */}
      <div className="max-w-[600px] my-[80px] mx-auto flex flex-col items-center text-center gap-7.5">
        <h1 className="text-[42px] font-bold ">
          Largest <br /> Crypto MarketPlace
        </h1>
        <p className="w-[75%] text-[#e3e3e3] ">
          Welcome to the world's cryptocurrency marketplace. Sign up to explore
          more cryptos.
        </p>
        <form className="p-2 w-[80%] border rounded text-[20px] flex justify-between items-center gap-2.5 bg-white text-black">
          <input
            type="text"
            placeholder="Search Crypto..."
            className="flex-1 text-[16px] outline-0 border-none pl-2.5 "
          />
          <button
            type="submit"
            className="border-none bg-[#7927ff] text-[16px] py-2 px-7.5 rounded cursor-pointer "
          >
            Search
          </button>
        </form>
      </div>

      {/* crypto table */}
      <div className="max-w-[800px] m-auto bg-[linear-gradient(rgba(84,3,255,0.15),_rgba(105,2,153,0.15))] rounded-sm ">
        {/* crypto layout */}
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-3 px-5 items-center border-b border-b-[#3c3c3c]">
          <p className="font-bold">#</p>
          <p className="font-bold">coins</p>
          <p className="font-bold">Price</p>
          <p className="text-center font-bold">24H Change</p>
          <p className="text-right font-bold">Market Cap</p>
        </div>
        {displayCoin.slice(0, 35).map((item, index) => {
          return (
            <div
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-3 px-5 items-center border-b border-b-[#3c3c3c] last:border-none"
              key={index}
            >
              <p>{item.market_cap_rank}</p>
              <div className="flex items-center gap-5 cursor-pointer">
                <img src={item.image} alt="" className="w-10" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p className="cursor-pointer">
                {currency.symbol} {item.current_price}
              </p>
              <p className={item.price_change_percentage_24h > 0 ? 'text-center text-green-500 cursor-pointer ' : 'text-center text-red-600 cursor-pointer'}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="text-right cursor-pointer">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
