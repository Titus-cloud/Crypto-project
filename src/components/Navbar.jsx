import React, { useContext } from "react";
import Logo from "../assets/logo.png";
import arrow_icon from "../assets/arrow_icon.png";
import { useStateContext } from "../context/CoinContext";

const Navbar = () => {
  const { currency, setCurrency } = useStateContext();

  const currencyHandler = () => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "gbp":
        setCurrency({ name: "gbp", symbol: "£" });
        break;
      case "jpy":
        setCurrency({ name: "jpy", symbol: "¥" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };
  return (
    <div className="flex justify-between py-5 px-[10%] text-[#ddd] border-b-[#3c3c3c] border-b items-center">
      <img src={Logo} alt="" className="cursor-pointer w-[max(12vw, _120px)]" />
      <ul className="flex gap-10">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer">Pricing</li>
        <li className="cursor-pointer">Blog</li>
      </ul>

      {/* Nav right */}
      <div className="flex items-center gap-[max(1vw, 12px)] ">
        <select
          onChange={currencyHandler}
          className="py-1 px-2 border rounded bg-transparent text-white mr-3"
          defaultValue="usd"
        >
          <option className="bg-[#09005c] text-white" value="usd">
            USD 
          </option>
          <option className="bg-[#09005c] text-white" value="eur">
            EUR 
          </option>
          <option className="bg-[#09005c] text-white" value="gbp">
            GBP 
          </option>
          <option className="bg-[#09005c] text-white" value="jpy">
            JPY 
          </option>
          <option className="bg-[#09005c] text-white" value="inr">
            INR 
          </option>
        </select>

        <button className="flex items-center gap-2 py-[2px] px-1 rounded text-lg font-bold text-#393939 bg-white cursor-pointer ">
          Sign Up <img src={arrow_icon} alt="" className="w-6  " />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
