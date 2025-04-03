import React, { useRef } from "react";
import Document from "../../assets/icons/document.svg";

const FileInput = () => {
  const ref: any = useRef();
  const handleClick = () => {
    ref.current?.click();
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className="w-full cursor-pointer h-56 bg-[#F7F7F7] rounded-lg flex justify-center items-center"
      >
        <div>
          <img src={Document} alt="" className="mx-auto" />
          <h6 className="text-center text-[#1b1b1b] font-medium text-base">
            {"Select a CSV file to upload"}
          </h6>
          <p className="text-base font-normal text-[#718096] text-center">
            or drag and drop it here
          </p>
          <input
            type="file"
            ref={ref}
            accept={".mp4, .mkv, .pdf, .png, .jpg, .png"}
            id=""
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default FileInput;
