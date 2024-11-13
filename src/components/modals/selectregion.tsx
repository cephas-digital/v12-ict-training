import React, { useEffect, useState } from "react";
import SideModalcontainer from "./sidemodalcontainer";
import Close from "../../assets/icons/close.svg";
import Reset from "../../assets/icons/reset.svg";
import { NormalBtn } from "../partials/buttons";
import { SearchDataInput } from "./startmaping";
import { apiCall } from "../../data/useFetcher";
import { useRawdataStore } from "../../data/stores/loggerStore";

const filters = [
	{
		id: "region",
		label: "Region",
		options: [
			"All Regions",
			"Central Africa",
			"Eastern Africa",
			"Sourthern Africa",
			"South Asis",
			"Western Africa",
		],
		type: "checkbox",
	},
	{
		id: "country",
		label: "Country",
		options: [
			"Angola",
			"Botswana",
			"Cameroon",
			"Central African Republic",
			"Chad",
			"Democratic Republic of the Congo",
		],
		type: "checkbox",
	},
];

const SelectRegion = ({
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
					acc[data ? filter?.category : filter?.id] = data
						? filter?.category?.toLowerCase() === "application level"
							? ""
							: []
						: filter?.type === "radio"
						? ""
						: [];
					return acc;
				}, {})
		),
		{ getDynamicLogger } = useRawdataStore();

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

	useEffect(() => {
		if (selectedOptions["REGION"]?.length > 0) {
			let newObj = { REGION: selectedOptions?.["REGION"] };
			handleReset("COUNTRY", "checkbox");
			apiCall({
				type: "post",
				url: `/api/v1/tools/manage-region-country?pagination=not`,
				data: {
					toolSelection: Object.entries(newObj)
						.map(([key, value]) => ({
							category: key,
							data: Array.isArray(value) ? value : [value], // Ensure data is always an array
						}))
						?.filter(it => it?.data?.length > 0),
				},
				getter: (d: any) => getDynamicLogger(d, "regionCountry"),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOptions?.["REGION"]]);

	// console.log({ selectedOptions });

	return (
		<div>
			<SideModalcontainer>
				<div
					style={{
						borderBottom: "1px solid #D9D9D9",
					}}
					className="h-12 w-full px-4 flex justify-between items-center">
					<h5 className="text-base font-medium text-black">
						Filter by Geography
					</h5>
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
												? filter?.category?.toLowerCase() ===
												  "application level"
													? "radio"
													: "checkbox"
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

export default SelectRegion;
