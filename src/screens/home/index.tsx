import React, { useState } from "react";
import Header from "../../components/partials/header";
import Frame1 from "../../assets/images/frame1.png";
import System from "../../assets/images/system.png";
import Chart1 from "../../assets/images/chart1.png";
import Mouse from "../../assets/icons/mouse.svg";
import Export from "../../assets/icons/export.svg";
import Compare from "../../assets/icons/compare.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Tech1 from "../../assets/images/tech1.png";
import Tech2 from "../../assets/images/tech2.png";
import Tech3 from "../../assets/images/tech3.png";
import "swiper/css";
import "swiper/css/pagination";
import CheckBoxRight from "../../assets/icons/checkbox-control.svg";
import CheckBoxWrong from "../../assets/icons/wrong.svg";
import Commercial from "../../assets/images/commercial.png";
import Financial from "../../assets/images/financial.png";
import Institution from "../../assets/images/institution.png";
import Webinar from "../../assets/images/webinar.png";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Footer from "../../components/partials/footer";
import { useNavigate } from "react-router-dom";
import { CenteredHero } from "../../components/v-twelve/Hero";
import homehero from "../../assets/images/homehero.png";
import { Navbar } from "../../components/v-twelve/navbar";
import { PopularCourses } from "../../components/cards/left-elements";
import {
  OurExpertTeam,
  WhyChooseTimeline,
} from "../../components/cards/centered-sections";

import {
  AboutBanner,
  ContactBanner,
  CoursesBanner,
  GetInTouch,
  MainFooter,
  OurCourses,
  StudentTestimonials,
} from "../../components/cards/sections";
import { MissionVisionSection } from "../../components/cards/left-sections";
import { CoursesGrid } from "../../components/cards/courses-grid";
import {
  CourseBrochure,
  LocationMap,
} from "../../components/cards/additional-sections";

const Home = () => {
  return (
    <div className="bg-white lg:pt-20 overflow-x-hidden">
      <Navbar />
      <CenteredHero
        title="Empower Your Future with Professional ICT Training"
        subtitle="Industry-relevant courses designed to launch your tech career"
        variant="light"
        showButton={true}
        buttonText="Explore Courses"
        buttonLink="/our-courses"
        backgroundImage={homehero}
        overlayColor="#2563EB"
        overlayOpacity={15}
        className=" h-screen"
        css="max-w-4xl"
      />
      {/* <DiscoverSection /> */}
      <div className="bg-[#F9FAFB] py-10">
        <PopularCourses className=" lg:px-16 md:px-10 px-5" />
      </div>

      {/* Why Choose Timeline */}
      <div>
        <WhyChooseTimeline iconSize={44} />
      </div>

      <div className="bg-[#F9FAFB] lg:px-16 md:px-10 px-5">
        <StudentTestimonials />
      </div>
      <div>
        <AboutBanner />
        <div>
          <MissionVisionSection />
        </div>
      </div>
      {/* <div className=" bg-[#F9FAFB] lg:px-16 md:px-10 px-5">
        <OurExpertTeam />
      </div> */}
      <div>
        <CoursesBanner />
        <div>
          <OurCourses />
        </div>
      </div>
      {/* <div>
        <CourseBrochure />
      </div> */}
      <div>
        <ContactBanner />
        <div className=" lg:px-16 md:px-10 px-5">
          <GetInTouch />
        </div>
      </div>
      <div>
        <LocationMap />
      </div>
      {/* Footer */}
      <div>
        <MainFooter />
      </div>
    </div>
  );
};
export default Home;
