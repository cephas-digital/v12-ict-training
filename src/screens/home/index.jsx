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

const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <DiscoverSection />
      <CtaSection />
      <WshSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "static",
      }}
    >
      <div>
        <section className="w-full relative lg:h-[120vh] h-screen py-20 lg:py-0 hero-section">
          <div className="absolute z-50 left-0 right-0 top-0">
            <Header />
          </div>
          <div className="section-container mt-10 lg:mt-0 relative h-full flex items-center">
            <div data-aos="zoom-in" data-aos-duration="1500">
              <div className="flex gap-4 items-center">
                <h1 className="lg:text-5lg text-4xl text-center lg:text-left text-white lg:leading-[80px] leading-[52px] font-extrabold">
                  Visualize with <br /> Water & Sanitation <br /> Tools Mapping
                  Platform
                </h1>
                {/* <img src={Wave1} alt="" className="" /> */}
              </div>
              <p className="lg:text-xl text-xl text-center lg:text-left lg:mt-4 mt-8 lg:max-w-xl lg:w-full w-5/6 lg:mx-0 mx-auto lg:font-normal font-light text-white inter">
                Water and sanitation tools dashboard for water, sanitation and
                hygiene (WSH) stakeholders
              </p>
              <div className="flex lg:block mt-8 lg:mt-3 justify-center items-center">
                <button
                  style={{
                    border: "1px solid #FFFFFF",
                  }}
                  onClick={() => navigate("/dashboard")}
                  className="mt-10 h-12 w-80 bg-da-blue-100 rounded-xl text-base font-bold text-blue-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <img
            src={Frame1}
            data-aos="zoom-in-down"
            data-aos-duration="1500"
            alt=""
            className="absolute hidden lg:block bottom-36 w-96 right-10 h-96 object-contain"
          />
        </section>
        <div className="w-full about-section lg:pt-10 bg-white">
          <div className="section-container grid lg:grid-cols-2 items-center gap-16">
            <div className="h-full hidden lg:block w-full">
              <img
                src={System}
                data-aos="zoom-out-down"
                data-aos-duration="1500"
                alt=""
                className="ml-24 lg:mt-16  hidden lg:block"
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="lg:ml-16 p-6 pt-6"
            >
              <h3 className="lg:text-4xl text-center lg:text-left text-3xl text-black font-bold">
                What Does It Do?
              </h3>
              <p className="lg:text-xl text-base text-center lg:text-left font-normal text-black max-w-xl mt-6">
                The water and sanitation tools mapping dashboard provides an
                overview of water and sanitation data system tools used for
                decision-making, service delivery, and performance management
                within municipalities and utilities across sub-Saharan Africa
                and Southeast Asia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscoverSection = () => {
  return (
    <section id="about" className="w-full py-20">
      <div className="section-container flex flex-col lg:flex-row gap-6">
        <div
          data-aos="flip-right"
          data-aos-duration="1500"
          style={{
            border: "0.4px solid #000000",
          }}
          className="lg:h-96 lg:w-[55%] rounded-xl bg-white flex flex-col lg:flex-row items-center px-8 gap-8"
        >
          <div className="p-6 lg:p-0">
            <h2 className="text-2xl text-center lg:text-left capitalize font-medium text-black">
              <span className="font-bold text-da-blue-200">Discover</span>
              <br />
              <span className="whitespace-nowrap">
                Water sanitation & tools
              </span>
            </h2>
            <p className="mt-4 lg:text-lg text-base text-center lg:text-left font-normal inter max-w-xs text-black">
              Explore regulatory and utility / municipality data system tools
              and learn how they can improve your work.
            </p>
          </div>
          <div>
            <img src={Mouse} alt="" className="mx-auto" />
            <img
              style={{
                boxShadow: "0px 4px 4px 0px #00000029",
              }}
              src={Chart1}
              alt=""
              className="h-64 mt-5"
            />
          </div>
        </div>
        <div
          data-aos="flip-left"
          data-aos-duration="1500"
          className="lg:w-[45%] h-96 flex flex-col gap-4"
        >
          <div
            style={{
              border: "0.4px solid #000000",
            }}
            data-aos="flip-left"
            data-aos-duration="1500"
            className="w-full h-full rounded-xl flex justify-between items-center lg:px-6 p-4 lg:p-0"
          >
            <div>
              <h4 className="lg:text-2xl text-base font-medium text-black">
                Export Visualization
              </h4>
              <p className="lg:text-lg text-xs inter mt-2 text-black max-w-72">
                Export your visualization for further review and reporting.
              </p>
            </div>
            <img src={Export} alt="" className="" />
          </div>
          <div
            style={{
              border: "0.4px solid #000000",
            }}
            data-aos="flip-up"
            data-aos-duration="1500"
            className="w-full h-full rounded-xl flex justify-between items-center lg:px-6 p-4 lg:p-0"
          >
            <div>
              <h4 className="lg:text-2xl text-base font-medium text-black">
                Compare Tools
              </h4>
              <p className="lg:text-lg text-sm inter mt-2 text-black max-w-72">
                Easily compare various tools to identify the best options for
                your needs.
              </p>
            </div>
            <img src={Compare} alt="" className="" />
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section id="resources" className="w-full lg:py-20 py-">
      <div className="section-container">
        <h3
          data-aos="fade-up"
          data-aos-duration="1500"
          className="lg:text-4xl text-3xl text-center lg:text-left text-black font-bold"
        >
          What can you map?
        </h3>
        <p
          data-aos="fade-down"
          data-aos-duration="1500"
          className="lg:text-xl text-base text-center lg:text-left font-normal text-black mt-5"
        >
          Based on four critical success factors, visualize various utilities
          and municipalities tools across sub-Saharan Africa and Southeast Asia.
          Each critical success factor indicates the expected outcomes that a
          utility needs to achieve for the smooth running and sustainability of
          sanitation service operations.
        </p>
      </div>

      <div className="mt-8 mySwiper hidden lg:block hero-section py-16">
        <Swiper
          className=""
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            // bulletActiveClass: "size-12 rounded-full bg-white",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
        >
          <SwiperSlide className="mb-16">
            <div className="section-container grid grid-cols-2 items-center gap-3">
              <div>
                <h4 className="text-4xl text-white font-bold">
                  Technical
                  <br /> (operations and maintenance)
                </h4>
                <p className="text-lg font-normal mt-6 max-w-sm inter text-white">
                  Explore whether sanitation data tools cover three core
                  operations and maintenance components: Infrastructure
                  stability, operational optimization, and resilience.
                </p>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-[70%]">
                  {" "}
                  <img src={Tech1} alt="" className="h-96 w-full" />
                  <img src={Tech2} alt="" className="h-72 float-right mt-4" />
                </div>
                <img src={Tech3} alt="" className="w-[30%]" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="mb-16">
            <div className="section-container grid grid-cols-2 items-center gap-10">
              <div>
                <h4 className="text-4xl text-white font-bold">
                  Commercial
                  <br /> (consumer/payor demands)
                </h4>
                <p className="text-lg font-normal mt-6 max-w-sm inter text-white">
                  Assess whether sanitation data tools cover customer
                  satisfaction, service delivery, and complaint management.
                </p>
              </div>
              <div className="">
                <div className="flex justify-between">
                  <img src={CheckBoxRight} alt="" className="h-16" />
                  <img src={CheckBoxWrong} alt="" className="h-16" />
                </div>
                <img
                  src={Commercial}
                  alt=""
                  className="
                "
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="mb-16">
            <div className="section-container grid grid-cols-2 items-center gap-10">
              <div>
                <h4 className="text-4xl text-white font-bold">
                  Financial
                  <br /> (productivity and efficiency)
                </h4>
                <p className="text-lg font-normal mt-6 max-w-sm inter text-white">
                  Evaluate whether sanitation data tools cover financial
                  viability through budget management and financial procedure
                  efficiency.
                </p>
              </div>
              <div className="">
                <div className="flex justify-between">
                  <img src={CheckBoxRight} alt="" className="h-16" />
                  <img src={CheckBoxWrong} alt="" className="h-16" />
                </div>
                <img
                  src={Financial}
                  alt=""
                  className="
                "
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="mb-16">
            <div className="section-container grid grid-cols-2 items-center gap-10">
              <div>
                <h4 className="text-4xl text-white font-bold">
                  Institutional strengthening
                  <br /> (capacity building)
                </h4>
                <p className="text-lg font-normal mt-6 max-w-sm inter text-white">
                  Assess whether sanitation data tools cover capacity building
                  through employee leadership, development, and institutional
                  capacity building.
                </p>
              </div>
              <div className="">
                <img
                  src={Institution}
                  alt=""
                  className="
                "
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

const WshSection = () => {
  return (
    <section className="py-16">
      <div className="section-container flex flex-col lg:flex-row items-center gap-12">
        <div
          data-aos="fade-down"
          data-aos-duration="1500"
          className="lg:w-[40%]"
        >
          <h2 className="lg:text-4xl text-center lg:text-left text-2xl font-bold text-black">
            WSH Webinar Series
          </h2>
          <p className="mt-5 lg:text-xl text-base text-center lg:text-left font-normal text-black">
            The WSH webinar series is part of the Bill & Melinda Gates
            Foundation-funded project “Public Service Data Systems: Landscaping,
            Learning, and Technical Assistance.”{" "}
          </p>
          <p className="mt-5 lg:text-xl text-center lg:text-left text-base font-normal text-black">
            Dev-Afrique Development Advisors is hosting this series to spotlight
            sanitation data system tools in the WSH sector across Sub-Saharan
            Africa and South Asia. The webinars aim to facilitate learning and
            share best practices for improving service delivery and performance
            management within utilities and municipalities.
          </p>
          <div className="flex lg:block justify-center items-center">
            <button
              style={{
                border: "1px solid #FFFFFF",
              }}
              className="mt-10 h-12 w-80 bg-da-blue-100 rounded-xl text-base font-bold text-blue-200"
            >
              Join the Webinar Series
            </button>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-duration="1500" className="lg:w-[60%]">
          <img src={Webinar} alt="" className="" />
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  const [active, setActive] = useState(null);
  const Arr = [
    {
      question: "How do I compare tools?",
      answer:
        "Use the comparison feature on the dashboard to evaluate various tools based on theirperformance in key areas.",
    },
    {
      question: "Can I export the analysis?",
      answer:
        "Use the comparison feature on the dashboard to evaluate various tools based on theirperformance in key areas.",
    },
    {
      question: "Where can I find more resources?",
      answer:
        "Use the comparison feature on the dashboard to evaluate various tools based on theirperformance in key areas.",
    },
    {
      question:
        "Who is responsible for identifying new stakeholders to keep the platform updated?",
      answer:
        "Use the comparison feature on the dashboard to evaluate various tools based on theirperformance in key areas.",
    },
  ];
  const toggleActive = (i) => {
    if (active === i) {
      setActive(null);
    } else {
      setActive(i);
    }
  };
  return (
    <section id="faq" className="py-20">
      <div className="section-container">
        <h2
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="lg:text-4xl text-xl font-semibold inter text-center text-da-blue-500"
        >
          Frequently asked questions
        </h2>
        <p
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="mt-4 text-center lg:text-xl text-sm font-medium text-[#667085] inter"
        >
          Everything you need to know about the sanitation mapping platform.
        </p>
        <div className="mt-6 space-y-6">
          {Arr?.map((it, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #EAEAEA",
              }}
              className="rounded-lg p-6"
            >
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                onClick={() => toggleActive(i)}
                className="flex justify-between cursor-pointer items-center"
              >
                <h5 className="lg:text-xl text-base font-medium inter text-da-blue-500">
                  Q: {it?.question}
                </h5>
                {active === i ? (
                  <CiCircleMinus
                    className="cursor-pointer"
                    color="#002A54"
                    onClick={() => toggleActive(i)}
                    size={20}
                  />
                ) : (
                  <CiCirclePlus
                    className="cursor-pointer"
                    color="#002A54"
                    onClick={() => toggleActive(i)}
                    size={20}
                  />
                )}
              </div>
              {active === i && (
                <p className="text-[#667085] mt-4 font-medium inter lg:text-xl text-sm">
                  Answer: {it?.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
