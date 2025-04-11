import { SmallModalContainer } from "./modalcontainer";
import Done from "../../assets/icons/done.svg";
import Delete from "../../assets/icons/delete.gif";
import { useNavigate } from "react-router-dom";
import { MainBtn } from "../app/buttons";

type DoneModalType = {
	handleClose: () => void;
	page?: string;
	path?: string;
	text?: string;
	loading?: boolean;
	close?: () => void;
};

const DoneModal = ({ handleClose, page, path, close, text }: DoneModalType) => {
	const navigate = useNavigate();
	return (
		<div>
			<SmallModalContainer handleClose={handleClose}>
				<div className="">
					<img src={Done} alt="" className="mx-auto" />
					<h2 className="text-2xl capitalize text-center text-da-gray-400 font-bold">{`New ${page} Created`}</h2>
					<p className="text-base font-normal mt-2 text-da-gray-300">
						Your new {page || `user`} has been added to the list
					</p>
					<button
						onClick={() => (close ? close() : navigate(path || "/users"))}
						className="mt-8 bg-[#3787FF] text-[#F2FBFF] h-12 w-full rounded-lg text-base font-medium">
						{text || `Go back to table`}
					</button>
				</div>
			</SmallModalContainer>
		</div>
	);
};

export const DeleteModal = ({
	handleClose,
	page,
	path,
	close,
	loading,
}: DoneModalType) => {
	return (
		<div>
			<SmallModalContainer handleClose={handleClose}>
				<div className="">
					<img src={Delete} alt="" className="mx-auto h-[200px]" />
					<h2 className="text-2xl capitalize text-center text-da-gray-400 font-bold">{`Delete ${page}?`}</h2>
					<p className="text-base font-normal mt-2 text-da-gray-300 text-center">
						Action done cannot be reversed
					</p>
					<MainBtn
						onClick={() => {
							if (close) close();
							else if (handleClose) handleClose();
						}}
						text={"Continue"}
						loading={loading}
						bg={"#C5292A"}
						color={"white"}
						type="submit"
						className="mt-8 bg-[#C5292A] text-[#F2FBFF] h-12 w-full rounded-lg text-base font-medium"
					/>
				</div>
			</SmallModalContainer>
		</div>
	);
};

export default DoneModal;
