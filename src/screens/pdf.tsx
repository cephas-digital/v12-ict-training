import ReactPlayer from "react-player";
import WhiteBox, { ToolsKPIsData, WhiteBox2 } from "../components/partials/box";
import WebsiteIcon from "../assets/icons/website.svg";
import Mail from "../assets/icons/mail.svg";
import { createMarkup, MapDashboardComponent } from "./dashboard";
import { forwardRef, HTMLAttributes } from "react";
import ChartIcon from "../assets/icons/chart.svg";

// Define the extra props type
interface ExtraProps {
	currentTool?: any;
	mapCountries?: any;
	formInfo?: any;
	newKpiMapper?: any;
}

type Props = ExtraProps & HTMLAttributes<HTMLDivElement>;

const PdfPrint = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const inputCurrentTool = props?.currentTool;
	const mapCountries = props?.mapCountries || [];
	// Current Tool mock data
	const currentTool = {
		kpiSelection: inputCurrentTool?.kpiSelection || "",
		toolSelection: inputCurrentTool?.toolSelection || [],
		image: {
			url: inputCurrentTool?.image?.url || inputCurrentTool?.logo || "",
		},
		toolName: inputCurrentTool?.toolName,
		// toolName: inputCurrentTool?.toolName || "Digital Assessment Tool",
		description: inputCurrentTool?.description,
		// description: inputCurrentTool?.description || `
		//   <div>
		//     <p>A comprehensive digital assessment platform designed to evaluate and track progress.</p>
		//     <p>Features include:</p>
		//     <ul>
		//       <li>Automated scoring</li>
		//       <li>Progress tracking</li>
		//       <li>Detailed analytics</li>
		//     </ul>
		//   </div>
		// `,
		resources: inputCurrentTool?.resources,
		// resources: [
		// 	{
		// 		material: "Getting Started Guide",
		// 		name: "Getting Started Guide",
		// 		link: "https://example.com/getting-started",
		// 	},
		// 	{
		// 		material: "Technical Documentation",
		// 		name: "Technical Documentation",
		// 		link: "https://example.com/documentation",
		// 	},
		// 	{
		// 		material: "Best Practices",
		// 		name: "Best Practices",
		// 		link: "https://example.com/best-practices",
		// 	},
		// ],
	};

	// Contact details mock data
	const contact = [
		{ icon: WebsiteIcon, value: inputCurrentTool?.website },
		{ icon: Mail, value: inputCurrentTool?.contactEmailAddress },
	];
	// const contact = [
	// 	{ icon: WebsiteIcon, value: "https://www.example.com" },
	// 	{ icon: Mail, value: "paulkolapo8@gmail.com" },
	// ];

	// Webinar links mock data
	const webinar = [inputCurrentTool?.webinar];
	// const webinar = ["https://www.youtube.com/watch?v=abc123xyz"];
	// console.log({ webinar });

	// Start flag for conditional rendering
	const start = true;

	return (
		<div ref={ref}>
			<div className="w-full bg-[#F8FAFC]">
				<div className="">
					<WhiteBox2 className="w-full">
						<div className="flex gap-6 items-center">
							{currentTool?.image?.url && (
								<img src={currentTool?.image?.url || ""} alt="" className="" />
							)}
							<h6 className="text-base font-medium text-da-blue-600">
								{currentTool?.toolName}
							</h6>
						</div>
						<div
							className="
                    text-sm font-normal text-da-blue-600 mt-4
                    "
							dangerouslySetInnerHTML={createMarkup(currentTool?.description)}
						/>
					</WhiteBox2>
					<div className="mt-2 grid grid-cols-3 gap-8">
						<div className="col-span-2 flex flex-col">
							<WhiteBox className="h-full">
								<h4 className="text-base font-medium text-[#000929]">
									Resources
								</h4>
								<div
									style={{
										border: "1px solid #E2E8F0",
									}}
									className="mt-5 h-10 w-full grid grid-cols-3">
									<div className="cols-span-1 border-r border-r-[#E2E8F0] flex justify-start items-center h-full w-full">
										<h4 className="text-sm pl-4 font-medium text-da-blue-600">
											Resource Title
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
												target="_blank"
												rel={"noreferrer"}
												className="text-sm font-normal text-da-blue-100">
												{r?.link}
											</a>
										</div>
									</div>
								))}
							</WhiteBox>
						</div>
						<div className="col-span-1 flex flex-col">
							<WhiteBox className="h-full">
								<h4 className="text-base font-medium text-[#000929]">
									Contact Details
								</h4>
								<div className="mt-5 space-y-3">
									{contact?.map(c => (
										<div className="flex items-center gap-2">
											<img src={c?.icon} alt="" className="" />
											{start && (
												<a
													href={c?.value}
													target="_blank"
													rel={"noreferrer"}
													className="text-sm font-normal text-da-blue-100">
													{c?.value}
												</a>
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
												{start && (
													<div className="w-full h-56">
														<ReactPlayer
															url={c}
															width="100%"
															height="100%"
															style={{
																borderRadius: "24px",
															}}
															controls
														/>
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							</WhiteBox>
						</div>
					</div>
				</div>
				<div className="w-full">
					<div className="w-full mt-3 grid grid-cols-3 gap-5 page-break">
						<div
							style={{
								boxShadow: "4px 4px 100px 0px #00000014",
							}}
							className="col-span-2 h-72 overflow-hidden bg-white rounded-lg p-5 page-break">
							<h4 className="text-base font-medium text-[#000929]">
								Countries using sanitation data tools
							</h4>
							<div className="flex gap-5 pt-4">
								<div className="w-[70%]">
									<MapDashboardComponent
										mapCountries={mapCountries}
										currentTool={currentTool}
										start={start}
									/>

									{/* <img src={Map} alt="" className="mt-4" /> */}
								</div>
								<div className="w-[30%]">
									<h5 className="text-sm whitespace-nowrap font-medium text-[#000929]">
										{mapCountries?.length}{" "}
										{mapCountries?.length === 1 ? "Country" : "Countries"}{" "}
										Available
									</h5>
									<ul className="list-disc h-64 overflow-y-scroll noscroll list-inside space-y-2 mt-3 text-xs font-normal text-da-blue-600">
										{mapCountries?.map((it: any, i: number) => (
											<li key={i} className="page-break">
												{it?.country}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className="col-span-1">
							<WhiteBox>
								<h4 className="text-base font-medium text-[#000929]">
									Data Type Generated
								</h4>
								<div className="mt-5 space-y-3">
									{currentTool &&
										props?.newKpiMapper?.data?.map((tool, i) => (
											<div
												key={i}
												className="flex items-center gap-2 page-break">
												{start ? (
													<img src={ChartIcon} alt="" className="" />
												) : (
													<div className="h-3 rounded-tr-3xl w-12 bg-[#D2D7D4]"></div>
												)}
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
					{inputCurrentTool && (
						<div className="mt-5 grid grid-cols-3 gap-5">
							{props?.formInfo?.map((tool: any, i: number) => (
								<ToolsKPIsData
									start
									data={tool?.data}
									title={tool?.category}
									key={i}
									prevData={currentTool?.kpiSelection}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

export default PdfPrint;
