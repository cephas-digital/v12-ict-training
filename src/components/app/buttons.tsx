import { ClipLoader } from "react-spinners";

interface ButtonType {
	text: string;
	icon?: any;
	onClick?:
		| ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any)
		| (() => any)
		| undefined;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	color?: string;
	bg?: string;
	type?: "submit" | "button" | "reset" | undefined;
}

const PrimaryBtn = ({
	icon,
	text,
	onClick,
	bg,
	color,
	className = "",
	disabled = false,
	loading,
}: ButtonType) => {
	return (
		<div>
			<div>
				<button
					onClick={onClick}
					disabled={disabled || loading}
					style={{
						backgroundColor: bg,
						color: color,
					}}
					className={`flex items-center gap-3 justify-center px-5 h-10 rounded-lg ${className} ${
						(disabled || loading) && "cursor-not-allowed bg-opacity-40"
					}`}>
					<img src={icon} alt="" className="" />
					<span className="text-sm font-normal inter">{text}</span>
					{loading && <ClipLoader color={"white"} size={16} />}
				</button>
			</div>
		</div>
	);
};

export const MainBtn = ({
	text,
	onClick,
	disabled = false,
	bg,
	color,
	className = "",
	loading,
	type = "submit",
}: ButtonType) => {
	return (
		<div>
			<button
				disabled={disabled || loading}
				onClick={onClick}
				style={{
					backgroundColor: bg,
					color: color,
				}}
				type={type || "button"}
				className={`${className} h-12 disabled:opacity-40 w-32 rounded-lg text-base font-medium ${
					(disabled || loading) && "cursor-not-allowed bg-opacity-40"
				}`}>
				{text}
				{loading && <ClipLoader color={"white"} size={16} />}
			</button>
		</div>
	);
};

type loadMoreType = {
	next?: boolean;
	loading?: boolean;
	handleLoadMore?: () => any | undefined;
};

export const LoadMore = ({ handleLoadMore, next, loading }: loadMoreType) => {
	return (
		<>
			{!next ? (
				""
			) : (
				<MainBtn
					onClick={handleLoadMore}
					text={loading ? "Loading..." : "Load More"}
					loading={loading}
					type={"button"}
				/>
			)}
		</>
	);
};
export default PrimaryBtn;
