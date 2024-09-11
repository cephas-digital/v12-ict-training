import React from "react";
import LogoIcon from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router";

const Logo = () => {
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
