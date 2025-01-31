import React, { useEffect, useRef, useState } from "react";
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
// import BigMap from "../../assets/icons/bigmap.svg";
import SelectToolModal from "../modals/selecttool";
import { apiCall } from "../../data/useFetcher";
import { useRawdataStore } from "../../data/stores/loggerStore";
// import Export from "../../assets/icons/exporticon.svg";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { feature } from "topojson-client";
import { createMarkup, getCountries } from "../../screens/dashboard";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import { AnotherButton, MainBtn } from "./buttons";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import PrintableComponent from "./printcomparetool";

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
  const [modal, setModal] = useState<"one" | "two" | "">("");
  const [selectedTools, setSelectedTools] = useState<any>(null),
    [selectedAppLevel, setSelectedAppLevel] = useState<any>(null),
    [countries, setCountries] = useState<any>(null),
    [mapCountries, setMapCountries] = useState<any>(null),
    { getDynamicLogger } = useRawdataStore(),
    { kpidata }: any = useRawdataStore(),
    [newKpiMapper, setNewKpiMapper] = useState<any>(null),
    keys = [
      {
        color: "#3787FF",
        name: "both tools available",
      },
      {
        color: "#16A34A",
        name: selectedTools?.one?.toolName || "Tool One selected",
      },
      {
        color: "#E7A00C",
        name: selectedTools?.two?.toolName || "Tool Two selected",
      },
    ];

  useEffect(() => {
    if (selectedAppLevel) {
      apiCall({
        type: "get",
        url: `/api/v1/rawdata/manage-kpis?category=APPLICATION LEVEL&data=${selectedAppLevel?.title}&pagination=not`,
        getter: (d: any) => getDynamicLogger(d, "kpidata"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppLevel]);

  useEffect(() => {
    getCountries({ setCountries });
  }, []);

  useEffect(() => {
    if (kpidata) {
      let someChecker = kpidata?.docs?.some((it) => it?.upperCategory);
      if (someChecker) {
        let thisData = kpidata?.docs;

        let groups = thisData?.reduce((groups, game) => {
          let date = game?.upperCategory;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(game);
          return groups;
        }, {});
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            category: date,
            data: groups[date],
          };
        });
        setNewKpiMapper({
          level: "3 Step",
          data: { ...kpidata, docs: groupArrays?.reverse() },
        });
      } else {
        setNewKpiMapper({ level: "2 Step", data: kpidata });
      }
    }
  }, [kpidata]);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${"Compare tools new"}-${moment().format("DD/MM/YYYY")}`,
    bodyClass: "px-5",
  });

  useEffect(() => {
    if (selectedTools?.one || selectedTools?.two) {
      let newCount: any[] = [];
      let countriesLevel = selectedTools?.one?.toolSelection?.find(
        (it: any) => it?.category === "COUNTRY"
      );
      if (countriesLevel) {
        for (let c = 0; c < countriesLevel?.data?.length; c++) {
          const element = countriesLevel?.data[c];

          let findCountry = countries?.find(
            (it) => it?.name?.common?.toLowerCase() === element?.toLowerCase()
          );
          let newEle: any = {
            country: element,
            selection: "one",
          };
          if (findCountry) {
            newEle.short =
              findCountry?.fifa ||
              findCountry?.cioc ||
              findCountry?.cca3 ||
              findCountry?.cca2;
          }
          newCount?.push(newEle);
        }
      }
      let countriesLevel2 = selectedTools?.two?.toolSelection?.find(
        (it: any) => it?.category === "COUNTRY"
      );
      if (countriesLevel2) {
        for (let c = 0; c < countriesLevel2?.data?.length; c++) {
          const element = countriesLevel2?.data[c];

          let findCountry = countries?.find(
            (it) => it?.name?.common?.toLowerCase() === element?.toLowerCase()
          );
          let newEle: any = {
            country: element,
            selection: "two",
          };
          if (findCountry) {
            newEle.short =
              findCountry?.fifa ||
              findCountry?.cioc ||
              findCountry?.cca3 ||
              findCountry?.cca2;
          }
          let findInNewCount = newCount?.find(
            (it) => it?.country === newEle?.country
          );
          if (!findInNewCount) newCount?.push(newEle);
          else {
            newCount = newCount?.map((it) =>
              it?.country === newEle?.country
                ? { ...it, selection: "both" }
                : it
            );
          }
        }
      }
      setMapCountries(newCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTools]);

  // console.log({ newKpiMapper });
  const newTools = [
    {
      name: selectedTools?.one?.toolName || "Tool One selected",
      desc: selectedTools?.one?.description || "",
      bg: "#16A34A29",
      border: "#16A34A",
    },
    {
      name: selectedTools?.two?.toolName || "Tool Two selected",
      desc: selectedTools?.two?.description || "",
      bg: "#E7A00C29",
      border: "#E7A00C",
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
						onClick={() => setModal("one")}
						style={{
							border: "1px solid #E2E8F0",
						}}
						className="h-10 mt-2 cursor-pointer w-full rounded-lg bg-white px-2 flex items-center justify-between">
						<span className="text-sm font-medium text-[#334155] line-clamp-1">
							{selectedTools?.one?.toolName || `Select Sanitation tool`}
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
						onClick={() => {
							if (selectedTools?.one) setModal("two");
						}}
						className="h-10 mt-2 w-full cursor-pointer rounded-lg bg-white px-2 flex items-center justify-between">
						<span className="text-sm font-medium text-[#334155] line-clamp-1">
							{selectedTools?.two?.toolName || `Select Sanitation tool`}
						</span>
						<FaAngleDown />
					</div>
				</div>
			</div>
			{tab === "list" && (
				<>
					<div className={selectedTools?.one ? "hidden" : ""}>
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
															{/* {row?.tool1 === "pending" ? (
																<PendingComp />
															) : row?.tool1 === true ? (
																<GoodComp />
															) : (
																<BadComp />
															)} */}
															<PendingComp />
														</div>
														<div
															style={{
																borderWidth: "0px 0 0.4px 0.4px",
																borderStyle: "solid",
																borderColor: "#000000",
															}}
															className="col-span-1 flex justify-center items-center">
															{/* {row?.tool2 === "pending" ? (
																<PendingComp />
															) : row?.tool2 === true ? (
																<GoodComp />
															) : (
																<BadComp />
															)} */}
															<PendingComp />
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
					<div className={!selectedTools?.one ? "hidden" : "pb-10"}>
						{newKpiMapper?.level === "3 Step"
							? newKpiMapper?.data?.docs?.map((t: any, i: number) => (
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
											<p className="text-base font-bold text-[#334155] capitalize">
												{t?.category?.toLowerCase()}
											</p>
										</div>

										<div
											style={{
												borderWidth: "0px 0.4px 0 0.4px",
												borderStyle: "solid",
												borderColor: "#000000",
											}}
											className="col-span-5">
											{t?.data?.map((sub: any, index: number, array: any[]) => (
												<div className="grid grid-cols-5 w-full">
													<div
														key={index}
														style={{
															borderWidth:
																index !== 0 && index === array.length - 1
																	? "0px 0 0.4px 0"
																	: "0px 0 0.4px 0",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="flex px-3 col-span-1 min-h-14 items-center gap-3">
														<img src={Infra} alt="" className="" />
														<small className="text-base font-medium text-[#334155] capitalize">
															{sub?.category?.toLowerCase()}
														</small>
													</div>
													<div
														style={{
															borderWidth: "0px 0 0 0.4px",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="col-span-4">
														{sub?.data?.map((row: any, idx: number) => (
															<div
																key={idx}
																className="grid grid-cols-4 w-full">
																<div
																	style={{
																		borderWidth: "0px 0 0.4px 0",
																		borderStyle: "solid",
																		borderColor: "#000000",
																	}}
																	className="min-h-14 col-span-2 w-full px-2 flex items-center">
																	<span className="text-base font-normal text-[#334155] inter">
																		{row?.title}
																	</span>
																</div>
																<div
																	style={{
																		borderWidth: "0px 0 0.4px 0.4px",
																		borderStyle: "solid",
																		borderColor: "#000000",
																	}}
																	className="col-span-1 flex justify-center items-center">
																	<ProductTableShow
																		prevData={selectedTools?.one?.kpiSelection}
																		product={row}
																		title={sub?.category}
																	/>
																</div>
																<div
																	style={{
																		borderWidth: "0px 0 0.4px 0.4px",
																		borderStyle: "solid",
																		borderColor: "#000000",
																	}}
																	className="col-span-1 flex justify-center items-center">
																	<ProductTableShow
																		prevData={selectedTools?.two?.kpiSelection}
																		product={row}
																		title={sub?.category}
																	/>
																</div>
															</div>
														))}
													</div>
												</div>
											))}
										</div>
									</div>
							  ))
							: newKpiMapper?.data?.docs?.map((sub: any, index: number) => (
									<div
										style={{
											borderWidth: "0.4px 0 0 0.4px",
											borderStyle: "solid",
											borderColor: "#000000",
										}}
										className="grid grid-cols-6 w-full">
										<div
											key={index}
											style={{
												borderWidth: "0px 0 0.4px 0px",
												borderStyle: "solid",
												borderColor: "#000000",
											}}
											className="flex px-3 col-span-2 min-h-14 items-center gap-3">
											<img src={Infra} alt="" className="" />
											<small className="text-base font-medium text-[#334155]">
												{sub?.name || sub?.category}
											</small>
										</div>
										<div
											style={{
												borderWidth: "0px 0 0 0.4px",
												borderStyle: "solid",
												borderColor: "#000000",
											}}
											className="col-span-4">
											{sub?.data?.map((row: any, idx: number, arr: any[]) => (
												<div key={idx} className="grid grid-cols-4 w-full">
													<div
														style={{
															borderWidth: "0px 0 0.4px 0.4px",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="min-h-14 col-span-2 w-full px-2 flex items-center">
														<span className="text-base font-normal text-[#334155] inter">
															{row?.title}
														</span>
													</div>
													<div
														style={{
															borderWidth: "0px 0 0.4px 0.4px",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="col-span-1 flex justify-center items-center">
														{/* {row?.tool1 === "pending" ? (
													<PendingComp />
												) : row?.tool1 === true ? (
													<GoodComp />
												) : (
													<BadComp />
												)} */}
														<ProductTableShow
															prevData={selectedTools?.one?.kpiSelection}
															product={row}
															title={sub?.category}
														/>
													</div>
													<div
														style={{
															borderWidth: "0 0.4px 0.4px 0.4px",
															borderStyle: "solid",
															borderColor: "#000000",
														}}
														className="col-span-1 flex justify-center items-center">
														{/* {row?.tool2 === "pending" ? (
													<PendingComp />
												) : row?.tool2 === true ? (
													<GoodComp />
												) : (
													<BadComp />
												)} */}
														<ProductTableShow
															prevData={selectedTools?.two?.kpiSelection}
															product={row}
															title={sub?.category}
														/>
													</div>
												</div>
											))}
										</div>
									</div>
							  ))}
					</div>
				</>
			)}
			{tab === "map" && (
				<div
					style={{
						border: "0.4px solid #000000",
					}}
					className="w-full mb-20 pb-24 pt-10">
					{selectedTools?.one?.toolName && selectedTools?.two?.toolName && (
						<div className="section-container pb-4">
							<h4 className="text-base font-medium text-[#000929]">
								Coverage of {selectedTools?.one?.toolName} against{" "}
								{selectedTools?.two?.toolName} across the region.
							</h4>
						</div>
					)}
					<div className="section-container items-start gap-14 justify-center flex">
						<div className="w-[70%]">
							<div className="">
								<div className="space-x-4 flex">
									<h4 className="text-base font-medium text-[#000929]">Key:</h4>
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
							<div className="h-[432px] w-full noscroll mt-3">
								<MapCompareComponent
									mapCountries={mapCountries}
									selectedTools={selectedTools}
									keys={keys}
								/>
							</div>
						</div>
						<div className="w-[30%] mt-10">
							<div className="space-y-4">
								{newTools?.map(t => (
									<div
										style={{
											background: t?.bg,
											border: `1px solid ${t?.border}`,
										}}
										className="min-h-48 p-5 w-full rounded-xl">
										<h4 className="text-base font-bold text-[#334155]">
											{t?.name}
										</h4>
										{/* <p className="mt-3 text-sm font-normal text-[#000929]">
											{t?.desc}
										</p> */}
										<p
											className="mt-3 text-sm font-normal text-[#000929] line-clamp-6"
											dangerouslySetInnerHTML={createMarkup(t?.desc)}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
			{["one", "two"]?.includes(modal) && (
				<SelectToolModal
					handleClose={() => setModal("")}
					selectLevel={modal ? modal : null}
					preActive={selectedAppLevel}
					preSelection={selectedTools}
					handleSelect={(da: any) => {
						if (da?.selection) {
							setSelectedTools(da?.selection);
						}
						if (da?.active) {
							setSelectedAppLevel(da?.active);
						}
						setModal("");
					}}
				/>
			)}
			{tab === "map" && (
				<div className="flex justify-end mb-6">
					<button
						onClick={() => handlePrint()}
						className="rounded-lg h-14 px-6 text-white text-xl font-medium bg-da-blue-500">
						Export
					</button>
				</div>
			)}
			<div
				style={{
					display: "none",
				}}
				className="w-full">
				<PrintableComponent
					ref={componentRef}
					keys={keys}
					mapCountries={mapCountries}
					selectedTools={selectedTools}
					newTools={newTools}
				/>
			</div>
		</div>
	);
};

export const CheckerDecider = () => {};

export const PendingComp = () => {
  return (
    <div className="relative group">
      {/* Button */}
      <button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#e1e2e2]">
        <img src={Pending} alt="" className="" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full whitespace-nowrap mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        N/A
      </div>
    </div>
  );
};
export const BadComp = () => {
  return (
    <div className="relative group">
      {/* Button */}
      <button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#EF444433]">
        <img src={Bad} alt="" className="" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full whitespace-nowrap mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Not Covered By System
      </div>
    </div>
  );
};
export const GoodComp = () => {
  return (
    <div className="relative group">
      {/* Button */}
      <button className="w-[25px] h-[25px] flex justify-center items-center text-xl font-bold bg-[#BAFED2]">
        <img src={Good} alt="" className="" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full whitespace-nowrap mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Covered By System
      </div>
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

export const ProductTableShow = ({ product, prevData, title }) => {
  let [show, setShow] = useState("");

  // console.log({ prevData, product, title });

  useEffect(() => {
    if (prevData) {
      let findOne = prevData?.find((it) => it?.category === title);
      if (findOne) {
        let findTwo = findOne?.data?.find((it) => it?.title === product?.title);
        if (findTwo) {
          setShow(findTwo?.status);
        }
      }
    } else setShow(product?.status);
  }, [prevData, product, title]);

  return (
    <>
      {["good", "yes"]?.includes(show) ? (
        <GoodComp />
      ) : ["bad", "no"]?.includes(show) ? (
        <BadComp />
      ) : (
        <PendingComp />
      )}
    </>
  );
};

export const MapCompareComponent = ({ mapCountries, selectedTools, keys }) => {
  const [topoData, setTopoData] = useState(null);
  const countryColors = {
    available: "#3787FF",
    notAvailable: "#CBD5E1",
  };
  const [tooltip, setTooltip] = useState("");

  // Updated to include both ISO_A3 and ISO_A2 formats for testing
  const toolAvailability = {
    toolA: ["USA", "CAN", "MEX", "US", "CA", "MX", "KIR", "NGA"], // Ensure KIR is included if needed
    toolB: ["FRA", "DEU", "ITA", "FR", "DE", "IT"],
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/features.json"); // Path to your TopoJSON
      const data = await response.json();
      setTopoData(data); // Store TopoJSON data
    };

    fetchData();
  }, []);

  if (!topoData || !topoData.objects || !topoData.objects.world) return null;
  const geoData = feature(topoData, topoData.objects.world);
  return (
    <div className=" w-full border-[0.4px] rounded-xl bg-[#F8FAFC] border-[#00000080]">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryCode = geo.id,
                  countryName = geo?.properties?.name;
                const isAvailable2 = mapCountries
                  ?.map((it) => it?.short)
                  .includes(countryCode);
                const isAvailable1 = mapCountries
                  ?.map((it) => it?.country)
                  .includes(countryName);
                const isAvailable =
                  selectedTools?.one || selectedTools?.two
                    ? isAvailable1 || isAvailable2
                    : toolAvailability["toolA"].includes(countryCode);
                // console.log({geographies});

                let newFind: any = null;

                if (isAvailable2) {
                  newFind = mapCountries?.find(
                    (it) => it?.short === countryCode
                  );
                }
                if (isAvailable1) {
                  newFind = mapCountries?.find(
                    (it) => it?.country === countryName
                  );
                }
                // if (newFind) newFind = newFind?.selection
                // console.log({newFind, isAvailable1, isAvailable2});

                let color =
                    isAvailable && newFind
                      ? newFind?.selection === "one"
                        ? keys?.[1]?.color
                        : newFind?.selection === "two"
                        ? keys?.[2]?.color
                        : newFind?.selection === "both"
                        ? keys?.[0]?.color
                        : isAvailable
                        ? countryColors.available
                        : countryColors.notAvailable
                      : countryColors.notAvailable,
                  color2 =
                    isAvailable && newFind
                      ? newFind?.selection === "one"
                        ? keys?.[1]?.color
                        : newFind?.selection === "two"
                        ? keys?.[2]?.color
                        : newFind?.selection === "both"
                        ? keys?.[0]?.color
                        : isAvailable
                        ? countryColors.available
                        : "#D3D3D3"
                      : "#D3D3D3";

                return (
                  <Geography
                    data-tip={isAvailable ? countryName : ""} // Update this line
                    data-tooltip-content={isAvailable ? countryName : ""} // Update this line
                    data-for="country-tooltip"
                    data-tooltip-id="country-tooltip"
                    onMouseEnter={() => {
                      // console.log({ geo });
                      if (isAvailable) setTooltip(countryName);
                    }}
                    onMouseLeave={() => {
                      setTooltip("");
                    }}
                    key={geo.rsmKey}
                    geography={geo}
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        fill: color,
                        outline: "none",
                      },
                      hover: {
                        fill: color2,
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip id="country-tooltip" place="top">
        {tooltip}
      </ReactTooltip>
    </div>
  );
};
