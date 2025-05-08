import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-[100vh] text-white bg-gradient-to-b from-[#0b004e] via-[#1d152f] to-[#002834] flex-wrap">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
