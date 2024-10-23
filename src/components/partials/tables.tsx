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
import BigMap from "../../assets/icons/bigmap.svg";
import SelectToolModal from "../modals/selecttool";

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
          { label: "Asset inventory", tool1: "pending", tool2: false },
          {
            label: "Asset (system) renewal / replacement",
            tool1: "pending",
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
          { label: "Customer complaints", tool1: "pending", tool2: true },
          {
            label: "Customer service delivery",
            tool1: false,
            tool2: "pending",
          },
          { label: "Customer satisfaction", tool1: true, tool2: false },
        ],
      },
    ],
  },
];

export const ToolsTable = () => {
	const navigate = useNavigate();
	const [tab, setTab] = useState("list");
	const [modal, setModal] = useState("");
	const keys = [
		{
			color: "#3787FF",
			name: "both tools available",
		},
		{
			color: "#16A34A",
			name: "both tools available",
		},
		{
			color: "#E7A00C",
			name: "None selected",
		},
	];
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
					className="col-span-1 h-24 p-2">
					<h6 className="text-sm font-medium inter text-[#1E293B]">Compare</h6>
					<div
						onClick={() => setModal("select")}
						style={{
							border: "1px solid #E2E8F0",
						}}
						className="h-10 mt-2 cursor-pointer w-full rounded-lg bg-white px-2 flex items-center justify-between">
						<span className="text-sm font-medium text-[#334155]">
							Select Sanitation tool
						</span>
						<FaAngleDown />
					</div>
				</div>
				<div
					style={{
						borderWidth: "0.4px 0.4px 0px 0px",
						borderStyle: "solid",
						borderColor: "#000000",
					}}
					className="col-span-1 h-24 p-2">
					<h6 className="text-sm font-medium inter text-[#1E293B]">With</h6>
					<div
						style={{
							border: "1px solid #E2E8F0",
						}}
						onClick={() => setModal("select")}
						className="h-10 mt-2 w-full cursor-pointer rounded-lg bg-white px-2 flex items-center justify-between">
						<span className="text-sm font-medium text-[#334155]">
							Select Sanitation tool
						</span>
						<FaAngleDown />
					</div>
				</div>
			</div>
			{tab === "list" && (
				<div>
					{tableData?.map((t, i: number) => (
						<div
							key={i}
							style={{
								borderWidth: "0.4px 0 0 0.4px",
								borderStyle: "solid",
								borderColor: "#000000",
							}}
							className="w-full grid grid-cols-6">
							<div
								style={{
									borderWidth: "0px 0 0.4px 0px",
									borderStyle: "solid",
									borderColor: "#000000",
								}}
								className="col-span-1 pt-8 px-3">
								<p className="text-base font-bold text-[#334155]">
									{t?.category}
								</p>
							</div>

							<div
								style={{
									borderWidth: "0px 0.4px 0 0.4px",
									borderStyle: "solid",
									borderColor: "#000000",
								}}
								className="col-span-5">
								{t?.subcategories?.map((sub, index, array) => (
									<div className="grid grid-cols-5 w-full">
										<div
											key={index}
											style={{
												borderWidth:
													index !== 0 && index === array.length - 1
														? "0px"
														: "0px 0 0.4px 0",
												borderStyle: "solid",
												borderColor: "#000000",
											}}
											className="flex px-3 col-span-1 min-h-14 items-center gap-3">
											<img src={Infra} alt="" className="" />
											<small className="text-base font-medium text-[#334155]">
												{sub.name}
											</small>
										</div>
										<div
											style={{
												borderWidth: "0px 0 0 0.4px",
												borderStyle: "solid",
												borderColor: "#000000",
											}}
											className="col-span-4">
											{sub?.rows?.map((row, idx, arr) => (
												<div key={idx} className="grid grid-cols-4 w-full">
													<div
														style={{
															borderWidth: "0px 0 0.4px 0",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="min-h-14 col-span-2 w-full px-2 flex items-center">
														<span className="text-base font-normal text-[#334155] inter">
															{row?.label}
														</span>
													</div>
													<div
														style={{
															borderWidth: "0px 0 0.4px 0.4px",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="col-span-1 flex justify-center items-center">
														{row?.tool1 === "pending" ? (
															<PendingComp />
														) : row?.tool1 === true ? (
															<GoodComp />
														) : (
															<BadComp />
														)}
													</div>
													<div
														style={{
															borderWidth: "0px 0 0.4px 0.4px",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="col-span-1 flex justify-center items-center">
														{row?.tool2 === "pending" ? (
															<PendingComp />
														) : row?.tool2 === true ? (
															<GoodComp />
														) : (
															<BadComp />
														)}
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
			{tab === "map" && (
				<div
					style={{
						border: "0.4px solid #000000",
					}}
					className="w-full mb-20 py-24">
					<div className="section-container h-full items-start gap-14 justify-center flex">
						<img src={BigMap} alt="" className="" />
						<div className="mt-10">
							<h4 className="text-base font-medium text-[#000929]">Key</h4>
							<div className="space-y-4 mt-4">
								{keys?.map(key => (
									<div className="flex items-center gap-2">
										<div
											style={{
												backgroundColor: key?.color,
											}}
											className={`h-3 rounded-tr-3xl w-12`}></div>
										<h6 className="text-sm font-normal capitalize text-da-blue-600">
											{key?.name}
										</h6>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
			{modal === "select" && (
				<SelectToolModal handleClose={() => setModal("")} />
			)}
		</div>
	);
};

export const PendingComp = () => {
	return (
		<button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#D2D7D4]">
			<img src={Pending} alt="" className="" />
		</button>
	);
};
export const BadComp = () => {
	return (
		<button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#EF444433]">
			<img src={Bad} alt="" className="" />
		</button>
	);
};
export const GoodComp = () => {
	return (
		<button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#BAFED2]">
			<img src={Good} alt="" className="" />
		</button>
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
