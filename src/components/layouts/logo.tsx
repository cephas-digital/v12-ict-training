import React from "react";
import LogoIcon from "../../assets/images/vlogo.png";
import LogoIconS from "../../assets/images/footerlogo.png";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        onClick={() => navigate("/")}
        src={LogoIcon}
        alt=""
        className="cursor-pointer h-16 w-20 mb-5"
      />
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
        className="cursor-pointer w-20 h-16"
      />
    </div>
  );
};

export default Logo;
