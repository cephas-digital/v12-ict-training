import React from "react";
import Pending from "../../assets/icons/pending.svg";
import Arrows from "../../assets/icons/arrows.svg";
import Good from "../../assets/icons/good.svg";
import Bad from "../../assets/icons/bad.svg";

const ProductTable = ({ products, start }) => {
  return (
    <div className="">
      <div
        style={{
          borderBottom: "1px solid #F1F5F9",
        }}
        className="flex px-1 justify-between items-center h-8 w-full bg-[#F8FAFC]"
      >
        <div className="flex gap-1 items-center">
          <h6 className="text-base font-medium text-da-blue-600">
            Product Info
          </h6>
          <img src={Arrows} alt="" className="" />
        </div>
        <div className="flex gap-1 items-center">
          <h6 className="text-base font-medium text-da-blue-600">Status</h6>
          <img src={Arrows} alt="" className="" />
        </div>
      </div>

      <div>
        {products.map((product, index) => (
          <div
            style={{
              borderBottom: "1px solid #F1F5F9",
            }}
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
            } flex justify-between px-1 h-8 items-center w-full`}
          >
            <span className=" text-da-blue-600 text-xs truncate w-5/6">
              {product.name}
            </span>
            <div className="flex justify-end">
              {!start && (
                <button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#D2D7D4]">
                  <img src={Pending} alt="" className="" />
                </button>
              )}
              {start && (
                <>
                  {product?.status === "good" ? (
                    <button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#BAFED2]">
                      <img src={Good} alt="" className="" />
                    </button>
                  ) : (
                    <button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#EF444433]">
                      <img src={Bad} alt="" className="" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
