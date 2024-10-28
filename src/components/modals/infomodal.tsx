import { Icon } from "@iconify/react";
import React from "react";

const InfoModal = ({ handleClose, title, description }: any) => {
	return (
		<div>
			<div
				onClick={e => e.target === e.currentTarget && handleClose()}
				className="fixed inset-0 z-[1000] w-full flex justify-center items-center min-h-screen bg-da-blue-500 bg-opacity-20">
				<div
					className={`w-full max-w-xl bg-white rounded-xl shadow-xl transition-all ease-in-out duration-700 min-h-3/4 overflow-y-scroll noscroll p-7 transform translate-y-[-100%] opacity-0 animate-slideIn`}>
					<div className="flex justify-between items-center">
						<h4 className="text-xl font-bold text-da-blue-600 capitalize">
							{title?.toLowerCase()}
						</h4>
						<Icon
							icon={"ic:baseline-close"}
							onClick={handleClose}
							className="cursor-pointer"
							color="#757575"
							style={{
								fontSize: "32px",
							}}
						/>
					</div>
					<p className="mt-5 text-sm font-normal">
						{description ||
							`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
