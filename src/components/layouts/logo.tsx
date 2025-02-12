import React from "react";
import LogoIcon from "../../assets/icons/Layer_1-2.svg";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3
        onClick={() => navigate("/")}
        className="lg:text-lg text-base cursor-pointer text-white inter font-extrabold"
      >
        Water & Sanitation Tools Map
      </h3>
    </div>
  );
};

export const NewLogo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        onClick={() => navigate("/")}
        src={LogoIcon}
        alt=""
        className="cursor-pointer"
      />
    </div>
  );
};

export default Logo;
