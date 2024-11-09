import { useEffect, useRef, useState } from "react";
import { PageHeader } from "../../components/partials/header";
import { FiSearch } from "react-icons/fi";
import Caution from "../../assets/icons/caution.svg";
import Menu from "../../assets/icons/menu.svg";
import PrimaryBtn, { MainBtn } from "../../components/partials/buttons";
import Export from "../../assets/icons/exporticon.svg";
import CompareIcon from "../../assets/icons/compareicon.svg";
import SelectIcon from "../../assets/icons/calendar 01.svg";
// import Map from "../../assets/images/map.png";
import WhiteBox, {
  ToolsKPIsData,
  WhiteBox2,
} from "../../components/partials/box";
import Info from "../../assets/icons/information.svg";
import ProductTable from "../../components/partials/tables";
import StartMapping from "../../components/modals/startmaping";
import Seemore from "../../assets/icons/seemore.svg";
// import Nwasco from "../../assets/icons/nwasco.svg";
import SelectRegion from "../../components/modals/selectregion";
import { useNavigate } from "react-router-dom";
import "intro.js/introjs.css";
import introJs from "intro.js";
import { useRawdataStore } from "../../data/stores/loggerStore";
import { apiCall } from "../../data/useFetcher";
import DOMPurify from "dompurify";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import InfoModal from "../../components/modals/infomodal";
import axios from "axios";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import ReactPlayer from "react-player";
import { Tooltip as ReactTooltip } from "react-tooltip";

// const toolAvailability = {
//   toolA: ["USA", "CAN", "MEX"],
//   toolB: ["FRA", "DEU", "ITA"],
//   // More tools as needed
// };

export const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

export let getCountries = async ({ setCountries }) => {
  try {
    let res = await axios.get(
      `https://restcountries.com/v3.1/all?fields=name,flags,region,capital,timezones,altSpellings,cioc,cca3,cca2,latlng,fifa`,
      {
        headers: {
          Authorization: null,
        },
        baseURL: null,
      }
    );
    console.log({ rd: res }, "countries");
    setCountries(res?.data?.data || res?.data);
  } catch (err) {
    if (err?.response?.status === 429 || err?.response?.status === 405)
      toast.error(err?.response?.data ? err?.response?.data : err?.message);
    console.log({ err });
  }
};

