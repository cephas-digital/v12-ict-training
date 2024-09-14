import React from "react";
import Logo from "../layouts/logo";
import { useNavigate } from "react-router";
import Notification from "../../assets/icons/notification.svg";
import Messaging from "../../assets/icons/messaging.svg";

const Header = () => {
  const navigate = useNavigate();
  const links = [
    {
      name: "about",
      url: "/about",
    },
    {
      name: "resources",
      url: "/resources",
    },
    {
      name: "help",
      url: "/help",
    },
  ];
  return (
    <div>
      <div className="w-full relative h-28 bg-transparent">
        <div className="section-container flex h-full items-center justify-between">
          <div>
            <Logo />
          </div>
          <div className="flex gap-10 items-center capitalize text-base h-full text-white inter font-medium">
            {links?.map((l, i) => (
              <h6 key={i} className="cursor-pointer">
                {l?.name}
              </h6>
            ))}
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                border: "2px solid #FFFFFF",
              }}
              className="h-12 w-40 bg-transparent rounded-xl text-base inter font-medium text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageHeader = () => {
  return (
    <div className="w-full bg-[#142239] h-20 flex justify-between items-center">
      <div className="w-[25%] h-full flex items-center pl-6 border-r border-r-[#C4C4C4]">
        <Logo />
      </div>
      <div className="flex gap-5 items-center pr-6">
        <img src={Notification} alt="" className="" />
        <img src={Messaging} alt="" className="" />
      </div>
    </div>
  );
};

export default Header;
