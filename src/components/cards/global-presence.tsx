import React from "react";
import serviceimg from "../../assets/images/serviceimg.png";

const GlobalPresence = () => {
  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1500"
      className="py-16 lg:px-5 md:px-5 px-5"
    >
      {/* Heading */}
      <div>
        <p className="font-Outfit text-[#111827] md:text-3xl text-2xl font-bold text-center">
          Global Presence
        </p>
      </div>

      {/* Image Section */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-full  h-[400px] overflow-hidden border border-blue-500">
          {/* Background Image */}
          <img
            src={serviceimg}
            alt="Global Presence"
            className="object-cover w-full h-full"
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <p className="text-white max-w-2xl text-center md:text-2xl font-Outfit font-normal text-lg px-6">
              With offices across major technology hubs worldwide, we deliver
              excellence globally while thinking locally
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPresence;
