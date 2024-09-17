import React, { useState } from "react";
import Pending from "../../assets/icons/pending.svg";
import Arrows from "../../assets/icons/arrows.svg";
import Good from "../../assets/icons/good.svg";
import Bad from "../../assets/icons/bad.svg";
import { FaAngleDown, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import List from "../../assets/icons/list.svg";
import ListActive from "../../assets/icons/list-active.svg";
import Map from "../../assets/icons/map.svg";
import MapActive from "../../assets/icons/map-active.svg";
import Infra from "../../assets/icons/infra.svg";

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

const tableData = [
  {
    category: "Technical (Operations and Maintenance)",
    subcategories: [
      {
        name: "Infrastructure and Stability",
        rows: [
          { label: "Asset inventory", tool1: false, tool2: false },
          {
            label: "Asset (system) renewal / replacement",
            tool1: true,
            tool2: true,
          },
          { label: "Sewerage system integrity", tool1: true, tool2: false },
          { label: "Planned maintenance", tool1: false, tool2: true },
        ],
      },
      {
        name: "Operational Optimization",
        rows: [
          { label: "Resource Optimization", tool1: false, tool2: false },
          {
            label: "Sewerage management efficiency",
            tool1: true,
            tool2: false,
          },
        ],
      },
      {
        name: "Operational Resiliency",
        rows: [
          {
            label: "Recordable incidents of injury or illness",
            tool1: true,
            tool2: false,
          },
          {
            label: "Risk assessment and response preparedness",
            tool1: true,
            tool2: false,
          },
        ],
      },
    ],
  },
  {
    category: "Commercial (Consumer / Payor Demands)",
    subcategories: [
      {
        name: "Customer Satisfaction",
        rows: [
          { label: "Customer complaints", tool1: true, tool2: true },
          { label: "Customer service delivery", tool1: false, tool2: false },
          { label: "Customer satisfaction", tool1: true, tool2: false },
        ],
      },
    ],
  },
];

export const ToolsTable = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("list");
  return (
    <div>
      <div className="w-full mt-12 grid grid-cols-6">
        <div className="col-span-4 pt-8 flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <FaAngleLeft
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h6 className="text-xl font-medium text-da-blue-600">
              Compare Tools
            </h6>
          </div>
          <div className="pr-8 flex gap-10">
            <div className="flex items-center gap-5">
              <h6 className="text-base font-medium text-[#334155]">
                Switch View:
              </h6>
              <div className="flex items-center gap-2">
                <img
                  src={tab === "list" ? ListActive : List}
                  alt=""
                  onClick={() => setTab("list")}
                  className="cursor-pointer"
                />
                <img
                  src={tab === "map" ? MapActive : Map}
                  alt=""
                  onClick={() => setTab("map")}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <h6 className="text-[#334155] font-medium text-base">
              Make a selection here:
            </h6>
          </div>
        </div>
        <div
          style={{
            borderWidth: "0.4px 0.4px 0px 0.4px",
            borderStyle: "solid",
            borderColor: "#000000",
          }}
          className="col-span-1 h-24 p-2"
        >
          <h6 className="text-sm font-medium inter text-[#1E293B]">Compare</h6>
          <div
            style={{
              border: "1px solid #E2E8F0",
            }}
            className="h-10 mt-2 w-full rounded-lg bg-white px-2 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-[#334155]">
              Select Sanitation tool
            </span>
            <FaAngleDown />
          </div>
        </div>
        <div
          style={{
            borderWidth: "0.4px 0.4px 0px 0.4px",
            borderStyle: "solid",
            borderColor: "#000000",
          }}
          className="col-span-1 h-24 p-2"
        >
          <h6 className="text-sm font-medium inter text-[#1E293B]">Compare</h6>
          <div
            style={{
              border: "1px solid #E2E8F0",
            }}
            className="h-10 mt-2 w-full rounded-lg bg-white px-2 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-[#334155]">
              Select Sanitation tool
            </span>
            <FaAngleDown />
          </div>
        </div>
      </div>
      {tableData?.map((t) => (
        <div
          style={{
            borderWidth: "0.4px 0.4px 0 0.4px",
            borderStyle: "solid",
            borderColor: "#000000",
          }}
          className="w-full grid grid-cols-6"
        >
          <div className="col-span-1 pt-8 px-3">
            <p className="text-base font-bold text-[#334155]">{t?.category}</p>
          </div>
          <div
            style={{
              borderWidth: "0px 0.4px 0 0.4px",
              borderStyle: "solid",
              borderColor: "#000000",
            }}
            className="col-span-1"
          >
            {t?.subcategories?.map((sub, index, array) => (
              <div
                key={index}
                style={{
                  borderWidth:
                    index === array.length - 1 ? "0px" : "0px 0 0.4px 0",
                  borderStyle: "solid",
                  borderColor: "#000000",
                }}
                className="flex min-h-14 items-center gap-3"
              >
                <img src={Infra} alt="" className="" />
                <small className="text-base font-medium text-[#334155]">
                  {sub.name}
                </small>
              </div>
            ))}
          </div>
          <div
            style={{
              borderWidth: "0px 0.4px 0 0",
              borderStyle: "solid",
              borderColor: "#000000",
            }}
            className="col-span-2"
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ProductTable;

// <div>
//   <div className="overflow-x-auto">
//     <table className="min-w-full table-auto border-collapse border">
//       <thead>
//         <tr>
//           <th className="border px-4 py-2">Category</th>
//           <th className="border px-4 py-2">Subcategory</th>
//           <th className="border px-4 py-2">Description</th>
//           <th className="border px-4 py-2">Tool 1</th>
//           <th className="border px-4 py-2">Tool 2</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((section, sectionIndex) => (
//           <React.Fragment key={sectionIndex}>
//             {section.subcategories.map((subcategory, subIndex) => (
//               <React.Fragment key={subIndex}>
//                 {/* Render the main category once, spanning all subcategories and their rows */}
//                 {subIndex === 0 && (
//                   <tr>
//                     <td
//                       className="border px-4 py-2 bg-gray-200"
//                       rowSpan={section.subcategories.reduce(
//                         (acc, sub) => acc + sub.rows.length,
//                         0
//                       )}
//                     >
//                       {section.category}
//                     </td>
//                     <td
//                       className="border px-4 py-2 bg-gray-100"
//                       rowSpan={subcategory.rows.length}
//                     >
//                       {subcategory.name}
//                     </td>
//                     <td className="border px-4 py-2">
//                       {subcategory.rows[0].label}
//                     </td>
//                     <td className="border px-4 py-2 text-center">
//                       {subcategory.rows[0].tool1 ? "✅" : "❌"}
//                     </td>
//                     <td className="border px-4 py-2 text-center">
//                       {subcategory.rows[0].tool2 ? "✅" : "❌"}
//                     </td>
//                   </tr>
//                 )}

//                 {/* For remaining rows within each subcategory */}
//                 {subcategory.rows.slice(1).map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     <td className="border px-4 py-2">{row.label}</td>
//                     <td className="border px-4 py-2 text-center">
//                       {row.tool1 ? "✅" : "❌"}
//                     </td>
//                     <td className="border px-4 py-2 text-center">
//                       {row.tool2 ? "✅" : "❌"}
//                     </td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </React.Fragment>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
