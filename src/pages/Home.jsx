import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, setAllCoin, currency, setCurrency } = useStateContext();
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = () => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();

    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLocaleLowerCase());
    });

    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
    console.log(displayCoin);
  }, [allCoin]);

  return (
    <div className="px-0 py-2.5 pb-[100px]">
      {/* hero */}
      <div className="md:max-w-[600px] max-w-[400px] md:my-[80px] my-[50px] mx-auto flex flex-col items-center text-center md:gap-7.5 gap-6">
        <h1 className="md:text-[42px] text-[30px] font-bold ">
          Largest <br /> Crypto MarketPlace
        </h1>
        <p className="w-[75%] text-[#e3e3e3] ">
          Welcome to the world's cryptocurrency marketplace. Sign up to explore
          more cryptos.
        </p>
        <form
          className="p-2 md:w-[80%] w-[76%] border rounded md:text-[20px] text-[10px]  flex justify-between items-center gap-2.5 bg-white text-black"
          onSubmit={searchHandler}
        >
          <input
            onChange={inputHandler}
            required
            value={input}
            type="text"
            list="coinlist"
            placeholder="Search Crypto..."
            className="flex-1 md:text-[16px] text-[13px] outline-0 border-none pl-2.5 "
          />

          {/* DataList to hold all the sugestions */}
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button
            type="submit"
            className="border-none bg-[#7927ff] md:text-[16px] text-[13px] py-2 px-7.5 rounded cursor-pointer "
          >
            Search
          </button>
        </form>
      </div>

      {/* crypto table */}
      <div className="md:max-w-[800px] max-w-[600px] m-auto bg-[linear-gradient(rgba(84,3,255,0.15),_rgba(105,2,153,0.15))] rounded-sm ">
        {/* crypto layout */}
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] md:py-3 md:px-5 py-2 px-4 items-center border-b border-b-[#3c3c3c]">
          <p className="font-bold">#</p>
          <p className="font-bold">coins</p>
          <p className="font-bold">Price</p>
          <p className="text-center font-bold">24H Change</p>
          <p className="text-right font-bold">Market Cap</p>
        </div>
        {displayCoin.slice(0, 35).map((item, index) => {
          return (
            <Link to={`/coin/${item.id}`}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] md:py-3 md:px-5 py-2 px-4  items-center border-b border-b-[#3c3c3c] last:border-none"
              key={index}
            >
              <p>{item.market_cap_rank}</p>
              <div className="flex items-center md:gap-5 gap-3 cursor-pointer">
                <img src={item.image} alt="" className="md:w-10 w-8" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p className="cursor-pointer">
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0
                    ? "text-center text-green-500 cursor-pointer "
                    : "text-center text-red-600 cursor-pointer"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="text-right cursor-pointer">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
