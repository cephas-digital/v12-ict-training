import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FiTwitter, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import Logo from "../layouts/logo";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "facebook" | "twitter" | "linkedin" | "instagram" | "github";
  href: string;
}

export interface FooterProps {
  logo: {
    src: string;
    alt: string;
  };
  description: string;
  quickLinks: FooterLink[];
  contactInfo: {
    address: string;
    city: string;
    email: string;
    phone: string;
  };
  socialLinks: SocialLink[];
  newsletter?: boolean;
  copyright?: string;
  className?: string;
}

export const Footer = ({
  logo,
  description,
  quickLinks,
  contactInfo,
  socialLinks,
  newsletter = true,
  copyright = `© ${new Date().getFullYear()} V12 INSTITUTE. All rights reserved.`,
  className = "",
}: FooterProps) => {
  const getSocialIcon = (platform: string, size = 20) => {
    const iconProps = { size, className: "text-white" };

    switch (platform) {
      case "facebook":
        return <FaFacebookF {...iconProps} />;
      case "twitter":
        return <FaTwitter {...iconProps} />;
      case "linkedin":
        return <FaLinkedin {...iconProps} />;
      case "instagram":
        return <FaInstagram {...iconProps} />;
      case "github":
        return <FiGithub {...iconProps} />;
      default:
        return <FaFacebookF {...iconProps} />;
    }
  };

  return (
    <footer
      className={`bg-black lg:px-16 md:px-10 px-5 text-white py-12 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Logo />
            {/* <img
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              className=" w-36 h-36 mb-4"
            /> */}
            <p className="text-[#9CA3AF] font-Inter font-normal text-base mb-6">
              {description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-Outfit mb-4 ">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#9CA3AF] font-normal font-Outfit hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-Outfit mb-4">Contact</h3>
            <address className="text-[#9CA3AF] font-normal font-Outfit not-italic">
              <p>{contactInfo.address}</p>
              <p>{contactInfo.city}</p>
              <p className="mt-2">{contactInfo.email}</p>
              <p>{contactInfo.phone}</p>
            </address>
          </div>

          {/* Newsletter or Social Links */}
          <div>
            <h3 className="text-lg font-bold font-Outfit mb-4">Follow Us</h3>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                  aria-label={`Follow us on ${link.platform}`}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>

            {/* {newsletter && (
              <>
                <h3 className="text-lg font-bold font-Outfit mb-4">
                  Newsletter
                </h3>
                <p className="text-[#9CA3AF] font-normal font-Outfit mb-2">
                  Stay updated with our latest news and updates
                </p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </>
            )} */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-[#9CA3AF] font-normal font-Outfit">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};
