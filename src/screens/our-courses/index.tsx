import React from "react";
import { Navbar } from "../../components/v-twelve/navbar";
import { FlexHero } from "../../components/v-twelve/Hero";
import courseimg from "../../assets/images/courseimg.png";
import { OurServices } from "../../components/cards/left-sections";
import {
  IndustriesWeServe,
  WhyChooseUs,
} from "../../components/cards/centered-sections";
import { SuccessStories } from "../../components/cards/left-elements";
import { BusinessCTA } from "../../components/cards/additional-sections";
import { MainFooter } from "../../components/cards/sections";

const OurCourses = () => {
  return (
    <div className="lg:pt-20 md:pt-20 pt-16 overflow-x-hidden">
      <Navbar />
      <section>
        <FlexHero
          title="Comprehensive ICT Tailored Training for Your Growth"
          subtitle="Empowering businesses with cutting-edge technology solutions"
          imageSrc={courseimg}
          imageAlt="Person working on laptop"
          variant="light"
          showButton={false}
          className=" py-16 bg-[#EFF6FF] lg:px-16 md:px-10 px-5"
          css="max-w-5xl"
        />
      </section>

      {/* Our Services */}
      <section>
        <OurServices className=" lg:px-24 md:px-10 px-5 " iconSize={48} />
      </section>

      {/* Why Choose Us */}
      <section>
        <WhyChooseUs
          className=" lg:px-16 md:px-10 px-5 bg-[#F8FAFC]"
          iconSize={48}
        />
      </section>

      {/* Success Stories Section */}
      <section>
        <SuccessStories />
      </section>

      {/* Industries We Serve Section */}
      <section>
        <IndustriesWeServe className=" lg:px-16 md:px-10 px-5" iconSize={36} />
      </section>

      <section>
        <BusinessCTA />
      </section>
      <section>
        <MainFooter />
      </section>
    </div>
  );
};

export default OurCourses;
