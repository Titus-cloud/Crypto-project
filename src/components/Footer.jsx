import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center pb-5 text-[#ddd] border-t border-[#989898] max-w-[80%] m-auto pt-6 ">
      <p className="text-center">
        Copyright @ {new Date().getFullYear()} CryptoPalace - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
