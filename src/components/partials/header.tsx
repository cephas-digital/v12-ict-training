import React from "react";
import Logo from "../layouts/logo";

const Header = () => {
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

export default Header;
