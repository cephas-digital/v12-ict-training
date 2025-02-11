import type React from "react";
import { useState, useEffect } from "react";
import { isMobile } from "../utils/device";
import { useNavigate } from "react-router";

const MobileAccessWarning: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkDevice = () => {
      setShowWarning(isMobile());
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Desktop or Tablet Required</h2>
        <p className="mb-4">
          For the best experience, please access the dashboard using a desktop
          computer or tablet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MobileAccessWarning;
