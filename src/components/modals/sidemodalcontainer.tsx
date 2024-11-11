import React, { useEffect, useState } from "react";
import ModalBackground from "./modalcontainer";

const SideModalcontainer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate the modal opening (set true on mount)
    setIsOpen(true);
  }, []);
  return (
    <div>
      <div>
        <ModalBackground>
          <div className={`flex min-h-screen justify-end`}>
            <div
              className={`bg-white w-96 h-screen transform transition-transform duration-500 ease-in-out overflow-y-scroll noscroll ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {children}
            </div>
          </div>
        </ModalBackground>
      </div>
    </div>
  );
};

export default SideModalcontainer;
