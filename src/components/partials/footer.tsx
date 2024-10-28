import React from "react";
import Logo from "../layouts/logo";
import Youtube from "../../assets/icons/youtube.svg";
import Linkedln from "../../assets/icons/linkedlin.png";
// import Twitter from "../../assets/icons/twitter.svg";
import MainLogo from "../../assets/icons/logo.svg";
import Esawas from "../../assets/icons/ESAWAS LOGO PNG-11 2.svg";
// import HandShake from "../../assets/icons/handshake.svg";

const Footer = () => {
  const support = ["FAQs", "Get Involved"];
  const resources = ["WSH Webinar Series", "Resources"];
  const legal = ["Terms of Services", "Privacy Policy / GDPR"];
  return (
    <div id="help" className="lg:pt-20 pt-10 hero-section pb-10">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <Logo />
            <p
              className="lg:text-base text-sm mt-6
             font-normal inter text-[#ddddde]"
            >
              Developed by Dev-Afrique in collaboration with ESAWAS
            </p>
            <div className="mt-6 flex gap-3 items-center">
              <img src={MainLogo} alt="" className="lg:h-full h-8" />
              <span className="text-xl font-normal text-white">||</span>
              <img src={Esawas} alt="" className="lg:h-full h-8" />
            </div>
            <div className="flex mt-6 gap-5">
              <img src={Youtube} alt="" className="" />
              <img src={Linkedln} alt="" className="" />
              {/* <img src={Twitter} alt="" className="" /> */}
            </div>
          </div>
          <div className="">
            <h5 className="lg:text-xl text-sm inter text-white font-bold">
              Support
            </h5>
            <div className="mt-6 lg:space-y-5 space-y-3">
              {support?.map((it) => (
                <h6 className="text-[#DDDDDE] lg:text-base text-sm font-normal inter">
                  {it}
                </h6>
              ))}
            </div>
          </div>
          <div className="">
            <h5 className="lg:text-xl text-sm inter text-white font-bold">
              Resources
            </h5>
            <div className="mt-6 lg:space-y-5 space-y-3">
              {resources?.map((it) => (
                <h6 className="text-[#DDDDDE] lg:text-base text-sm font-normal inter">
                  {it}
                </h6>
              ))}
            </div>
          </div>
          <div className="">
            <h5 className="lg:text-xl text-sm inter text-white font-bold">
              Legal
            </h5>
            <div className="mt-6 lg:space-y-5 space-y-3">
              {legal?.map((it) => (
                <h6 className="text-[#DDDDDE] lg:text-base text-sm font-normal inter">
                  {it}
                </h6>
              ))}
            </div>
          </div>
        </div>
        <h6 className="text-sm font-normal inter text-[#DDDDDE] text-center mt-20">
          ©Devafrique 2024. All rights reserved
        </h6>
      </div>
    </div>
  );
};

export default Footer;
