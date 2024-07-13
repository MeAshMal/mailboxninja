import React from "react";
import { AiFillHeart } from "react-icons/ai";

const Header = () => {
  return (
    <header className="h-[10vh] flex px-5 items-center justify-between bg-orange-200">
      <img src="/logo.png" alt="Logo" className="w-[100px]" />
      <AiFillHeart className="fill-red-500 h-[10vh] w-[8vw] " />
    </header>
  );
};

export default Header;
