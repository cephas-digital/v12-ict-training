import React from "react";
import { Navbar } from "../../components/v-twelve/navbar";
import { CenteredHero } from "../../components/v-twelve/Hero";
import abouthero from "../../assets/images/abouthero.png";
import { CompanyStory } from "../../components/cards/additional-sections";
import { OurMissionVisionValues } from "../../components/cards/left-sections";
import { OurLeadershipTeam } from "../../components/cards/left-elements";
import {
  AwardsRecognition,
  ExperienceStats,
} from "../../components/cards/centered-sections";
import GlobalPresence from "../../components/cards/global-presence";
import { Button } from "../../components/ui/button";
import { MainFooter } from "../../components/cards/sections";

const AboutPage = () => {
  return (
    <div className="lg:pt-20 md:pt-20 pt-16 overflow-x-hidden">
      <Navbar />
      <section>
        <CenteredHero
          title="Innovating Tomorrow's Technology Today"
          subtitle="Leading the Digital Transformation Since 2005"
          variant="light"
          showButton={false}
          buttonText="Explore Courses"
          buttonLink="/our-courses"
          backgroundImage={abouthero}
          overlayGradient="bg-gradient-to-r from-blue-400 via-[#415685] to-[#3F495B]"
          overlayOpacity={40}
          className="py-24"
          css="max-w-5xl"
        />
      </section>
      <section>
        <CompanyStory />
      </section>
      <section>
        <OurMissionVisionValues iconSize={48} />
      </section>
      {/* Team Section */}
      <section>
        <OurLeadershipTeam className="" />
      </section>
      <section>
        <ExperienceStats className=" bg-[#F9FAFB] " />
      </section>
      <section>
        <GlobalPresence />
      </section>
      <section>
        <AwardsRecognition />
      </section>
      <section data-aos="zoom-in" data-aos-duration="1500">
        <div className="py-16 lg:px-5 md:px-5 px-5">
          <p className=" font-Outfit font-bold text-center mb-4 md:text-4xl text-3xl text-[#1F2937]">
            Ready to Transform Your Digital Future?
          </p>
          <p className=" font-normal text-center font-Inter text-xl text-[#4B5563]">
            Get in touch with our experts today
          </p>
          <div className=" justify-center items-center flex mt-8">
            <Button
              variant="primary"
              size="default"
              href={"/contact"}
              className="mt-2"
            >
              {"Contact Us"}
            </Button>
          </div>
        </div>
      </section>
      <section>
        <MainFooter />
      </section>
    </div>
  );
};

export default AboutPage;
