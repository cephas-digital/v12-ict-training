import React, { useState } from "react";
import SideModalcontainer from "./sidemodalcontainer";
import Close from "../../assets/icons/close.svg";
import SearchInput from "../partials/inputs";
import { NormalBtn } from "../partials/buttons";

const SelectToolModal = ({ handleClose }) => {
  const [active, setActive] = useState("");
  const options = ["utility", "regulatory"];
  const utilities = [
    "Integrated Management Information System",
    "Real-time Monitoring Information System ",
    "NWASCO Information System (NIS)",
  ];
  const regulatories = [
    "ERP System - Nakuru",
    "Lusaka  Sanitation System",
    "Sanitracker",
    "Weyonje",
    "Equiserve",
  ];
  console.log(active);
  return (
    <div>
      <SideModalcontainer>
        <div
          style={{
            borderBottom: "1px solid #D9D9D9",
          }}
          className="h-12 w-full px-4 flex justify-between items-center"
        >
          <h5 className="text-base font-medium text-black">
            Select One Sanitation Tool
          </h5>
          <img onClick={handleClose} src={Close} alt="" className="" />
        </div>
        <div className="mt-6 px-4">
          <h5 className="text-base text-da-blue-600 font-medium">Category</h5>
          <div className="mt-5 space-y-4">
            {options?.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 capitalize mb-2 text-sm font-normal text-black"
              >
                <input
                  type="radio"
                  value={opt}
                  name="option"
                  checked={active === opt}
                  onChange={(e) => setActive(e.target.value)}
                  className="form-radio size-5 border border-[#AAB7C6]"
                />
                {opt}
              </label>
            ))}
          </div>
          <div className="mt-6">
            {active === "utility" && (
              <div className="">
                <SearchInput placeholder={"Search Tool"} />
                <div className="mt-5 space-y-4">
                  {utilities?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 capitalize mb-2 text-sm font-normal text-black"
                    >
                      <input
                        type="radio"
                        value={opt}
                        name="option"
                        checked={active === opt}
                        onChange={(e) => setActive(e.target.value)}
                        className="form-radio size-5 border border-[#AAB7C6]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )}
            {active === "regulatory" && (
              <div className="">
                <SearchInput placeholder={"Search Tool"} />
                <div className="mt-5 space-y-4">
                  {regulatories?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 capitalize mb-2 text-sm font-normal text-black"
                    >
                      <input
                        type="radio"
                        value={opt}
                        name="option"
                        checked={active === opt}
                        onChange={(e) => setActive(e.target.value)}
                        className="form-radio size-5 border border-[#AAB7C6]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-5 flex justify-end px-4 gap-5">
          <NormalBtn
            text={"Cancel"}
            onClick={handleClose}
            className="border border-[#A3A3A3] text-[#475569] bg-transparent"
          />
          <NormalBtn
            text={"Apply Filter"}
            onClick={() => {
              handleClose();
            }}
            className="bg-da-blue-100 text-white"
          />
        </div>
      </SideModalcontainer>
    </div>
  );
};

export default SelectToolModal;
