import React from "react";

const WhiteBox = ({ children, className = "" }) => {
  return (
    <div
      style={{
        boxShadow: "4px 4px 100px 0px #00000014",
      }}
      className={`w-full min-h-72 bg-white rounded-lg p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export const WhiteBox2 = ({ children, className = "" }) => {
  return (
    <div
      style={{
        boxShadow: "4px 4px 100px 0px #00000014",
      }}
      className={`w-full bg-white rounded-lg p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default WhiteBox;
