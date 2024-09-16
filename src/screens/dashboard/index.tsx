import React, { useState } from "react";
import { PageHeader } from "../../components/partials/header";
import { FiSearch } from "react-icons/fi";
import Caution from "../../assets/icons/caution.svg";
import Menu from "../../assets/icons/menu.svg";
import PrimaryBtn, { MainBtn } from "../../components/partials/buttons";
import Export from "../../assets/icons/exporticon.svg";
import CompareIcon from "../../assets/icons/compareicon.svg";
import SelectIcon from "../../assets/icons/calendar 01.svg";
import Map from "../../assets/images/map.png";
import WhiteBox, { WhiteBox2 } from "../../components/partials/box";
import Info from "../../assets/icons/information.svg";
import ProductTable from "../../components/partials/tables";
import StartMapping from "../../components/modals/startmaping";
import Seemore from "../../assets/icons/seemore.svg";
import Nwasco from "../../assets/icons/nwasco.svg";
import SelectRegion from "../../components/modals/selectregion";
import { useNavigate } from "react-router";

const contact = ["www.nwasco.org.zm/", "mails@nwasco.org.zm"],
  webinar = ["https://www.youtube.com/watch?v=uhyYaGvzTP0"],
  resources = [
    { name: "EDAMS Technology", link: "mails@nwasco.org.zm" },
    { name: "EDAMS Technology", link: "mails@nwasco.org.zm" },
  ];

