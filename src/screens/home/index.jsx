import React from "react";
import Header from "../../components/partials/header";
import Wave1 from "../../assets/images/water-animation1.png";
import Frame1 from "../../assets/images/frame1.png";
import Frame2 from "../../assets/images/frame2.png";

const Home = () => {
  return (
    <section className="w-full relative h-[120vh] hero-section">
      <div className="absolute z-50 left-0 right-0 top-0">
        <Header />
      </div>
      <div className="section-container relative h-full flex items-center">
        <div>
          <div className="flex gap-4 items-center">
            <h1 className="text-5lg text-white font-bold">Visiting with</h1>
            <img src={Wave1} alt="" className="" />
          </div>
          <h1 className="text-5lg leading-[80px] text-white font-bold">
            Water & Sanitation <br /> Tools Mapping Platform
          </h1>
          <p className="text-xl mt-4 font-normal text-white inter">
            Water and sanitation tools dashboard for water, sanitation and
            hygiene (WSH) stakeholders
          </p>
          <button
            style={{
              border: "1px solid #FFFFFF",
            }}
            className="mt-10 h-12 w-80 bg-da-blue-100 rounded-xl text-base font-bold text-blue-200"
          >
            Get Started
          </button>
        </div>
        <img src={Frame1} alt="" className="absolute right-0 top-40" />
      </div>
      <img src={Frame2} alt="" className="absolute right-0 bottom-0 h-60" />
    </section>
  );
};

export default Home;
