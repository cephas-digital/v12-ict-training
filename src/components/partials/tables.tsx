import React from "react";
import Pending from "../../assets/icons/pending.svg";
import Arrows from "../../assets/icons/arrows.svg";
import Good from "../../assets/icons/good.svg";
import Bad from "../../assets/icons/bad.svg";

const ProductTable = ({ products, start }) => {
  return (
    <div className="">
      <table className="min-w-full table-auto bg-white">
        <thead>
          <tr className="bg-[#F8FAFC] text-left">
            <th className="py-4 text-sm font-semibold text-gray-800">
              Product Info
              <button className="ml-1">
                <img src={Arrows} alt="" className="" />
              </button>
            </th>
            <th className="py-4 text-sm text-right font-semibold text-gray-800">
              Status
              <button className="ml-2">
                <img src={Arrows} alt="" className="" />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
            >
              <td className="py-4 text-da-blue-600 text-xs whitespace-nowrap">
                {product.name}
              </td>
              <td className="py-4 flex justify-end">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
