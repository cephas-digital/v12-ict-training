import React from "react";
import { Navbar } from "../../components/v-twelve/navbar";
import { CenteredHero } from "../../components/v-twelve/Hero";
import {
  BusinessHoursSection,
  GeneralInquiries,
  WaysToConnect,
} from "../../components/cards/left-sections";
import {
  GetInTouch,
  GetInTouchWithMap,
  MainFooter,
} from "../../components/cards/sections";
import { CommonQuestions } from "../../components/cards/additional-sections";

const ContactUs = () => {
  return (
    <div className="lg:pt-20 md:pt-20 pt-16 overflow-x-hidden">
      <Navbar />
      <section>
        <CenteredHero
          title="Get in Touch"
          subtitle="We're here to help and answer any questions you might have"
          variant="light"
          showButton={false}
          buttonText=""
          buttonLink="/contact-us"
          className=" py-24 bg-[#eef3fa]"
          css="max-w-5xl"
        />
      </section>
      <section>
        <GeneralInquiries iconSize={36} className="lg:px-16 md:px-10 px-5" />
      </section>

      {/* Get in Touch with Map */}
      <section className=" px-5">
        <GetInTouchWithMap />
      </section>
      <section data-aos="fade-left" data-aos-duration="1500" className="">
        <WaysToConnect className=" px-5" />
      </section>

      <section>
        <BusinessHoursSection
          data-aos="fade-right"
          data-aos-duration="1500"
          className=" lg:px-20 md:px-10 px-5"
        />
      </section>

      {/* FAQ Section */}
      <section>
        <CommonQuestions />
      </section>
      <section>
        <MainFooter />
      </section>
    </div>
  );
};

export default ContactUs;
