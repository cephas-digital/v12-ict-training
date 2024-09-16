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
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Subcategory</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Tool 1</th>
              <th className="border px-4 py-2">Tool 2</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {section.subcategories.map((subcategory, subIndex) => (
                  <React.Fragment key={subIndex}>
                    {/* Render the main category once, spanning all subcategories and their rows */}
                    {subIndex === 0 && (
                      <tr>
                        <td
                          className="border px-4 py-2 bg-gray-200"
                          rowSpan={section.subcategories.reduce(
                            (acc, sub) => acc + sub.rows.length,
                            0
                          )}
                        >
                          {section.category}
                        </td>
                        <td
                          className="border px-4 py-2 bg-gray-100"
                          rowSpan={subcategory.rows.length}
                        >
                          {subcategory.name}
                        </td>
                        <td className="border px-4 py-2">
                          {subcategory.rows[0].label}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {subcategory.rows[0].tool1 ? "✅" : "❌"}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {subcategory.rows[0].tool2 ? "✅" : "❌"}
                        </td>
                      </tr>
                    )}

                    {/* For remaining rows within each subcategory */}
                    {subcategory.rows.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="border px-4 py-2">{row.label}</td>
                        <td className="border px-4 py-2 text-center">
                          {row.tool1 ? "✅" : "❌"}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {row.tool2 ? "✅" : "❌"}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
