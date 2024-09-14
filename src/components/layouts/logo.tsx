import React from "react";
// import LogoIcon from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3
        onClick={() => navigate("/")}
        className="text-2xl cursor-pointer text-white inter font-extrabold"
      >
        Water & Sanitation Tools Map
      </h3>
      {/* <img
        onClick={() => navigate("/")}
        src={LogoIcon}
        alt=""
        className="cursor-pointer"
      /> */}
    </div>
  );
};

export default Logo;
