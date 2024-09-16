import React, { useState } from "react";
import SideModalcontainer from "./sidemodalcontainer";
import Close from "../../assets/icons/close.svg";
import Reset from "../../assets/icons/reset.svg";
import SearchInput from "../partials/inputs";
import { NormalBtn } from "../partials/buttons";

const filters = [
  {
    id: "region",
    label: "Region",
    options: [
      "All Regions",
      "Central Africa",
      "Eastern Africa",
      "Sourthern Africa",
      "South Asis",
      "Western Africa",
    ],
    type: "checkbox",
  },
  {
    id: "country",
    label: "Country",
    options: [
      "Angola",
      "Botswana",
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Democratic Republic of the Congo",
    ],
    type: "checkbox",
  },
];

const SelectRegion = ({ handleClose, setStart }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    filters.reduce((acc, filter) => {
      acc[filter.id] = filter.type === "radio" ? "" : [];
      return acc;
    }, {})
  );

  const handleOptionChange = (filterId, option, type) => {
    setSelectedOptions((prev) => {
      if (type === "checkbox") {
        const isSelected = prev[filterId].includes(option);
        return {
          ...prev,
          [filterId]: isSelected
            ? prev[filterId].filter((item) => item !== option)
            : [...prev[filterId], option],
        };
      } else if (type === "radio") {
        return {
          ...prev,
          [filterId]: option,
        };
      }
      return prev;
    });
  };

  const handleReset = (filterId, type) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [filterId]: type === "radio" ? "" : [],
    }));
  };
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
            Filter by Geography
          </h5>
          <img onClick={handleClose} src={Close} alt="" className="" />
        </div>
        <div className="p-4 space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="">
              <div className="flex justify-between items-center">
                <h5 className="text-base text-da-blue-600 font-medium">
                  {filter.label}
                </h5>
                <img
                  onClick={() => handleReset(filter.id, filter.type)}
                  src={Reset}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-3">
                <SearchInput placeholder={`Search ${filter?.label}`} />
              </div>
              <div className="mt-4">
                {filter.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 mb-2 text-sm font-normal text-black"
                  >
                    <input
                      type={filter.type}
                      name={filter.id} // For radio buttons to group options
                      checked={
                        filter.type === "checkbox"
                          ? selectedOptions[filter.id].includes(option)
                          : selectedOptions[filter.id] === option
                      }
                      onChange={() =>
                        handleOptionChange(filter.id, option, filter.type)
                      }
                      className="form-checkbox size-5 border border-[#AAB7C6] "
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="my-5 flex justify-end gap-5">
          <NormalBtn
            text={"Cancel"}
            onClick={handleClose}
            className="border border-[#A3A3A3] text-[#475569] bg-transparent"
          />
          <NormalBtn
            text={"Apply Filter"}
            onClick={() => {
              setStart();
              handleClose();
            }}
            className="bg-da-blue-100 text-white"
          />
        </div>
      </SideModalcontainer>
    </div>
  );
};

export default SelectRegion;
