import { useState, useEffect } from "react";
import SideModalcontainer from "./sidemodalcontainer";
import Close from "../../assets/icons/close.svg";
import Reset from "../../assets/icons/reset.svg";
import SearchInput from "../partials/inputs";
import { NormalBtn } from "../partials/buttons";

const filters = [
	{
		id: "application",
		label: "Application Level",
		options: ["National", "Regulatory", "Utility / Municipal"],
		type: "radio",
	},
	{
		id: "subsector",
		label: "Sub-sector",
		options: ["Water", "Sanitation", "Integrated Water and Sanitation"],
		type: "checkbox",
	},
	{
		id: "toolPurpose",
		label: "Tool Purpose",
		options: ["Off the shelf", "Fit for Purpose"],
		type: "checkbox",
	},
	{
		id: "cost",
		label: "Cost",
		options: ["Open-source", "Licensed"],
		type: "checkbox",
	},
	{
		id: "dataHosting",
		label: "Data Hosting",
		options: ["Cloud based", "On-premise"],
		type: "checkbox",
	},
];

const StartMapping = ({
	handleClose,
	data,
	handleComplete,
	defaultSelection,
	setStart,
}: {
	handleClose?: () => void;
	setStart?: () => void;
	handleComplete?: (da: any) => void;
	data?: any[];
	defaultSelection?: any;
}) => {
	const [selectedOptions, setSelectedOptions] = useState(
		defaultSelection ||
			(data || filters).reduce((acc, filter) => {
				acc[data ? filter?.category : filter?.id] = [];
				return acc;
			}, {})
		// defaultSelection ||
		// 	(data || filters).reduce((acc, filter) => {
		// 		acc[data ? filter?.category : filter?.id] = data
		// 			? filter?.category?.toLowerCase() === "application level"
		// 				? ""
		// 				: []
		// 			: filter?.type === "radio"
		// 			? ""
		// 			: [];
		// 		return acc;
		// 	}, {})
	);

	const handleOptionChange = (
		filterId: string,
		option: string,
		type: "radio" | "checkbox"
	) => {
		setSelectedOptions(prev => {
			if (type === "checkbox") {
				const isSelected = prev[filterId].includes(option);
				return {
					...prev,
					[filterId]: isSelected
						? prev[filterId].filter((item: string) => item !== option)
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

	const handleReset = (filterId: string, type: "radio" | "checkbox") => {
		setSelectedOptions(prev => ({
			...prev,
			[filterId]: type === "radio" ? "" : [],
		}));
	};
	const anyOptionsSelected = Object.values(selectedOptions).some(options =>
		Array.isArray(options) ? options.length > 0 : options !== ""
	);
	return (
		<div>
			<SideModalcontainer>
				<div
					style={{
						borderBottom: "1px solid #D9D9D9",
					}}
					className="h-12 w-full px-4 flex justify-between items-center">
					<h5 className="text-base font-medium text-black">Make Selection</h5>
					<img onClick={handleClose} src={Close} alt="" className="" />
				</div>
				<div className="p-4 space-y-6">
					{(data || filters).map((filter, i: number) => (
						<div key={filter?._id || filter?.id || i} className="">
							<div className="flex justify-between items-center">
								<h5 className="text-base text-da-blue-600 font-medium capitalize">
									{filter?.category
										? filter?.category?.toLowerCase()
										: filter?.label}
								</h5>
								<img
									onClick={() =>
										handleReset(
											filter?.category || filter?.id,
											data
												? // filter?.category?.toLowerCase() ===
												  //   "application level"
												  // 	? "radio"
												  // 	:
												  "checkbox"
												: filter?.type
										)
									}
									src={Reset}
									alt=""
									className="cursor-pointer"
								/>
							</div>
							<SearchDataInput
								filter={filter}
								data={data}
								handleOptionChange={handleOptionChange}
								selectedOptions={selectedOptions}
							/>
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
						text={anyOptionsSelected ? "Apply Filter" : "Save Selection"}
						onClick={() => {
							console.log({ selectedOptions });
							if (!anyOptionsSelected) return;
							if (setStart) setStart();
							if (handleComplete) {
								handleComplete(selectedOptions);
							} else handleClose();
						}}
						className="bg-da-blue-100 text-white"
					/>
				</div>
			</SideModalcontainer>
		</div>
	);
};

export const SearchDataInput = ({
	filter,
	data,
	selectedOptions,
	handleOptionChange,
}) => {
	const [newData, setNewData] = useState(null),
		[search, setSearch] = useState(""),
		mainLabel = filter?.category
			? filter?.category?.toLowerCase()
			: filter?.label;
	let thisData = filter?.[data ? "data" : "options"];

	useEffect(() => {
		if (search) {
			document
				.getElementById(`SearchNew-${mainLabel}`)
				.addEventListener("search", () => {
					// console.log({ thisData, search });
					setNewData(thisData);
				});
			let handleSubmit = async () => {
				if (!search) return;

				let ned = thisData?.filter(it => {
					let text = it?.title || it;
					return text?.toLowerCase()?.includes(search?.toLowerCase());
				});
				setNewData(ned);
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (thisData) setNewData(thisData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter, data]);
	// console.log({ filter });

	if (!newData) return;

	return (
		<>
			<div className="mt-3">
				<SearchInput
					placeholder={`Search ${mainLabel}`}
					search={search}
					setSearch={setSearch}
					searchId={`SearchNew-${mainLabel}`}
					miniReset={() => setNewData(thisData)}
				/>
			</div>
			<div className="mt-4">
				{newData
					?.sort(
						(
							a: { title: { toString: () => string } },
							b: { title: { toString: () => any } }
						) => {
							// Compare the values of the specified key in a case-insensitive manner
							let aVal = a?.title || a,
								bVal = b?.title || b;
							return aVal?.toString()?.localeCompare(bVal?.toString());
						}
					)
					?.map((option: any, idx: number) => (
						<InputReloader
							option={option}
							data={data}
							filter={filter}
							handleOptionChange={handleOptionChange}
							selectedOptions={selectedOptions}
							key={idx}
						/>
					))}
			</div>
		</>
	);
};

export const InputReloader = ({
	data,
	filter,
	selectedOptions,
	option,
	handleOptionChange,
}) => {
	let type = data
			? // filter?.category?.toLowerCase() === "application level"
			  // 	? "radio"
			  // 	:
			  "checkbox"
			: filter?.type,
		category = filter?.category || filter?.id,
		mainOption = option?.title || option;

	return (
		<label className="flex items-center gap-2 mb-2 text-sm font-normal text-black">
			<input
				type={type}
				name={category} // For radio buttons to group options
				checked={
					type === "radio"
						? selectedOptions[category] === mainOption
						: selectedOptions[category].includes(mainOption)
				}
				onChange={() => handleOptionChange(category, mainOption, type)}
				className="form-checkbox size-5 border border-[#AAB7C6] "
			/>
			{mainOption}
		</label>
	);
};

// const StartMapping = ({ handleClose, setStart }) => {
// 	const [selectedOptions, setSelectedOptions] = useState(
// 		filters.reduce((acc, filter) => {
// 			acc[filter.id] = filter.type === "radio" ? "" : [];
// 			return acc;
// 		}, {})
// 	);

// 	const handleOptionChange = (filterId, option, type) => {
// 		setSelectedOptions(prev => {
// 			if (type === "checkbox") {
// 				const isSelected = prev[filterId].includes(option);
// 				return {
// 					...prev,
// 					[filterId]: isSelected
// 						? prev[filterId].filter(item => item !== option)
// 						: [...prev[filterId], option],
// 				};
// 			} else if (type === "radio") {
// 				return {
// 					...prev,
// 					[filterId]: option,
// 				};
// 			}
// 			return prev;
// 		});
// 	};

// 	const handleReset = (filterId, type) => {
// 		setSelectedOptions(prev => ({
// 			...prev,
// 			[filterId]: type === "radio" ? "" : [],
// 		}));
// 	};
// 	const anyOptionsSelected = Object.values(selectedOptions).some(options =>
// 		Array.isArray(options) ? options.length > 0 : options !== ""
// 	);
// 	return (
// 		<div>
// 			<SideModalcontainer>
// 				<div
// 					style={{
// 						borderBottom: "1px solid #D9D9D9",
// 					}}
// 					className="h-12 w-full px-4 flex justify-between items-center">
// 					<h5 className="text-base font-medium text-black">Start Mapping</h5>
// 					<img onClick={handleClose} src={Close} alt="" className="" />
// 				</div>
// 				<div className="p-4 space-y-6">
// 					{filters.map(filter => (
// 						<div key={filter.id} className="">
// 							<div className="flex justify-between items-center">
// 								<h5 className="text-base text-da-blue-600 font-medium">
// 									{filter.label}
// 								</h5>
// 								<img
// 									onClick={() => handleReset(filter.id, filter.type)}
// 									src={Reset}
// 									alt=""
// 									className="cursor-pointer"
// 								/>
// 							</div>
// 							<div className="mt-3">
// 								<SearchInput placeholder={`Search ${filter?.label}`} />
// 							</div>
// 							<div className="mt-4">
// 								{filter.options.map((option, idx) => (
// 									<label
// 										key={idx}
// 										className="flex items-center gap-2 mb-2 text-sm font-normal text-black">
// 										<input
// 											type={filter.type}
// 											name={filter.id} // For radio buttons to group options
// 											checked={
// 												filter.type === "checkbox"
// 													? selectedOptions[filter.id].includes(option)
// 													: selectedOptions[filter.id] === option
// 											}
// 											onChange={() =>
// 												handleOptionChange(filter.id, option, filter.type)
// 											}
// 											className="form-checkbox size-5 border border-[#AAB7C6] "
// 										/>
// 										{option}
// 									</label>
// 								))}
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 				<div className="my-5 flex justify-end gap-5">
// 					<NormalBtn
// 						text={"Cancel"}
// 						onClick={handleClose}
// 						className="border border-[#A3A3A3] text-[#475569] bg-transparent"
// 					/>
// 					<NormalBtn
// 						text={anyOptionsSelected ? "Apply Filter" : "Save Selection"}
// 						onClick={() => {
// 							setStart();
// 							handleClose();
// 						}}
// 						className="bg-da-blue-100 text-white"
// 					/>
// 				</div>
// 			</SideModalcontainer>
// 		</div>
// 	);
// };

export default StartMapping;
