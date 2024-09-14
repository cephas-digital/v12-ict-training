import React from "react";

const ModalBackground = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-da-blue-600 bg-opacity-40">{children}</div>
  );
};

export default ModalBackground;
