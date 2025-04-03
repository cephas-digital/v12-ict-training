import React from "react";

const ModalBackground = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-da-blue-600 bg-opacity-40">{children}</div>
  );
};

export const ModalContainer = ({ handleClose, children }) => {
	return (
		<div>
			<div>
				<div
					onClick={e => e.target === e.currentTarget && handleClose()}
					className="fixed inset-0 z-[1000] w-full flex justify-center items-center min-h-screen bg-da-blue-500 bg-opacity-10">
					<div
						className={`w-full max-w-xl bg-white rounded-xl shadow-xl transition-all ease-in-out duration-700 min-h-3/4 overflow-y-scroll noscroll p-7 transform translate-y-[-100%] opacity-0 animate-slideIn`}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export const SmallModalContainer = ({ handleClose, children }) => {
	return (
		<div>
			<div>
				<div
					onClick={e => e.target === e.currentTarget && handleClose()}
					className="fixed inset-0 z-[1000] w-full flex justify-center items-center min-h-screen bg-da-blue-500 bg-opacity-10">
					<div
						className={`w-full max-w-sm bg-white rounded-xl shadow-xl transition-all ease-in-out duration-700 min-h-3/4 overflow-y-scroll noscroll p-7 transform translate-y-[-100%] opacity-0 animate-slideIn`}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};


export default ModalBackground;
