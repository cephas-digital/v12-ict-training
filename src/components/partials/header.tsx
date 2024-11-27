import React, { useEffect, useRef, useState } from "react";
import Logo from "../layouts/logo";
import { useNavigate } from "react-router";
// import Notification from "../../assets/icons/notification.svg";
import Messaging from "../../assets/icons/messaging.svg";
import { Icon } from "@iconify/react";
import UserGuide from "../../assets/icons/users-alt.svg";
import FaqIcon from "../../assets/icons/comment-info.svg";
import SupportIcon from "../../assets/icons/chat 01.svg";

const Header = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click target is inside the container
      if (!containerRef.current?.contains(event.target as Node)) {
        setActive(null);
      }
    };

    // Only add listener if a dropdown is open
    if (active !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);
  const links = [
    {
      name: "about",
      url: "/about",
      action: () => scrollToSection("about"),
    },
    {
      name: "resources",
      url: "/resources",
      children: [
        {
          action: () =>
            window.open(
              "https://stakeholder-map.nyc3.digitaloceanspaces.com/WSH%20Tools%20Mapping%20Dashboard%20User%20Guide%20(2).pdf",
              "_blank"
            ),
          icon: UserGuide,
          text: "User Guide",
        },
      ],
    },
    {
      name: "help",
      url: "/help",
      children: [
        {
          action: () => {
            setActive(null);
            scrollToSection("faq");
          },
          icon: FaqIcon,
          text: "Faq",
        },
        {
          action: () => {
            setActive(null);
            scrollToSection("help");
          },
          icon: SupportIcon,
          text: "Support",
        },
      ],
    },
  ];
  return (
    <div>
      <div className="w-full relative lg:h-28 h-20 bg-transparent">
        {active !== null && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-[999]"
            onClick={() => setActive(null)}
          />
        )}
        <div
          ref={containerRef}
          className="section-container flex h-full items-center justify-between"
        >
          <div>
            <Logo />
          </div>
          <div>
            <Icon
              icon={"material-symbols:menu"}
              color="white"
              className="block lg:hidden"
              style={{
                fontSize: "40px",
              }}
              onClick={() => setMenu(true)}
            />
          </div>
          <div className="lg:flex hidden gap-10 items-center capitalize text-base h-full text-white inter font-medium">
            {links?.map((l, i) => (
              <div
                ref={(el) => (dropdownRefs.current[i] = el)}
                className="relative"
              >
                <h6
                  onClick={() => {
                    if (l?.action) {
                      l.action();
                    } else {
                      setActive(i);
                    }
                  }}
                  key={i}
                  className="cursor-pointer"
                >
                  {l?.name}
                </h6>
                {active === i && (
                  <div
                    style={{
                      boxShadow: "0px 10px 10px -5px #0000000A",
                    }}
                    className="absolute z-[1000] top-8 p-4 right-0 w-48 bg-white rounded-lg"
                  >
                    <div className="divide-y">
                      {l?.children?.map((chi) => (
                        <div
                          onClick={chi?.action}
                          className="flex gap-3 items-center h-12"
                        >
                          <img src={chi?.icon} alt="" className="" />
                          <h5 className="text-sm font-medium text-da-blue-500 capitalize">
                            {chi?.text}
                          </h5>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                border: "2px solid #FFFFFF",
              }}
              className="h-12 w-40 bg-transparent rounded-xl text-base inter font-medium text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      {menu && (
        <div className="absolute top-0 w-full bg-white p-6">
          <div className="flex justify-end">
            <Icon
              icon={"mingcute:close-fill"}
              color="#002A54"
              className="block lg:hidden"
              style={{
                fontSize: "24px",
              }}
              onClick={() => setMenu(false)}
            />
          </div>
          <div className="mt-5 space-y-4">
            {links?.map((link) => (
              <h6
                onClick={() => scrollToSection(link?.name)}
                className="text-xl font-medium capitalize text-da-blue-600 cursor-pointer"
              >
                {link?.name}
              </h6>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const PageHeader = () => {
  return (
    <div className="w-full bg-[#142239] h-20 flex justify-between items-center">
      <div className="w-[25%] h-full flex items-center pl-6 border-r border-r-[#C4C4C4]">
        <Logo />
      </div>
      <div className="flex gap-5 items-center pr-6">
        {/* <img src={Notification} alt="" className="" /> */}
        <a href="mailto:wash@gmail.com">
          {" "}
          <img src={Messaging} alt="" className="" />
        </a>
      </div>
    </div>
  );
};

export default Header;
