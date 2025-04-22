import { useEffect, useState } from "react";
import MainContainer from "../../components/app/maincontainer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainBtn } from "../../components/app/buttons";
import {
	ImageBox,
	ModalSelect,
	NewInput,
	TextBox,
} from "../../components/inputs/main";
import StartMapping from "../../components/modals/select-tool";
import { useRawdataStore } from "../../data/stores/loggerStore";
import { apiCall } from "../../data/useFetcher";
import { Controller, useForm } from "react-hook-form";
import useErrorStore from "../../data/stores/errorStore";
import { toast } from "react-toastify";
import DoneModal from "../../components/modals/donemodal";
import { ToolsKPIsData } from "../../components/partials/box";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import InfoModal from "../../components/modals/infomodal";

const AddTools = () => {
	const navigate = useNavigate();
	const [modal, setModal] = useState(""),
		[getSearch] = useSearchParams();

	let { getLogger, data, getDynamicLogger } = useRawdataStore(),
		{ kpidata, regionCountry }: any = useRawdataStore(),
		tools = data?.docs?.sort(
			(
				a: { category: { toString: () => string } },
				b: { category: { toString: () => any } }
			) => {
				// Compare the values of the specified key in a case-insensitive manner
				return a?.category?.toString()?.localeCompare(b?.category?.toString());
			}
		),
		[selection, setSelection] = useState<any>(null),
		{
			control,
			handleSubmit,
			formState: { errors },
			reset,
		} = useForm({
			defaultValues: {
				toolName: "",
				description: "",
				contactEmailAddress: "",
				website: "",
				webinar: "",
				logo: "",
				additionalInformation: "",
			},
		}),
		// kpisList = [
		// 	{
		// 		category: "Operational",
		// 		data: [
		// 			{
		// 				title: "Recordable incidents of injury or illness",
		// 				status: "good",
		// 			},
		// 			{ title: "Risk assessment and response preparedness", status: "bad" },
		// 			{ title: "Ongoing operational resilliency", status: "good" },
		// 		],
		// 	},
		// 	{
		// 		category: "Infrastructure",
		// 		data: [
		// 			{
		// 				title: "Recordable incidents of injury or illness",
		// 				status: "good",
		// 			},
		// 			{ title: "Risk assessment and response preparedness", status: "bad" },
		// 			{ title: "Ongoing operational resilliency", status: "good" },
		// 		],
		// 	},
		// 	{
		// 		category: "Commercial",
		// 		data: [
		// 			{
		// 				title: "Recordable incidents of injury or illness",
		// 				status: "good",
		// 			},
		// 			{ title: "Risk assessment and response preparedness", status: "bad" },
		// 			{ title: "Ongoing operational resilliency", status: "good" },
		// 		],
		// 	},
		// ],
		// initInfo: { category?: string; data?: any[] } = {},
		[formInfo, setFormInfo] = useState([]),
		init2: {
			material?: string;
			link?: string;
			logo?: string | File;
		} = {},
		[itemForm, setItemForm] = useState([init2]),
		init3: {
			address?: string;
		} = {},
		[itemUtil, setItemUtil] = useState([init3]),
		regionTools = regionCountry?.docs,
		[newTool, setNewTool] = useState<any>(null);

	useEffect(() => {
		if (regionTools && tools) {
			let filteredArray = tools.filter(
				(item1: any) =>
					!regionTools.some((item2: any) => item1?.category === item2?.category)
			);

			filteredArray?.splice(1, 0, ...regionTools);
			setNewTool(filteredArray);

			// console.log({ filteredArray, regionTools, tools });
		}
	}, [regionTools, tools]);

	let [loading, setLoading] = useState(null),
		[preloading, setPreLoading] = useState(true),
		[info, setInfo] = useState<any>(""),
		[logo, setLogo] = useState<File | null>(null),
		{ returnErrors } = useErrorStore();
	const onSubmit = async (data: any) => {
		setLoading(true);

		if (logo) {
			let { response, errArr, errMsg } = await apiCall({
				type: "post",
				url: `/api/v1/file?returnOriginal=true`,
				data: {
					intendedFile: logo,
				},
				headers: {
					"Content-Type": "multipart/form-data",
				},
				noToast: true,
			});
			// console.log({ response, errArr, errMsg });
			if (errArr) {
				setLoading(false);
				return returnErrors(errArr);
			}
			if (errMsg) {
				setLoading(false);
				return toast.error(errMsg);
			}
			if (response) {
				let dd = response?.data?.data || response?.data || response;
				data.logo = dd?.[0]?.url;
			}
		}

		let newItemsForm = itemForm;
		if (itemForm?.length > 0) {
			let uploadedVersion = [];
			for (let u = 0; u < itemForm?.length; u++) {
				const element = itemForm?.[u];
				if (element?.material && element?.logo) {
					if (element?.logo) {
						let { response, errArr, errMsg } = await apiCall({
							type: "post",
							url: `/api/v1/file?returnOriginal=true`,
							data: {
								intendedFile: element?.logo,
							},
							headers: {
								"Content-Type": "multipart/form-data",
							},
							noToast: true,
						});
						// console.log({ response, errArr, errMsg });
						if (errArr) {
							setLoading(false);
							return returnErrors(errArr);
						}
						if (errMsg) {
							setLoading(false);
							return toast.error(errMsg);
						}
						if (response) {
							let dd = response?.data?.data || response?.data || response;
							uploadedVersion?.push({
								material: element?.material,
								link: dd?.[0]?.url,
							});
						}
					}
				}
			}
			newItemsForm = uploadedVersion;
		}

		let { response, errArr, errMsg } = await apiCall({
			type: "post",
			url: `/api/v1/tools/manage-new-request`,
			data: {
				tools: [
					{
						...data,
						toolSelection: Object.entries(selection)
							.map(([key, value]) => ({
								category: key,
								data: Array.isArray(value) ? value : [value], // Ensure data is always an array
							}))
							?.filter(it => it?.data?.length > 0),
						kpiSelection: formInfo
							?.map(it => {
								let filterOut = it?.data?.filter(ic => ic?.status);
								return {
									...it,
									data: filterOut,
								};
							})
							?.filter(it => it?.data?.length > 0)
							?.map(it => {
								return {
									category: it?.category,
									status: it?.status,
									kpiId: it?._id,
									data: it?.data,
									usecaseCategory: it?.usecaseCategory,
								};
							}),
						resources: newItemsForm?.filter(it => it?.link && it?.material),
						utilities: itemUtil?.filter(it => it?.address),
					},
				],
				requestId: getSearch?.get("requestId"),
				contactEmailAddress: getSearch?.get("contactEmailAddress"),
			},
		});
		// console.log({ response, errArr, errMsg });
		if (errArr) {
			setLoading(false);
			return returnErrors(errArr);
		}
		if (errMsg) {
			setLoading(false);
			return toast.error(errMsg);
		}
		setLoading(false);
		if (response) {
			setModal("done");
			return;
		}
		setLoading(false);
	};

	useEffect(() => {
		if (getSearch?.get("contactEmailAddress") && getSearch?.get("requestId")) {
			const onValidateSubmit = async () => {
				let { response, errArr, errMsg } = await apiCall({
					type: "get",
					url: `/api/v1/tools/new-request/manage-new-request?contactEmailAddress=${getSearch?.get(
						"contactEmailAddress"
					)}&requestId=${getSearch?.get("requestId")}`,
					noToast: true,
				});
				console.log({ response, errArr, errMsg });
				if (errArr) {
					setPreLoading(false);
					returnErrors(errArr);
					navigate("/");
					return;
				}
				if (errMsg) {
					setPreLoading(false);
					toast.error(errMsg);
					navigate("/");
					return;
				}
				setPreLoading(false);
				if (response) {
					console.log({ response }, "new-tool");
					let newD = response?.data || response,
						updReset: any = {};
					if (newD?.contactEmailAddress)
						updReset.contactEmailAddress = newD?.contactEmailAddress;
					if (newD?.toolName) updReset.toolName = newD?.toolName;
					if (newD?.website) updReset.website = newD?.website;
					if (newD?.description) updReset.description = newD?.description;
					if (Object.keys(updReset)?.length > 0) reset(updReset);
					let newSelect: any = {};

					if (newD?.region) newSelect.REGION = [newD?.region];
					// setSelection((prev: any) => {
					// 	return { ...prev, REGION: [newD?.region] };
					// });
					if (newD?.country) newSelect.COUNTRY = [newD?.country];
					// setSelection((prev: any) => {
					// 	return { ...prev, COUNTRY: [newD?.country] };
					// });

					if (Object.keys(newSelect)?.length > 0) {
						setSelection(prev => {
							return { ...prev, ...newSelect };
						});
					}

					return;
				}
				setPreLoading(false);
			};
			onValidateSubmit();
		} else {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSearch, navigate]);

	useEffect(() => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getDynamicLogger(null, "kpidata");
		if (selection?.["APPLICATION LEVEL"]) {
			console.log({ s: selection?.["APPLICATION LEVEL"] });
			apiCall({
				type: "get",
				url: `/api/v1/rawdata/manage-kpis?category=APPLICATION LEVEL&data=${selection?.["APPLICATION LEVEL"]}&pagination=not`,
				getter: (d: any) => getDynamicLogger(d, "kpidata"),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selection]);

	useEffect(() => {
		if (selection && kpidata) {
			let thisData = [...kpidata?.docs];
			setFormInfo(thisData);
		}
	}, [kpidata, selection]);

	const handleKpi = (
		event: React.ChangeEvent<HTMLInputElement>,
		formIndex: number,
		kpiIndex: number
	) => {
		setFormInfo(prev => {
			const newInputs = [...prev];
			let { name, value, title } = event?.target;
			// newInputs[formIndex].subTitle[kpiIndex][name] = value;
			let clonedObject = {
				...newInputs[formIndex]?.data[kpiIndex],
				[name]: title || value,
				status: title || value,
			};

			let arr1 = [
				...newInputs[formIndex]?.data?.map((it, i) =>
					i === kpiIndex ? clonedObject : it
				),
			];

			let arr2 = [
				...newInputs?.map((it, i) =>
					i === formIndex
						? {
								...it,
								data: arr1,
						  }
						: it
				),
			];

			return arr2;
		});
		// }
	};

	const handleInputChangeForMutipleItem = (
		event: React.ChangeEvent<HTMLInputElement> | any,
		index: number,
		field: string
	) => {
		const { value } = event?.target;
		let itemValue = value;

		setItemForm(prevRows => {
			const newRows = [...prevRows];
			newRows[index][field] = itemValue;
			return newRows;
		});
	};
	const handleInputChangeForMutipleItemUtil = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number,
		field: string
	) => {
		const { value } = event.target;
		let itemValue = value;

		setItemUtil(prevRows => {
			const newRows = [...prevRows];
			newRows[index][field] = itemValue;
			return newRows;
		});
	};

	const handleDeleteRowForMutipleItem = (index: number) => {
		setItemForm(prevRows => {
			const newRows = [...prevRows];
			newRows.splice(index, 1);
			return newRows;
		});
	};
	const handleDeleteRowForMutipleItemUtil = (index: number) => {
		setItemUtil(prevRows => {
			const newRows = [...prevRows];
			newRows.splice(index, 1);
			return newRows;
		});
	};

	const addRowForMutipleItem = () => {
		const newRow = {};
		setItemForm([...itemForm, newRow]);
	};
	const addRowForMutipleItemUtils = () => {
		const newRow = {};
		setItemUtil([...itemUtil, newRow]);
	};

	if (preloading) return <>Loading...</>;

	// console.log({ formInfo, selection });

	return (
		<div>
			<MainContainer>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-8 flex justify-between items-center">
						<div className="flex gap-2">
							<FaChevronLeft
								color="#334155"
								onClick={() => navigate("/")}
								className="cursor-pointer mt-1"
							/>
							<div>
								<h1 className="text-xl font-semibold text-da-blue-600 inter">
									{"Add Tool"}
								</h1>
								<div className="hidden gap-2 items-center">
									<span className="text-base font-normal text-[#334155]">
										Dashboard
									</span>
									<FaChevronRight color="#334155" size={10} />
									<span className="text-base font-normal text-[#334155]">
										{"Add"} Tool
									</span>
								</div>
							</div>
						</div>
						{/* <div className="flex gap-5">
						<MainBtn
							onClick={() => navigate("/")}
							className="border border-[#FECACA]"
							text={"Cancel"}
							bg={"transparent"}
							color={"#EF4444"}
							type="button"
						/>
						<MainBtn
							onClick={() => console.log("object")}
							text={"Continue"}
							disabled={loading || !selection}
							loading={loading}
							bg={"#3787FF"}
							color={"white"}
							type="submit"
						/>
					</div> */}
						<ActionButton
							navigate={navigate}
							loading={loading}
							selection={selection}
						/>
					</div>
					<div className="mt-12 bg-white w-full p-8">
						<div
							style={{
								borderBottom: "1px solid #E2E8F0",
							}}
							className="h-full w-1/2 pb-3">
							<h4 className="text-xl font-semibold inter text-da-blue-600">
								General Information
							</h4>
						</div>
						<div className="mt-6">
							<div className="w-1/2 space-y-5">
								<div>
									<Controller
										name="toolName"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<NewInput
												type="text"
												required
												name={name}
												value={value}
												label={"Tool Name"}
												onChange={onChange}
												placeholder={"Type your product name"}
											/>
										)}
									/>
									{errors.toolName && (
										<p className="text-[#dc2626] text-xs">
											{errors.toolName.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="description"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextBox
												name={name}
												value={value}
												onChange3={onChange}
												label={"Description"}
												// placeholder={"Tell us about your tool and company here"}
												setState={(e: any[]) => {
													onChange(e);
												}}
												required
												type="editor"
												placeholder={`Describe the tool’s purpose, key features, and how it benefits users or organizations. Include details like functionality, integrations, and target audience if applicable.`}
											/>
										)}
									/>
									{errors.description && (
										<p className="text-[#dc2626] text-xs">
											{errors.description.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="contactEmailAddress"
										control={control}
										rules={{
											required: "This field is required",
											pattern: {
												value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
												message: "Invalid email format",
											},
										}}
										render={({ field: { value, onChange, name } }) => (
											<NewInput
												required
												type="email"
												name={name}
												value={value}
												label={"Contact Email Address"}
												placeholder={"email address"}
												onChange={onChange}
											/>
										)}
									/>
									{errors.contactEmailAddress && (
										<p className="text-[#dc2626] text-xs">
											{errors.contactEmailAddress.message}
										</p>
									)}
								</div>
								<div className="grid grid-cols-2 gap-5 mb-4">
									<div>
										<Controller
											name="website"
											control={control}
											rules={{
												required: "This field is required",
												pattern: {
													value:
														/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
													message: "Invalid url format",
												},
											}}
											render={({ field: { value, onChange, name } }) => (
												<NewInput
													type="url"
													name={name}
													value={value}
													label={"Website"}
													// placeholder={"Type your website"}
													onChange={onChange}
													required
													placeholder={`Enter the website of the tool or tool owner`}
												/>
											)}
										/>
										{errors.website && (
											<p className="text-[#dc2626] text-xs">
												{errors.website.message}
											</p>
										)}
									</div>
									<div>
										<Controller
											name="webinar"
											control={control}
											rules={
												{
													// required: "This field is required",
													// pattern: {
													// 	value:
													// 		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
													// 	message: "Invalid url format",
													// },
												}
											}
											render={({ field: { value, onChange, name } }) => (
												<NewInput
													type="url"
													name={name}
													value={value}
													label={"Webinar"}
													placeholder={"Type your webinar "}
													onChange={onChange}
												/>
											)}
										/>
										{errors.webinar && (
											<p className="text-[#dc2626] text-xs">
												{errors.webinar.message}
											</p>
										)}
									</div>
								</div>
								<div className="mb-4">
									<Controller
										name="logo"
										control={control}
										rules={{
											required: !logo ? "This field is required" : false,
											// pattern: {
											// 	value:
											// 		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
											// 	message: "Invalid url format",
											// },
										}}
										render={({ field: { value, onChange, name } }) => (
											<ImageBox
												type="url"
												name={name}
												value={value}
												label={"Logo"}
												placeholder={"Type your logo url "}
												onChange={onChange}
												setState={(e: any) => {
													setLogo(e);
												}}
												data={value}
												logo={logo}
											/>
										)}
									/>
									{errors.logo && (
										<p className="text-[#dc2626] text-xs">
											{errors.logo.message}
										</p>
									)}
								</div>
								<label className="text-[#334155] font-medium text-sm inter mt-4">
									Resources
								</label>
								{itemForm?.map((item, index) => (
									<>
										<div className="relative grid grid-cols-2 w-4/5 gap-5">
											<div>
												<NewInput
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleInputChangeForMutipleItem(
															e,
															index,
															"material"
														)
													}
													value={item.material}
													label={index === 0 ? "Materials Title" : ""}
													// placeholder={"EDAMS Technology"}
													placeholder={`Enter the title of the tool's learning material`}
												/>
											</div>
											<div className="">
												{/* <NewInput
													label={index === 0 ? "Link" : ""}
													placeholder="https://www.google.com"
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleInputChangeForMutipleItem(e, index, "link")
													}
													type="url"
													value={item.link}
												/> */}
												<ImageBox
													type="url"
													// name={name}
													// value={value}
													label={"Material"}
													placeholder={"Type your logo url "}
													setState={(e: any) => {
														handleInputChangeForMutipleItem(
															{
																target: {
																	value: e,
																},
															},
															index,
															"logo"
														);
													}}
													data={item?.link}
													logo={item?.logo as File}
												/>
											</div>
											<div
												onClick={() => handleDeleteRowForMutipleItem(index)}
												className="md:absolute self-center -right-20 cursor-pointer">
												<p className="text-sm text-red-600 flex items-center md:mt-2 gap-2">
													<span>
														<MdDelete />
													</span>
													Remove
												</p>
											</div>
										</div>
									</>
								))}
								<p
									onClick={addRowForMutipleItem}
									className="flex items-center gap-2 text-bluerolodex f-medium my-3 cursor-pointer">
									<span>
										<IoIosAdd />
									</span>
									Add resource
								</p>
								<label className="text-[#334155] font-medium text-sm inter mt-4">
									Utilities
								</label>
								{itemUtil?.map((item, index) => (
									<>
										<div className="relative grid w-4/5 gap-5">
											<div>
												<NewInput
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleInputChangeForMutipleItemUtil(
															e,
															index,
															"address"
														)
													}
													value={item.address}
													label={index === 0 ? "Address" : ""}
													placeholder={"EDAMS Technology"}
												/>
											</div>
											<div
												onClick={() => handleDeleteRowForMutipleItemUtil(index)}
												className="md:absolute self-center -right-20 cursor-pointer">
												<p className="text-sm text-red-600 flex items-center md:mt-2 gap-2">
													<span>
														<MdDelete />
													</span>
													Remove
												</p>
											</div>
										</div>
									</>
								))}
								<p
									onClick={addRowForMutipleItemUtils}
									className="flex items-center gap-2 text-bluerolodex f-medium my-3 cursor-pointer">
									<span>
										<IoIosAdd />
									</span>
									Add utility
								</p>
								<div>
									<Controller
										name="additionalInformation"
										control={control}
										rules={
											{
												// required: "This field is required",
											}
										}
										render={({ field: { value, onChange, name } }) => (
											<TextBox
												name={name}
												value={value}
												onChange3={onChange}
												label={"Additional Information"}
												placeholder={"Any other information"}
												setState={(e: any[]) => {
													onChange(e);
												}}
												type="editor"
											/>
										)}
									/>
									{errors.additionalInformation && (
										<p className="text-[#dc2626] text-xs">
											{errors.additionalInformation.message}
										</p>
									)}
								</div>
							</div>
							<div className="mt-8">
								<div
									style={{
										borderBottom: "1px solid #E2E8F0",
									}}
									className="h-full w-1/2 pb-3">
									<h4 className="text-xl font-semibold inter text-da-blue-600">
										Tool Category
									</h4>
								</div>
								<div className="mt-6 grid w-1/2 grid-cols-2 gap-6">
									{tools?.map((tool: any, i: number) => (
										<ModalSelect
											key={i}
											label={tool?.category}
											handleModal={() => setModal("start")}
											selected={
												selection?.[tool?.category]
													? selection?.[tool?.category]
															?.toString()
															?.split(",")
															?.join(", ")
													: null
											}
										/>
									))}
								</div>
								<div className="mt-6 grid grid-cols-2 w-4/5 gap-6">
									{formInfo?.map((tool: any, i: number) => (
										<ToolsKPIsData
											start
											data={tool?.data}
											title={tool?.category}
											selection
											handleKpi={handleKpi}
											key={i}
											formIndex={i}
											shadow
											setInfo={() => setInfo(tool)}
										/>
									))}
								</div>
							</div>
						</div>
						<div className="py-8 flex justify-end items-center">
							<ActionButton
								navigate={navigate}
								loading={loading}
								selection={selection}
							/>
						</div>
					</div>
					{modal === "start" && (
						<StartMapping
							handleClose={() => setModal("")}
							data={newTool}
							handleComplete={da => {
								setSelection(da);
								setModal("");
							}}
							defaultSelection={selection}
						/>
					)}
					{modal === "done" && (
						<DoneModal
							page={"Tool"}
							handleClose={() => setModal("")}
							path={"/"}
							text="Go to Map"
						/>
					)}
					{info && (
						<InfoModal
							handleClose={() => setInfo("")}
							title={info?.category || "Infrastructure and Stability"}
							description={info?.description}
						/>
					)}
				</form>
			</MainContainer>
		</div>
	);
};

export default AddTools;

export const ActionButton = ({ navigate, loading, selection }: any) => {
	return (
		<div className="flex gap-5">
			<MainBtn
				onClick={() => navigate("/")}
				className="border border-[#FECACA]"
				text={"Cancel"}
				bg={"transparent"}
				color={"#EF4444"}
				type="button"
			/>
			<MainBtn
				onClick={() => console.log("object")}
				text={"Continue"}
				disabled={loading || !selection}
				loading={loading}
				bg={"#3787FF"}
				color={"white"}
				type="submit"
			/>
		</div>
	);
};