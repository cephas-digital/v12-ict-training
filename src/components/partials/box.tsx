import { PendingComp, ProductTableShow } from "./tables";
import Arrows from "../../assets/icons/arrows.svg";
import Info from "../../assets/icons/information.svg";

const WhiteBox = ({ children, className = "", shadow = false }) => {
	return (
		<div
			style={{
				boxShadow: shadow ? "4px 4px 100px 0px #00000014" : "",
			}}
			className={`w-full min-h-72 bg-white rounded-lg p-5 ${className}`}>
			{children}
		</div>
	);
};

export const WhiteBox2 = ({ children, className = "" }) => {
	return (
		<div
			style={{
				boxShadow: "4px 4px 100px 0px #00000014",
			}}
			className={`w-full bg-white rounded-lg p-5 ${className}`}>
			{children}
		</div>
	);
};

export const ProductTableRadio = ({ handleKpi, formIndex, product, index }) => {
	// console.log({ formIndex, index, product });

	return (
		<>
			<button className="flex justify-center items-center text-xlg gap-3">
				<span>Yes</span>
				<input
					type="radio"
					className="form-radio size-4 border border-[#AAB7C6]"
					onChange={e => handleKpi(e, formIndex, index)}
					title="yes"
					name={`status${product?.title || product?.name}${formIndex}${index}`}
					checked={product?.status === "yes"}
				/>
			</button>

			<button className="flex justify-center items-center text-lg gap-3">
				<span>No</span>
				<input
					type="radio"
					className="form-radio size-4 border border-[#AAB7C6]"
					onChange={e => handleKpi(e, formIndex, index)}
					title="no"
					name={`status${product?.title || product?.name}${formIndex}${index}`}
					checked={product?.status === "no"}
				/>
			</button>
		</>
	);
};

export const ProductTable = ({
	products,
	start,
	selection,
	prevData,
	title,
}) => {
	return (
		<div className="">
			<div
				style={{
					borderBottom: "1px solid #F1F5F9",
				}}
				className="flex px-1 justify-between items-center h-8 w-full bg-[#F8FAFC]">
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
				{products?.map((product: any, index: number) => (
					<div
						style={{
							borderBottom: "1px solid #F1F5F9",
						}}
						key={index}
						className={`${
							index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
						} flex justify-between px-1 h-10 py-3 items-center w-full`}>
						<span className=" text-da-blue-600 text-xs truncate w-5/6">
							{product?.title || product?.name}
						</span>
						<div className="flex justify-end gap-3">
							{!start && <PendingComp />}
							{/* {start && selection && (
								<ProductTableRadio
									product={product}
									formIndex={formIndex}
									index={index}
									handleKpi={handleKpi}
								/>
							)} */}
							{start && !selection && (
								<ProductTableShow
									prevData={prevData}
									product={product}
									title={title}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export const ToolsKPIsData = ({
	start,
	data,
	title,
	selection,
	shadow = false,
	prevData,
}: any) => {
	return (
		<WhiteBox className="h-full" shadow={shadow}>
			<div className="flex justify-between items-center">
				<h5 className="text-base text-da-blue-600 font-medium">{title}</h5>
				<img src={Info} alt="" className="" />
			</div>
			<div className="mt-2">
				<ProductTable
					start={start}
					products={data}
					selection={selection}
					prevData={prevData}
					title={title}
				/>
			</div>
		</WhiteBox>
	);
};

export default WhiteBox;
