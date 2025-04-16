import React, { useRef } from "react";
import { IInputProps } from "../../utils/types";
import { Icon } from "@iconify/react";
import { FaAngleDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const Inputs: React.FC<IInputProps> = ({
	name,
	value,
	onChange,
	placeholder,
	type,
	icon,
	label,
	className,
	readOnly,
}) => {
	return (
		<div className="form-group">
			<label
				htmlFor={name}
				className="text-sm font-normal text-da-blue-400 inter">
				{label}
			</label>
			<div className={`${className} mt-2 h-12 w-full relative bg-[#F9FAFB]`}>
				<div className="absolute top-2 left-5">
					<Icon
						icon={icon}
						style={{
							fontSize: "24px",
						}}
						color="#475569"
						className="mt-1"
					/>
				</div>
				<input
					type={type || "text"}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					className="h-full w-full pl-12 rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
					readOnly={readOnly}
				/>
			</div>
		</div>
	);
};

export const SearchInput: React.FC<IInputProps> = ({
	name,
	value,
	onChange,
	placeholder,
	type,
	icon,
	label,
	className,
}) => {
	return (
		<div className="form-group">
			<label
				htmlFor={name}
				className="text-sm font-normal text-da-blue-400 inter">
				{label}
			</label>
			<div
				className={`${className} mt-2 h-10 w-80 rounded-lg relative bg-[#F7F7F7]`}>
				<div className="absolute top-2 left-3">
					<Icon
						icon={icon}
						style={{
							fontSize: "24px",
						}}
						color="#475569"
						className=""
					/>
				</div>
				<input
					type={type || "text"}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					className="h-full w-full bg-transparent rounded-lg pl-12 text-base font-normal text-[#777E90] focus:outline-none focus:border-[#2563EB]"
				/>
			</div>
		</div>
	);
};

type InputProps = {
	type?: string;
	label?: string;
	sublabel?: string;
	options?: any[];
	selectHolder?: string;
	placeholder?: string;
	name?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
	onChange2?: (event: React.ChangeEvent<HTMLSelectElement>) => any;
	onChange3?: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
	onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => any;
	required?: boolean;
	setState?: any;
};

export const NewInput = ({
	label,
	placeholder,
	onChange,
	onKeyUp,
	name,
	value,
	required,
	sublabel,
}: InputProps) => {
	return (
		<div className="form-group">
			{label && (
				<label className="text-[#334155] font-medium text-sm inter">
					{label}
					{required && "*"}
				</label>
			)}
			<input
				style={{
					border: "1px solid #E2E8F0",
				}}
				type="text"
				placeholder={placeholder}
				className="h-11 w-full mt-2 rounded-lg pl-6 text-sm font-normal inter placeholder:text-[#64748B]"
				onChange={onChange}
				onKeyUp={onKeyUp}
				name={name}
				value={value}
			/>
			{sublabel && (
				<small className="text-[#334155] text-xs font-thin inter block">
					{sublabel}
				</small>
			)}
		</div>
	);
};

export const TextBox = ({
	label,
	placeholder,
	onChange3,
	name,
	value,
	type,
	setState,
	sublabel,
	required,
}: InputProps) => {
	return (
		<div>
			{label && (
				<label className="text-[#334155] font-medium text-sm inter">
					{label}
					{required && "*"}
				</label>
			)}
			{type === "editor" ? (
				<ReactQuill
					theme="snow"
					value={value}
					onChange={e => setState(e)}
					placeholder={placeholder}
					className="text-sm w-full font-normal inter placeholder:text-[#64748B] rounded-lg"
				/>
			) : (
				<textarea
					name={name}
					value={value}
					onChange={onChange3}
					placeholder={placeholder}
					className="mt-2 text-sm h-28 w-full font-normal inter placeholder:text-[#64748B] rounded-lg pt-5 pl-6 border"
					id=""
					style={{ height: "10rem", resize: "none" }}
				/>
			)}
			{sublabel && (
				<small className="text-[#334155] text-xs font-thin inter block">
					{sublabel}
				</small>
			)}
		</div>
	);
};

export const ImageBox = ({
	label,
	setState,
	sublabel,
	required,
	logo,
	data,
}: InputProps & {
	logo?: File;
	data?: any;
}) => {
	let fileRef = useRef<HTMLInputElement>(null),
		handleChangeImage = e => {
			const file = e.target.files[0];
			let err = "";

			if (!file) err = `File, ${file?.name} does not exist`;
			if (label === "Logo")
				if (!file.type.includes("image"))
					err = `File, ${file?.name} format not supported`;

			if (err) {
				return toast.error(err);
			} else {
				// setLogo(file);

				setState(file);
			}
		};
	return (
		<div>
			{label && (
				<label className="text-[#334155] font-medium text-sm inter">
					{label}
					{required && "*"}
				</label>
			)}
			<div
				onClick={() => fileRef.current && fileRef.current.click()}
				className="text-center rounded-lg border border-dashed border-gray-400 bg-[#cbd5e052] p-4 space-y-2 cursor-pointer">
				{logo ? (
					<>
						{logo?.type?.includes("image") ? (
							<img
								src={URL.createObjectURL(logo)}
								alt=""
								className="mx-auto mb-2"
							/>
						) : (
							<div>
								<img
									src={data || require("../../assets/images/file-icon2.png")}
									alt=""
									className="mx-auto mb-2"
								/>
								<p className="f-bold">{logo?.name}</p>
							</div>
						)}
					</>
				) : (
					<div>
						<img
							src={data || require("../../assets/images/file-icon2.png")}
							alt=""
							className="mx-auto mb-2"
						/>
						<p className="f-bold">
							Select a {label === "Logo" && `PNG or JPG`} file to upload. File
							size should not be more than 2mb
						</p>
						<p className="c text-gray-500">or drag and drop it here</p>
					</div>
				)}
				<input
					ref={fileRef}
					type="file"
					style={{ width: "0" }}
					className="absolute -z-10"
					onChange={handleChangeImage}
					accept={label === "Logo" ? "image/*" : ""}
				/>
			</div>
			{sublabel && (
				<small className="text-[#334155] text-xs font-thin inter block">
					{sublabel}
				</small>
			)}
		</div>
	);
};

export const ModalSelect = ({ label, handleModal, selected }: any) => {
	return (
		<div>
			<small className="text-[#334155] font-medium text-sm inter capitalize">
				{label ? label?.toLowerCase() : ""}*
			</small>
			<div
				onClick={handleModal}
				style={{
					border: "1px solid #E2E8F0",
				}}
				className="h-10 mt-2 cursor-pointer w-full rounded-lg bg-white px-2 flex items-center justify-between">
				<span className="text-sm font-medium text-[#334155] line-clamp-1">
					{selected || "Select"}
				</span>
				<FaAngleDown />
			</div>
		</div>
	);
};

export const SelectInput = ({
	label,
	onChange2,
	name,
	value,
	options,
}: InputProps) => {
	return (
		<div className="form-group">
			{label && (
				<label className="text-[#334155] font-medium text-sm inter">
					{label}*
				</label>
			)}
			<select
				id=""
				style={{
					border: "1px solid #E2E8F0",
				}}
				onChange={onChange2}
				name={name}
				value={value}
				className="h-11 w-full mt-2 rounded-lg px-4 text-sm font-normal inter text-[#64748B]">
				<option selected value="">
					Select
				</option>
				{options ? (
					<>
						{options?.map((it, i) => (
							<option key={i} value={it?._id}>
								{it?.title}
							</option>
						))}
					</>
				) : (
					<>
						<option value="">Admin</option>
						<option value="">Admin</option>
					</>
				)}
			</select>
		</div>
	);
};

export default Inputs;
