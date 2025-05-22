import { Link } from "react-router-dom";

interface CTABannerProps {
  title?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const CTABanner = ({
  title = "Ready to Transform Your Business?",
  primaryButtonText = "Schedule a Consultation",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Learn More",
  secondaryButtonHref = "/about",
  className = "",
  backgroundColor = "bg-blue-500",
  textColor = "text-white",
}: CTABannerProps) => {
  return (
    <section className={`py-16 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-8 font-Outfit  ${textColor}`}
        >
          {title}
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={primaryButtonLink}
            className="inline-block bg-white text-[#4488F7] text-base font-Outfit font-normal hover:bg-gray-100 py-3 px-6 rounded-md transition-colors"
          >
            {primaryButtonText}
          </Link>

          <a
            href={secondaryButtonHref}
            className={`inline-block font-Outfit font-normal text-base  ${textColor} hover:bg-white/10 py-3 px-6 rounded-md font-medium transition-colors`}
          >
            {secondaryButtonText}
          </a>
        </div>
      </div>
    </section>
  );
};
