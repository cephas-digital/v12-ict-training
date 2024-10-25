import React, { useEffect, useState } from "react";
import SideModalcontainer from "./sidemodalcontainer";
import Close from "../../assets/icons/close.svg";
import SearchInput from "../partials/inputs";
import { NormalBtn } from "../partials/buttons";
import { useRawdataStore } from "../../data/stores/loggerStore";
import { apiCall } from "../../data/useFetcher";

const SelectToolModal = ({
	handleClose,
	preActive,
	preSelection,
	selectLevel,
	handleSelect,
}: {
	handleClose?: () => any;
	handleSelect?: (da: any) => any;
	preActive?: any;
	preSelection?: any;
	selectLevel?: "one" | "two";
}) => {
	const [active, setActive] = useState<any>(""),
		[selection, setSelection] = useState(null);
	const [options, setOptions] = useState(["utility", "regulatory"]);
	const utilities = [
		"Integrated Management Information System",
		"Real-time Monitoring Information System ",
		"NWASCO Information System (NIS)",
	];

	console.log(active);

	let { data, getDynamicLogger } = useRawdataStore(),
		{ compareTools }: any = useRawdataStore();

	useEffect(() => {
		let findApp = data?.docs?.find(
			it => it?.category?.toLowerCase() === "application level"
		);
		if (findApp) {
			let filterData = findApp?.data?.filter((item: any) =>
				["utility/municipal", "regulatory"]?.includes(
					item?.title?.toLowerCase()
				)
			);
			setOptions(filterData);
		}
	}, [data]);

	useEffect(() => {
		if (active) {
			apiCall({
				type: "post",
				url: `/api/v1/tools/manage-tools?pagination=not`,
				getter: (d: any) => getDynamicLogger(d, "compareTools"),
				data: {
					toolSelection: [
						{
							category: "APPLICATION LEVEL",
							data: [active?.title],
						},
					],
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	useEffect(() => {
		if (preActive) setActive(preActive);
	}, [preActive]);

	useEffect(() => {
		if (preSelection) setSelection(preSelection);
	}, [preSelection]);

	return (
		<div>
			<SideModalcontainer>
				<div
					style={{
						borderBottom: "1px solid #D9D9D9",
					}}
					className="h-12 w-full px-4 flex justify-between items-center">
					<h5 className="text-base font-medium text-black">
						Select One Sanitation Tool
					</h5>
					<img onClick={handleClose} src={Close} alt="" className="" />
				</div>
				<div className="mt-6 px-4">
					<h5 className="text-base text-da-blue-600 font-medium">Category</h5>
					<div className="mt-5 space-y-4">
						{options?.map((opt: any, i: number) => (
							<label
								key={i}
								className="flex items-center gap-2 capitalize mb-2 text-sm font-normal text-black">
								<input
									type="radio"
									value={opt?.title || opt}
									name="option"
									checked={active === opt}
									onChange={() => {
										if (preActive && selectLevel === "two") {
										} else {
											setActive(opt);
											if (selection && preActive?.title !== opt?.title)
												setSelection({});
										}
									}}
									className="form-radio size-5 border border-[#AAB7C6]"
									readOnly={preActive && selectLevel === "two" ? true : false}
								/>
								{opt?.title}
							</label>
						))}
					</div>
					<div className="mt-6">
						{active === "utility" && (
							<div className="">
								<SearchInput placeholder={"Search Tool"} />
								<div className="mt-5 space-y-4">
									{utilities?.map(opt => (
										<label
											key={opt}
											className="flex items-center gap-2 capitalize mb-2 text-sm font-normal text-black">
											<input
												type="radio"
												value={opt}
												name="option"
												checked={active === opt}
												onChange={e => setActive(e.target.value)}
												className="form-radio size-5 border border-[#AAB7C6]"
											/>
											{opt}
										</label>
									))}
								</div>
							</div>
						)}
						{active && (
							<div className="">
								<SearchInput placeholder={"Search Tool"} />
								<div className="mt-5 space-y-4">
									{compareTools?.docs
										?.filter((it: any) => {
											let d = it;
											if (selection?.one && selectLevel === "two")
												d = selection?.one?._id !== it?._id;
											if (selection?.two && selectLevel === "one")
												d = selection?.two?._id !== it?._id;
											return d;
										})
										?.map((opt: any, i: number) => (
											<label
												key={i}
												className="flex items-center gap-2 capitalize mb-2 text-sm font-normal text-black">
												<input
													type="radio"
													value={opt}
													name="optionTools"
													checked={selection?.[selectLevel]?._id === opt?._id}
													onChange={e =>
														setSelection(prev => {
															return { ...prev, [selectLevel]: opt };
														})
													}
													className="form-radio size-5 border border-[#AAB7C6]"
												/>
												{opt?.toolName}
											</label>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="my-5 flex justify-end px-4 gap-5">
					<NormalBtn
						text={"Cancel"}
						onClick={handleClose}
						className="border border-[#A3A3A3] text-[#475569] bg-transparent"
					/>
					<NormalBtn
						text={"Apply Filter"}
						onClick={() => {
							if (selectLevel === "one") if (!active || !selection?.one) return;
							if (selectLevel === "two") if (!active || !selection?.two) return;
							if (handleSelect) {
								handleSelect({
									selection,
									active,
								});
							} else handleClose();
						}}
						className="bg-da-blue-100 text-white"
					/>
				</div>
			</SideModalcontainer>
		</div>
	);
};

export default SelectToolModal;
