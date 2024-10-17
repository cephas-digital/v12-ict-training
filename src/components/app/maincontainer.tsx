import React from "react";

const MainContainer = ({ children }) => {
	return (
		<div>
			<div className="min-h-screen p-8 bg-[#F8FAFC]">{children}</div>
		</div>
	);
};

export default MainContainer;
