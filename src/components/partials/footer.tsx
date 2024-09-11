import React from "react";
import Logo from "../layouts/logo";
import Youtube from "../../assets/icons/youtube.svg";
import Linkedln from "../../assets/icons/linkedlin.png";
import Twitter from "../../assets/icons/twitter.svg";

const Footer = () => {
  const support = ["FAQs", "Expert Support"];
  const resources = ["WSH Webinar Series", "Learning Materials"];
  const legal = ["Terms of Services", "Privacy Policy / GDPR"];
  return (
    <div className="pt-20 hero-section pb-10">
      <div className="section-container">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <Logo />
            <p
              className="text-base mt-6
             font-normal inter text-[#ddddde]"
            >
              Efficiently map and analyze stakeholders in minutes.
            </p>
            <div className="flex mt-6 gap-5">
              <img src={Youtube} alt="" className="" />
              <img src={Linkedln} alt="" className="" />
              <img src={Twitter} alt="" className="" />
            </div>
          </div>
          <div className="">
            <h5 className="text-xl inter text-white font-bold">Support</h5>
            <div className="mt-6 space-y-5">
              {support?.map((it) => (
                <h6 className="text-[#DDDDDE] text-base font-normal inter">
                  {it}
                </h6>
              ))}
            </div>
          </div>
          <div className="">
            <h5 className="text-xl inter text-white font-bold">Resources</h5>
            <div className="mt-6 space-y-5">
              {resources?.map((it) => (
                <h6 className="text-[#DDDDDE] text-base font-normal inter">
                  {it}
                </h6>
              ))}
            </div>
          </div>
          <div className="">
            <h5 className="text-xl inter text-white font-bold">Lega</h5>
            <div className="mt-6 space-y-5">
              {legal?.map((it) => (
                <h6 className="text-[#DDDDDE] text-base font-normal inter">
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
