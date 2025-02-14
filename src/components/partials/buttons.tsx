import React from "react";

const PrimaryBtn = ({ icon, text, onClick, className = "" }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center gap-1 justify-center px-5 h-10 rounded-lg bg-da-blue-100 ${className}`}
      >
        <img src={icon} alt="" className="" />
        <span className="text-sm font-normal text-white inter">{text}</span>
      </button>
    </div>
  );
};

export const MainBtn = ({ icon, onClick, text, className = "" }) => {
  return (
    <div onClick={onClick}>
      <button
        style={{
          border: "1px solid #A3A3A3",
          boxShadow: "0px 15px 50px 0px #AFB0B926",
        }}
        className={`flex items-center gap-1 justify-center ${className} px-5 h-10 rounded-lg bg-transparent `}
      >
        <img src={icon} alt="" className="" />
        <span className="text-sm font-normal text-[#475569] inter">{text}</span>
      </button>
    </div>
  );
};
export const AnotherButton = ({ icon, onClick, text, className = "" }) => {
  return (
    <div>
      <button
        style={{
          border: "1px solid #A3A3A3",
          color: "white",
          boxShadow: "0px 15px 50px 0px #AFB0B926",
        }}
        onClick={onClick}
        className={`flex items-center gap-1 justify-center px-5 h-10 text-white rounded-lg bg-da-blue-500 `}
      >
        <img src={icon} alt="" className="" />
        <span className="text-sm font-normal text-[#475569] inter">{text}</span>
      </button>
    </div>
  );
};

export const NormalBtn = ({
  onClick,
  disabled = false,
  text,
  className = "",
}) => {
  return (
    <div>
      <button
        disabled={disabled}
        style={{
          boxShadow: "0px 15px 50px 0px #AFB0B926",
        }}
        onClick={onClick}
        className={`px-5 h-10 disabled:cursor-not-allowed text-sm font-normal ${className} inter rounded-lg`}
      >
        {text}
      </button>
    </div>
  );
};

export default PrimaryBtn;
