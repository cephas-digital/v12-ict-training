import type React from "react";
import {
  FaBriefcase,
  FaCloud,
  FaCode,
  FaEnvelope,
  FaFacebook,
  FaHandshake,
  FaHeadset,
  FaLinkedin,
  FaNetworkWired,
  FaPhone,
  FaRocket,
  FaShieldAlt,
  FaTwitter,
  FaUserTie,
} from "react-icons/fa";
import {
  FiFileText,
  FiHeart,
  FiMail,
  FiHeadphones,
  FiBriefcase,
  FiPhone,
  FiCloud,
  FiShield,
  FiServer,
  FiCode,
  FiRefreshCw,
  FiUsers,
  FiChevronRight,
  FiClock,
  FiHelpCircle,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { TbBulbFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

// ======= MISSION VISION VALUES COMPONENT =======

interface MissionItem {
  id: string | number;
  title: string;
  description: string;
  icon?: string;
  iconComponent?: React.ReactNode;
}

interface MissionVisionValuesProps {
  items: MissionItem[];
  className?: string;
  iconSize?: number;
  withBackground?: boolean;
}

const getMissionIconComponent = (icon: string, size = 40) => {
  const iconProps = { size, className: "text-blue-500" };

  switch (icon) {
    case "mission":
      return <HiOutlineChartBar {...iconProps} />;
    case "vision":
      return <TbBulbFilled {...iconProps} />;
    case "values":
      return <FiHeart {...iconProps} />;
    default:
      return <FiFileText {...iconProps} />;
  }
};

export const MissionVisionValues = ({
  items,
  className = "",
  iconSize = 40,
  withBackground = false,
}: MissionVisionValuesProps) => {
  return (
    <section
      className={`py-12 bg-[#F9FAFB] ${
        withBackground ? "bg-gray-50" : ""
      } ${className}`}
    >
      <div
        data-aos="flip-up"
        data-aos-duration="1500"
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-[#fff] shadow-md rounded-lg p-5"
            >
              <div className="text-blue-500 mb-4">
                {item.iconComponent ||
                  getMissionIconComponent(item.icon || "", iconSize)}
              </div>
              <h3 className="text-xl font-bold mb-3 font-Outfit">
                {item.title}
              </h3>
              <p className="text-[#4B5563] font-Inter font-normal text-[15px]/6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ======= CONTACT CARDS COMPONENT =======

interface ContactItem {
  id: string | number;
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
}

interface ContactCardsProps {
  items: ContactItem[];
  className?: string;
  iconSize?: number;
  withBackground?: boolean;
  withShadow?: boolean;
}

const getContactIconComponent = (icon: string, size = 40) => {
  const iconProps = { size, className: "text-blue-500" };

  switch (icon) {
    case "general":
      return <FaEnvelope {...iconProps} />;
    case "support":
      return <FaHeadset {...iconProps} />;
    case "business":
      return <FaHandshake {...iconProps} />;
    case "sales":
      return <FaBriefcase {...iconProps} />;
    case "partnership":
      return <FaHandshake {...iconProps} />;
    default:
      return <FaEnvelope {...iconProps} />;
  }
};

export const ContactCards = ({
  items,
  className = "",
  iconSize = 40,
  withBackground = true,
  withShadow = false,
}: ContactCardsProps) => {
  return (
    <section
      className={`py-12 bg-[#F9FAFB] ${withBackground ? "" : ""} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-[#fff] p-6 rounded-lg ${
                withShadow ? "shadow-md" : ""
              }`}
            >
              <div className="text-blue-500 mb-4">
                {item.iconComponent ||
                  getContactIconComponent(item.icon || "", iconSize)}
              </div>
              <h3 className="text-xl font-Outfit text-[#000] font-bold mb-3">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-[#4B5563] font-Inter font-normal text-base mb-4">
                  {item.description}
                </p>
              )}
              {item.email && (
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <Link
                    to={`mailto:${item.email}`}
                    className="text-[#4B5563] font-Inter font-normal text-base hover:text-blue-500"
                  >
                    {item.email}
                  </Link>
                </div>
              )}
              {item.phone && (
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-2" />
                  <Link
                    to={`tel:${item.phone}`}
                    className="text-[#4B5563] font-Inter font-normal text-base hover:text-blue-500"
                  >
                    {item.phone}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ======= SERVICES GRID COMPONENT =======

interface ServiceItem {
  id: string | number;
  title: string;
  description: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  features?: string[];
}

interface ServicesGridProps {
  sectionTitle: string;
  items: ServiceItem[];
  className?: string;
  iconSize?: number;
  withBackground?: boolean;
  columns?: 2 | 3;
}

const getServiceIconComponent = (icon: string, size = 40) => {
  const iconProps = { size, className: "text-blue-500" };

  switch (icon) {
    case "cloud":
      return <FaCloud {...iconProps} />;
    case "security":
      return <FaShieldAlt {...iconProps} />;
    case "infrastructure":
      return <FaNetworkWired {...iconProps} />;
    case "software":
      return <FaCode {...iconProps} />;
    case "digital":
      return <FaRocket {...iconProps} />;
    case "consulting":
      return <FaUserTie {...iconProps} />;
    default:
      return <FiCloud {...iconProps} />;
  }
};

export const ServicesGrid = ({
  sectionTitle,
  items,
  className = "",
  iconSize = 40,
  withBackground = false,
  columns = 3,
}: ServicesGridProps) => {
  const gridColsClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2 gap-14"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20";

  return (
    <section
      data-aos="zoom-in"
      data-aos-duration="1500"
      className={`py-12 ${withBackground ? "bg-gray-50" : ""} ${className}`}
    >
      <div className="container  mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {sectionTitle}
        </h2>
        <div className={`grid ${gridColsClass} gap-8`}>
          {items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="text-blue-500 mb-4">
                {item.iconComponent ||
                  getServiceIconComponent(item.icon || "", iconSize)}
              </div>
              <h3 className=" text-[#1E293B] font-bold font-Outfit text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-[#64748B] font-Inter text-[15px] font-normal mb-4">
                {item.description}
              </p>
              {item.features && item.features.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiChevronRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-[#64748B] font-Inter font-normal text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ======= BUSINESS HOURS COMPONENT =======

interface BusinessHoursProps {
  hours: {
    weekdays: string;
    weekend: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  helpSection?: {
    title: string;
    description: string;
    linkText: string;
    linkUrl: string;
  };
  className?: string;
  iconSize?: number;
  withBackground?: boolean;
}

export const BusinessHours = ({
  hours,
  socialLinks,
  helpSection,
  className = "",
  iconSize = 24,
  withBackground = true,
}: BusinessHoursProps) => {
  return (
    <section
      className={`py-8 ${withBackground ? "bg-[#F5F7FA]" : ""} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Hours */}
          <div className="">
            <div className=" flex items-center mb-2">
              <div className="text-blue-500 mr-3">
                <FiClock size={iconSize} />
              </div>
              <h3 className=" font-bold text-xl text-[#000] font-Outfit ">
                Business Hours
              </h3>
            </div>

            <div>
              <p className="text-[#4B5563] font-Inter text-base font-normal mb-1">
                {hours.weekdays}
              </p>
              <p className="text-[#4B5563] font-Inter text-base font-normal">
                {hours.weekend}
              </p>
            </div>
          </div>

          {/* Connect With Us */}
          {socialLinks && (
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-Outfit font-bold mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.linkedin && (
                  <Link
                    to={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaLinkedin size={iconSize} />
                  </Link>
                )}
                {socialLinks.twitter && (
                  <Link
                    to={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaTwitter size={iconSize} />
                  </Link>
                )}
                {socialLinks.facebook && (
                  <Link
                    to={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaFacebook size={iconSize} />
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Need Help */}
          {helpSection && (
            <div className="">
              <div className="flex items-center mb-2">
                <div className="text-blue-500 mr-3">
                  <FiHelpCircle size={iconSize} />
                </div>
                <h3 className="text-xl font-Outfit font-bold">
                  {helpSection.title}
                </h3>
              </div>

              <div>
                <p className="text-[#4B5563] font-Inter text-base font-normal mb-2">
                  {helpSection.description}
                </p>
                <Link
                  to={helpSection.linkUrl}
                  className="text-[#4488F7] font-Outfit text-base font-normal hover:text-blue-600"
                >
                  {helpSection.linkText}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ======= MISSION VISION SIMPLE COMPONENT =======

interface MissionVisionSimpleProps {
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  className?: string;
  withBackground?: boolean;
}

export const MissionVisionAbout = ({
  mission,
  vision,
  className = "",
  withBackground = false,
}: MissionVisionSimpleProps) => {
  return (
    <section
      className={`py-12 lg:px-16 md:px-10 px-5 ${
        withBackground ? "bg-gray-50" : ""
      } ${className}`}
    >
      <div
        data-aos="fade-left"
        data-aos-duration="1500"
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold font-Outfit mb-4">
              {mission.title}
            </h2>
            <p className="text-[#4B5563] font-Inter font-normal text-base/6">
              {mission.description}
            </p>
          </div>

          {/* Vision */}
          <div data-aos="fade-right" data-aos-duration="1500">
            <h2 className="text-2xl font-bold font-Outfit mb-4">
              {vision.title}
            </h2>
            <p className="text-[#4B5563] font-Inter font-normal text-base/6">
              {vision.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