const Dashboard = () => {
  const [start, setStart] = useState(false),
    [modal, setModal] = useState(""),
    [tab, setTab] = useState("overview"),
    navigate = useNavigate(),
    [hoveredTool, setHoveredTool] = useState(null);
  const tabs = ["overview", "about data tool"];
  const products = [
      { name: "Asset inventory", status: "good" },
      { name: "Asset (system) renewal/replacement", status: "good" },
      { name: "Sewerage system integrity", status: "bad" },
      { name: "Planned maintenance", status: "bad" },
      { name: "Sanitation Facilities Database", status: "bad" },
    ],
    optimization = [
      { name: "Resource Optimization", status: "good" },
      { name: "Performance Monitoring", status: "good" },
      { name: "Seewerage management efficiency", status: "bad" },
      { name: "Non Sewered Sanitation Service Management", status: "bad" },
    ],
    resiliency = [
      { name: "Recordable incidents of injury or illness", status: "good" },
      { name: "Risk assessment and response preparedness", status: "bad" },
      { name: "Ongoing operational resilliency", status: "good" },
    ];
  const sanitationTools = [
    { name: "APAM", details: "APAM is a management tool..." },
    { name: "EDAMS IMS", details: "EDAMS IMS information..." },
    { name: "Equiserve", details: "Equiserve details..." },
    { name: "ERP System - Nakuru", details: "ERP System for Nakuru..." },
    {
      name: "Indah Water Malaysia Planning tool",
      details: "NWASCO NIS details...",
    },
    {
      name: "Integrated Management Information System (IMIS)",
      details: "Real-time monitoring system...",
    },
    {
      name: "IMIS Dhaka",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      name: "Lusaka  Sanitation System",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];
  return (
    <div>
      <PageHeader />
      <div className="w-full flex">
        <div
          style={{
            border: "1px solid #C4C4C4",
          }}
          className="w-[25%] min-h-screen py-8 px-4 bg-white"
        >
          <h1 className="text-base font-medium text-black">
            {start
              ? `${sanitationTools?.length} Sanitation Data tools Found!`
              : "Start Mapping"}
          </h1>
          <div className="relative mt-5 bg-[#f7f7f7] h-10 w-full">
            <FiSearch
              size={25}
              color="#777E90"
              className="absolute top-2 left-5"
            />
            <input
              style={{
                border: "1px solid #E2E8F0",
              }}
              type="text"
              placeholder="Search Sanitation Data Tool"
              className="w-full text-sm pl-14 text-[#777E90] h-full bg-transparent rounded-lg"
            />
          </div>
          <div className="mt-10">
            {start ? (
              <div>
                <div className="space-y-1">
                  {sanitationTools?.map((san, idx) => (
                    <div
                      key={idx}
                      className={` p-1 rounded-lg cursor-pointer ${
                        hoveredTool === idx ? "bg-[#E6F1FB]" : "bg-transparent"
                      }`}
                      onMouseEnter={() => setHoveredTool(idx)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      <div className="flex justify-between items-center">
                        <label
                          className={`flex items-center gap-2 mb-2 ${
                            hoveredTool === idx
                              ? "text-[#0275D8] text-xs"
                              : "text-black text-xs"
                          }`}
                        >
                          <input
                            type="radio"
                            name="tools"
                            className={`form-checkbox border border-[#AAB7C6] `}
                          />
                          {san?.name}
                        </label>
                        {hoveredTool === idx && (
                          <img
                            src={Seemore}
                            alt="See More"
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                      {hoveredTool === idx && (
                        <p className="text-xs ml-5 text-black font-normal">
                          {san?.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <img src={Caution} alt="" className="mx-auto" />
                <h4 className="text-sm font-normal mt-6 inter text-center text-[#667085]">
                  No data tool mapped. Start mapping
                </h4>
                <div className="flex justify-center mt-8">
                  <PrimaryBtn
                    icon={Menu}
                    text="Start Mapping"
                    onClick={() => setModal("start")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[75%]">
          <div className="h-20 flex justify-end gap-6 items-center pr-6">
            <MainBtn
              icon={Export}
              text={"Export"}
              onClick={() => console.log("object")}
            />
            <MainBtn
              icon={CompareIcon}
              text={"Compare Tools"}
              onClick={() => navigate("/compare-tools")}
            />{" "}
            <MainBtn
              icon={SelectIcon}
              text={"Select Region"}
              onClick={() => setModal("region")}
            />
            <PrimaryBtn
              icon={Menu}
              text="Start Mapping"
              onClick={() => setModal("start")}
            />
          </div>
          <div className="w-full min-h-screen bg-[#F8FAFC] p-6">
            {start && (
              <div
                style={{
                  borderBottom: "1px solid #E2E8F0",
                }}
                className="h-16 w-full"
              >
                <div className="flex h-full gap-5">
                  {tabs?.map((it) => (
                    <button
                      onClick={() => setTab(it)}
                      className={`h-full px-3 text-base capitalize ${
                        tab === it
                          ? "border-b-4 border-b-[#3787FF] text-[#3787FF] font-bold"
                          : "font-normal text-[#64748B]"
                      }`}
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {tab === "overview" && (
              <div>
                <div className="w-full mt-8 grid grid-cols-3 gap-5">
                  <div
                    style={{
                      boxShadow: "4px 4px 100px 0px #00000014",
                    }}
                    className="col-span-2 h-72 flex gap-10 items-center bg-white rounded-lg p-5"
                  >
                    <div>
                      <h4 className="text-base font-medium text-[#000929]">
                        Countries using sanitation data tools
                      </h4>
                      <img src={Map} alt="" className="mt-4" />
                    </div>
                    <div>
                      <h5 className="text-base font-medium text-[#000929]">
                        5 Countries Available
                      </h5>
                      <ul className="list-disc list-inside space-y-2 mt-3 text-xs font-normal text-da-blue-600">
                        <li>India</li>
                        <li>South Africa</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <WhiteBox>
                      <h4 className="text-base font-medium text-[#000929]">
                        Data Type Generated
                      </h4>
                      <div className="mt-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 rounded-tr-3xl w-12 ${
                              start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
                            }`}
                          ></div>
                          {start && (
                            <h6 className="text-sm font-normal text-da-blue-600">
                              Quality of Service KPIs
                            </h6>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 rounded-tr-3xl w-12 ${
                              start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
                            }`}
                          ></div>
                          {start && (
                            <h6 className="text-sm font-normal text-da-blue-600">
                              Quality of Service KPIs
                            </h6>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 rounded-tr-3xl w-12 ${
                              start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
                            }`}
                          ></div>
                          {start && (
                            <h6 className="text-sm font-normal text-da-blue-600">
                              Quality of Service KPIs
                            </h6>
                          )}
                        </div>
                      </div>
                    </WhiteBox>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-5">
                  <WhiteBox className="h-full">
                    <div className="flex justify-between items-center">
                      <h5 className="text-base text-da-blue-600 font-medium">
                        Infrassture and Stability
                      </h5>
                      <img src={Info} alt="" className="" />
                    </div>
                    <div className="mt-2">
                      <ProductTable start={start} products={products} />
                    </div>
                  </WhiteBox>
                  <WhiteBox className="h-full">
                    <div className="flex justify-between items-center">
                      <h5 className="text-base text-da-blue-600 font-medium">
                        Operational Optimization
                      </h5>
                      <img src={Info} alt="" className="" />
                    </div>
                    <div className="mt-2">
                      <ProductTable start={start} products={optimization} />
                    </div>
                  </WhiteBox>
                  <WhiteBox className="h-full">
                    <div className="flex justify-between items-center">
                      <h5 className="text-base text-da-blue-600 font-medium">
                        Operational Resilency
                      </h5>
                      <img src={Info} alt="" className="" />
                    </div>
                    <div className="mt-2">
                      <ProductTable start={start} products={resiliency} />
                    </div>
                  </WhiteBox>
                </div>
              </div>
            )}
            {tab === "about data tool" && (
              <div className="mt-8">
                <WhiteBox2 className="w-full">
                  <div className="flex gap-6 items-center">
                    <img src={Nwasco} alt="" className="" />
                    <h6 className="text-base font-medium text-da-blue-600">
                      NWASCO Information System (NIS)
                    </h6>
                  </div>
                  <p className="text-sm font-normal text-da-blue-600 mt-4">
                    The National Water Supply and Sanitation Council (NWASCO)
                    Information System (NIS) is a web-based system used by
                    NWASCO to monitor the performance of water and sanitation
                    service providers, also known as Commercial Utilities (CUs)
                    in Zambia.
                    <br />
                    <br /> The NIS tool enables NWASCO to effectively execute
                    its regulatory functions of monitoring the performance of
                    CUs, setting tariffs, and advising the government on water
                    and sanitation matters. NWASCO measures the performance of
                    CUs against a set of indicators highlighting priority areas
                    for service provision, including water quality, water
                    coverage, sanitation coverage, revenue collection,
                    non-revenue water reduction, staff efficiency, and operating
                    efficiency.
                  </p>
                </WhiteBox2>
                <div className="mt-6 grid grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <WhiteBox>
                      <h4 className="text-base font-medium text-[#000929]">
                        Contact Details
                      </h4>
                      <div className="mt-5 space-y-3">
                        {contact?.map((c) => (
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 rounded-tr-3xl w-12 ${
                                start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
                              }`}
                            ></div>
                            {start && (
                              <h6 className="text-sm font-normal text-da-blue-600">
                                {c}
                              </h6>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5">
                        <h4 className="text-base font-medium text-[#000929]">
                          Contact Details
                        </h4>
                        <div className="mt-5 space-y-3">
                          {webinar?.map((c) => (
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-3 rounded-tr-3xl w-12 ${
                                  start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
                                }`}
                              ></div>
                              {start && (
                                <h6 className="text-sm font-normal text-[#3787FF]">
                                  <a href={c}> {c}</a>
                                </h6>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </WhiteBox>
                  </div>
                  <div className="col-span-2">
                    <WhiteBox>
                      <h4 className="text-base font-medium text-[#000929]">
                        Resources
                      </h4>
                      <div
                        style={{
                          border: "1px solid #E2E8F0",
                        }}
                        className="mt-5 h-10 w-full grid grid-cols-3"
                      >
                        <div className="cols-span-1 border-r border-r-[#E2E8F0] flex justify-center items-center h-full w-full">
                          <h4 className="text-sm font-medium text-da-blue-600">
                            Learning Materials
                          </h4>
                        </div>
                        <div className="cols-span-2 h-full flex items-center pl-6">
                          <h4 className="text-sm font-medium text-da-blue-600">
                            Link
                          </h4>
                        </div>
                      </div>
                      {resources?.map((r) => (
                        <div
                          style={{
                            border: "1px solid #E2E8F0",
                          }}
                          className="h-10 w-full grid grid-cols-3"
                        >
                          <div className="cols-span-1 border-r border-r-[#E2E8F0] flex items-center h-full w-full">
                            <ul className="list-disc ml-6 list-inside">
                              <li className="text-sm font-normal text-da-blue-600">
                                {r?.name}
                              </li>
                            </ul>
                          </div>
                          <div className="cols-span-2 h-full flex items-center pl-6">
                            <a
                              href={r?.link}
                              className="text-sm font-normal text-da-blue-100"
                            >
                              {r?.link}
                            </a>
                          </div>
                        </div>
                      ))}
                    </WhiteBox>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modal === "start" && (
        <StartMapping
          setStart={() => setStart(true)}
          handleClose={() => setModal("")}
        />
      )}
      {modal === "region" && (
        <SelectRegion
          handleClose={() => setModal("")}
          setStart={() => setStart(true)}
        />
      )}
    </div>
  );
};

export default Dashboard;
