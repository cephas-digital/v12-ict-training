import React from "react";
import { Navbar } from "../../components/v-twelve/navbar";
import { FlexHero } from "../../components/v-twelve/Hero";
import courseimg from "../../assets/images/courseimg.png";
import {
  IndustriesWeServe,
  WhyLearnWithUs,
} from "../../components/cards/centered-sections";
import { EnrollmentForm } from "../../components/cards/enrollment-form";
import { MainFooter } from "../../components/cards/sections";

const EnrollNow = () => {
  return (
    <div className="lg:pt-20 md:pt-20 pt-16 overflow-x-hidden">
      <Navbar />
      <section>
        <FlexHero
          title="Start Your Learning Journey Today"
          subtitle="Join thousands of students already learning with us"
          imageSrc={courseimg}
          imageAlt="Person working on laptop"
          variant="light"
          showButton={false}
          className=" py-16 bg-[#EFF6FF] lg:px-16 md:px-10 px-5"
          css=" lg:w-[500px] mb-2"
        />
      </section>

      <section>
        <EnrollmentForm />
      </section>

      <section>
        <WhyLearnWithUs className=" lg:px-16 md:px-10 px-5" />
      </section>
      <section>
        <IndustriesWeServe className=" lg:px-16 md:px-10 px-5" iconSize={36} />
      </section>
      <section>
        <MainFooter />
      </section>
    </div>
  );
};

export default EnrollNow;