const Dashboard = () => {
  const [start, setStart] = useState(false),
    [info, setInfo] = useState<any>(""),
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

  // const sanitationTools = [
  //   { name: "APAM", details: "APAM is a management tool..." },
  //   { name: "EDAMS IMS", details: "EDAMS IMS information..." },
  //   { name: "Equiserve", details: "Equiserve details..." },
  //   { name: "ERP System - Nakuru", details: "ERP System for Nakuru..." },
  //   {
  //     name: "Indah Water Malaysia Planning tool",
  //     details: "NWASCO NIS details...",
  //   },
  //   {
  //     name: "Integrated Management Information System (IMIS)",
  //     details: "Real-time monitoring system...",
  //   },
  //   {
  //     name: "IMIS Dhaka",
  //     details:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  //   },
  //   {
  //     name: "Lusaka  Sanitation System",
  //     details:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  //   },
  // ];

  let { getDynamicLogger, getLogger, data } = useRawdataStore(),
		{ mapTools, kpidata, regionCountry }: any = useRawdataStore(),
		tools = data?.docs?.sort(
			(
				a: { category: { toString: () => string } },
				b: { category: { toString: () => any } }
			) => {
				// Compare the values of the specified key in a case-insensitive manner
				return a?.category?.toString()?.localeCompare(b?.category?.toString());
			}
		),
		regionTools = regionCountry?.docs,
		[selection, setSelection] = useState<any>(null),
		[currentTool, setCurrentTool] = useState<any>(null),
		[formInfo, setFormInfo] = useState(null),
		[countries, setCountries] = useState<any>(null),
		[mapCountries, setMapCountries] = useState<any>(null),
		[search, setSearch] = useState<string>("");

	useEffect(() => {
		getDynamicLogger({}, "mapTools");
		// apiCall({
		// 	type: "get",
		// 	url: `/api/v1/rawdata/manage-kpis?pagination=not`,
		// 	getter: (d: any) => getDynamicLogger(d, "kpidata"),
		// });
		apiCall({
			type: "get",
			url: `/api/v1/rawdata?pagination=not`,
			getter: (d: any) => getLogger(d),
		});
		apiCall({
			type: "get",
			url: `/api/v1/tools/manage-region-country?pagination=not`,
			getter: (d: any) => getDynamicLogger(d, "regionCountry"),
		});
		getCountries({ setCountries });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!selection) {
			const intro = introJs();
			intro.setOptions({
				steps: [
					{
						intro: "Welcome to the Water and Sanitation Tools Map!",
					},
					{
						element: ".start-mapping-btn",
						intro:
							'Click "Start Mapping" to select different criteria and parameters to visualize information about tools.',
					},
					{
						element: ".tool-list",
						intro: "Select a tool to view its information on the dashboard.",
					},
					{
						element: ".compare-btn",
						intro: "Click “Compare Tools” to compare two tools.",
					},
					{
						intro:
							"All done, let’s start mapping!. You can start exploring the system.",
					},
				],
				showProgress: true, // Adds "1 of X steps"
				showStepNumbers: true, // Shows the step number
				exitOnOverlayClick: false, // Prevents closing when clicking on overlay
				overlayOpacity: 0.7, // Make background semi-transparent
				tooltipClass: "customTooltip", // Add custom CSS class for tooltip styling
			});

			// Start the intro
			intro.start();
		}
	}, [selection]);

	useEffect(() => {
		if (selection) {
			setCurrentTool(null);
			apiCall({
				type: "post",
				url: `/api/v1/tools/manage-tools?pagination=not`,
				getter: (d: any) => getDynamicLogger(d, "mapTools"),
				data: {
					toolSelection: Object.entries(selection)
						.map(([key, value]) => ({
							category: key,
							data: Array.isArray(value) ? value : [value], // Ensure data is always an array
						}))
						?.filter(it => it?.data?.length > 0),
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selection]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				setStart(false);
				getDynamicLogger({}, "mapTools");
			});
			let handleSubmit = async () => {
				if (!search) return;
				setStart(true);
				setCurrentTool(null);
				apiCall({
					type: "get",
					url: `/api/v1/tools?pagination=not&search=${search}`,
					getter: (d: any) => getDynamicLogger(d, "mapTools"),
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (mapTools && mapTools?.totalDocs > 0 && (selection || search)) {
			setCurrentTool(mapTools?.docs?.[0]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapTools]);

	const contact = [currentTool?.website, currentTool?.contactEmailAddress],
		webinar = [currentTool?.webinar];
	// resources = [
	// 	{ name: "EDAMS Technology", link: "mails@nwasco.org.zm" },
	// 	{ name: "EDAMS Technology", link: "mails@nwasco.org.zm" },
	// ];
	// console.log({ regionCountry });

	useEffect(() => {
		let appLevel = currentTool?.toolSelection?.find(
			(it: any) => it?.category === "APPLICATION LEVEL"
		);
		if (appLevel && kpidata) {
			setFormInfo([...kpidata?.docs]);
		}
	}, [kpidata, currentTool]);

	useEffect(() => {
		if (currentTool) {
			let appLevel = currentTool?.toolSelection?.find(
				(it: any) => it?.category === "APPLICATION LEVEL"
			);
			if (appLevel) {
				apiCall({
					type: "get",
					url: `/api/v1/rawdata/manage-kpis?category=APPLICATION LEVEL&data=${appLevel?.data?.[0]}&pagination=not`,
					getter: (d: any) => getDynamicLogger(d, "kpidata"),
				});
			}
			let countriesLevel = currentTool?.toolSelection?.find(
				(it: any) => it?.category === "COUNTRY"
			);
			if (countriesLevel) {
				let newCount: any[] = [];
				for (let c = 0; c < countriesLevel?.data?.length; c++) {
					const element = countriesLevel?.data[c];

					let findCountry = countries?.find(
						it => it?.name?.common?.toLowerCase() === element?.toLowerCase()
					);
					let newEle: any = {
						country: element,
					};
					if (findCountry) {
						newEle.short =
							findCountry?.fifa ||
							findCountry?.cioc ||
							findCountry?.cca3 ||
							findCountry?.cca2;
					}
					if (!["all", "global"]?.includes(newEle?.country?.toLowerCase()))
						newCount?.push(newEle);
				}
				setMapCountries(newCount);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTool]);

	let componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		contentRef: componentRef,
		// content: () => componentRef?.current,
		documentTitle: `${currentTool?.toolName || ""}-${moment().format(
			"DD/MM/YYYY"
		)}`,
		bodyClass: "px-4 py-10",
	});

	return (
		<div>
			<PageHeader />
			<div className="w-full flex" ref={componentRef}>
				<div
					style={{
						border: "1px solid #C4C4C4",
					}}
					className="w-[25%] min-h-screen py-8 px-4 bg-white">
					<h1 className="text-base font-medium text-black">
						{start
							? `${mapTools?.totalDocs || 0} Sanitation Data tools Found!`
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
							type="search"
							name="search"
							id="Search"
							value={search}
							onChange={e => setSearch(e?.target?.value)}
							placeholder="Search Sanitation Data Tool"
							className="w-full text-sm pl-14 text-[#777E90] h-full bg-transparent rounded-lg"
						/>
					</div>
					<div className="mt-10 tool-list">
						{start ? (
							<div>
								<div className="space-y-1">
									{mapTools?.docs?.map((san: any, idx: number) => (
										<div
											key={idx}
											className={` p-1 rounded-lg cursor-pointer ${
												hoveredTool === idx ? "bg-[#E6F1FB]" : "bg-transparent"
											}`}
											onClick={() => setCurrentTool(san)}
											onMouseEnter={() => setHoveredTool(idx)}
											onMouseLeave={() => setHoveredTool(null)}>
											<div className="flex justify-between items-center">
												<label
													className={`flex items-center gap-2 mb-2 ${
														hoveredTool === idx
															? "text-[#0275D8] text-xs"
															: "text-black text-xs"
													}`}>
													<input
														type="radio"
														name="tools"
														className={`form-checkbox border border-[#AAB7C6] size-5`}
														checked={san?._id === currentTool?._id}
													/>
													{san?.toolName}
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
												<div
													className="
                        text-xs ml-5 text-black font-normal"
													dangerouslySetInnerHTML={createMarkup(
														san?.description
													)}
												/>
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
							className="export-btn"
							text={"Export"}
							onClick={() => {
								console.log("object");
								if (currentTool) {
									handlePrint();
								}
							}}
						/>
						<MainBtn
							icon={CompareIcon}
							className="compare-btn"
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
							className="start-mapping-btn"
							onClick={() => setModal("start")}
						/>
					</div>
					<div className="w-full min-h-screen bg-[#F8FAFC] p-6">
						{start && (
							<div
								style={{
									borderBottom: "1px solid #E2E8F0",
								}}
								className="h-16 w-full">
								<div className="flex h-full gap-5">
									{tabs?.map(it => (
										<button
											onClick={() => setTab(it)}
											className={`h-full px-3 text-base capitalize ${
												tab === it
													? "border-b-4 border-b-[#3787FF] text-[#3787FF] font-bold"
													: "font-normal text-[#64748B]"
											}`}>
											{it}
										</button>
									))}
								</div>
							</div>
						)}
						{tab === "overview" && (
							<div>
								<div className="w-full mt-8 grid grid-cols-3 gap-5 page-break">
									<div
										style={{
											boxShadow: "4px 4px 100px 0px #00000014",
										}}
										className="col-span-2 h-72 flex gap-10 items-center bg-white rounded-lg p-5 page-break">
										<div>
											<h4 className="text-base font-medium text-[#000929]">
												Countries using sanitation data tools
											</h4>
											<MapDashboardComponent
												mapCountries={mapCountries}
												currentTool={currentTool}
												start={start}
											/>

											{/* <img src={Map} alt="" className="mt-4" /> */}
										</div>
										<div>
											<h5 className="text-base font-medium text-[#000929]">
												{mapCountries?.length} Countries Available
											</h5>
											<ul className="list-disc h-60 overflow-y-scroll noscroll list-inside space-y-2 mt-3 text-xs font-normal text-da-blue-600">
												{mapCountries?.map((it: any, i: number) => (
													<li key={i} className="page-break">
														{it?.country}
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="col-span-1">
										<WhiteBox>
											<h4 className="text-base font-medium text-[#000929]">
												Data Type Generated
											</h4>
											<div className="mt-5 space-y-3">
												{!start && !currentTool && (
													<>
														<div className="flex items-center gap-2">
															<div
																className={`h-3 rounded-tr-3xl w-12 ${
																	start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
																}`}></div>
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
																}`}></div>
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
																}`}></div>
															{start && (
																<h6 className="text-sm font-normal text-da-blue-600">
																	Quality of Service KPIs
																</h6>
															)}
														</div>
													</>
												)}
												{currentTool &&
													formInfo?.map((tool, i) => (
														<div
															key={i}
															className="flex items-center gap-2 page-break">
															<div
																className={`h-3 rounded-tr-3xl w-12 ${
																	start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
																}`}></div>
															{start && (
																<h6 className="text-sm font-normal text-da-blue-600 capitalize">
																	{tool?.category?.toLowerCase()}
																</h6>
															)}
														</div>
													))}
											</div>
										</WhiteBox>
									</div>
								</div>
								{!currentTool && (
									<div className="mt-5 grid grid-cols-3 gap-5">
										<WhiteBox className="h-full">
											<div className="flex justify-between items-center">
												<h5 className="text-base text-da-blue-600 font-medium">
													Infrastructure and Stability
												</h5>
												<img
													src={Info}
													onClick={() =>
														setInfo({
															category: "Infrastructure and Stability",
														})
													}
													alt=""
													className="cursor-pointer"
												/>
											</div>
											<div className="mt-2">
												<ProductTable start={false} products={products} />
											</div>
										</WhiteBox>
										<WhiteBox className="h-full">
											<div className="flex justify-between items-center">
												<h5 className="text-base text-da-blue-600 font-medium">
													Operational Optimization
												</h5>
												<img
													src={Info}
													alt=""
													onClick={() =>
														setInfo({
															category: "Operational Optimization",
														})
													}
													className="cursor-pointer"
												/>
											</div>
											<div className="mt-2">
												<ProductTable start={false} products={optimization} />
											</div>
										</WhiteBox>
										<WhiteBox className="h-full">
											<div className="flex justify-between items-center">
												<h5 className="text-base text-da-blue-600 font-medium">
													Operational Resilency
												</h5>
												<img
													src={Info}
													alt=""
													onClick={() =>
														setInfo({
															category: "Operational Resilency",
														})
													}
													className=""
												/>
											</div>
											<div className="mt-2">
												<ProductTable start={false} products={resiliency} />
											</div>
										</WhiteBox>
									</div>
								)}
								{currentTool && (
									<div className="mt-5 grid grid-cols-3 gap-5">
										{formInfo?.map((tool: any, i: number) => (
											<ToolsKPIsData
												start
												data={tool?.data}
												title={tool?.category}
												key={i}
												prevData={currentTool?.kpiSelection}
												setInfo={() => setInfo(tool)}
											/>
										))}
									</div>
								)}
							</div>
						)}
						{tab === "about data tool" && (
							<div className="mt-8">
								<WhiteBox2 className="w-full">
									<div className="flex gap-6 items-center">
										<img
											src={currentTool?.image?.url || ""}
											alt=""
											className=""
										/>
										<h6 className="text-base font-medium text-da-blue-600">
											{currentTool?.toolName}
										</h6>
									</div>
									<div
										className="
                    text-sm font-normal text-da-blue-600 mt-4
                    "
										dangerouslySetInnerHTML={createMarkup(
											currentTool?.description
										)}
									/>
								</WhiteBox2>
								<div className="mt-6 grid grid-cols-3 gap-8">
									<div className="col-span-1">
										<WhiteBox>
											<h4 className="text-base font-medium text-[#000929]">
												Contact Details
											</h4>
											<div className="mt-5 space-y-3">
												{contact?.map(c => (
													<div className="flex items-center gap-2">
														<div
															className={`h-3 rounded-tr-3xl w-12 ${
																start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
															}`}></div>
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
													Webinar
												</h4>
												<div className="mt-5 space-y-3">
													{webinar?.map(c => (
														<div className="flex items-center gap-2">
															<div
																className={`h-3 rounded-tr-3xl w-12 ${
																	start ? "bg-[#3787FF]" : "bg-[#D2D7D4]"
																}`}></div>
															{start && (
																<div className="w-full h-56">
																	<ReactPlayer
																		url={c}
																		width="100%"
																		height="100%"
																		style={{
																			borderRadius: "24px",
																		}}
																		// style={{ position: "absolute", top: 0, left: 0 }}
																		controls
																	/>
																</div>
																// <h6 className="text-sm font-normal text-[#3787FF]">
																// 	<a href={c}> {c}</a>
																// </h6>
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
												className="mt-5 h-10 w-full grid grid-cols-3">
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
											{currentTool?.resources?.map((r: any, i: number) => (
												<div
													key={i}
													style={{
														border: "1px solid #E2E8F0",
													}}
													className="h-10 w-full grid grid-cols-3">
													<div className="cols-span-1 border-r border-r-[#E2E8F0] flex items-center h-full w-full">
														<ul className="list-disc ml-6 list-inside">
															<li className="text-sm font-normal text-da-blue-600">
																{r?.material || r?.name}
															</li>
														</ul>
													</div>
													<div className="cols-span-2 h-full flex items-center pl-6">
														<a
															href={r?.link}
															className="text-sm font-normal text-da-blue-100">
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
					// setStart={() => setStart(true)}
					handleClose={() => setModal("")}
					data={tools}
					defaultSelection={selection}
					handleComplete={da => {
						setSelection(da);
						setModal("");
						setStart(true);
					}}
				/>
			)}
			{modal === "region" && (
				<SelectRegion
					handleClose={() => setModal("")}
					data={regionTools}
					defaultSelection={selection}
					handleComplete={da => {
						setSelection(da);
						setModal("");
						setStart(true);
					}}
				/>
			)}
			{info && (
				<InfoModal
					handleClose={() => setInfo("")}
					title={info?.category || "Infrastructure and Stability"}
					description={info?.description}
				/>
			)}
		</div>
	);
};

export default Dashboard;

export const MapDashboardComponent = ({ mapCountries, start, currentTool }) => {
  const [tooltip, setTooltip] = useState("");
  const [topoData, setTopoData] = useState(null);
  const [selectedTool] = useState<any>("toolA");

  const countryColors = {
    available: "#3787FF",
    notAvailable: "#EAEAEA",
  };

  const toolAvailability = {
    toolA: ["USA", "CAN", "MEX", "US", "CA", "MX", "KIR", "NGA"],
    toolB: ["FRA", "DEU", "ITA", "FR", "DE", "IT"],
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/features.json");
      const data = await response.json();
      setTopoData(data);
    };
    fetchData();
  }, []);

  if (!topoData || !topoData.objects || !topoData.objects.world) return null;

  const geoData = feature(topoData, topoData.objects.world);
// console.log({ tooltip });

return (
	<div className="mt-3 h-60 w-80 bg-[#F8FAFC] rounded-md">
		<ComposableMap projection="geoMercator">
			<Geographies geography={geoData}>
				{({ geographies }) =>
					geographies.map(geo => {
						const countryCode = geo.id;
						const countryName = geo?.properties?.name;
						const isAvailable2 = mapCountries
							?.map(it => it?.short)
							.includes(countryCode);
						const isAvailable1 = mapCountries
							?.map(it => it?.country)
							.includes(countryName);
						const isAvailable =
							start && currentTool
								? isAvailable1 || isAvailable2
								: toolAvailability[selectedTool].includes(countryCode);

						return (
							<Geography
								data-tip={isAvailable ? countryName : ""} // Update this line
								data-tooltip-content={isAvailable ? countryName : ""} // Update this line
								data-for="country-tooltip"
								data-tooltip-id="country-tooltip"
								onMouseEnter={() => {
									if (isAvailable) setTooltip(countryName);
								}}
								key={geo.rsmKey}
								geography={geo}
								onMouseLeave={() => {
									setTooltip("");
								}}
								fill={
									isAvailable
										? countryColors.available
										: countryColors.notAvailable
								}
								stroke="#FFFFFF"
								strokeWidth={0.5}
								style={{
									default: {
										fill: isAvailable
											? countryColors.available
											: countryColors.notAvailable,
										outline: "none",
									},
									hover: {
										fill: isAvailable ? "#3787FF" : "#D3D3D3",
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
		</ComposableMap>
		<ReactTooltip id="country-tooltip" place="top">
			{tooltip}
		</ReactTooltip>
	</div>
);
};
