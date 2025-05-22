import { CTABanner } from "./cta-banner";
import { DownloadBrochure } from "./download-brochure";
import { FAQSection } from "./faq-section";
import { StaticMap } from "./map";
import { OurStory } from "./our-story";
import mapimg from "../../assets/images/mapimg.png";
import storyimg from "../../assets/images/storyimg.png";

// Download Brochure Data
const downloadBrochureProps = {
  title: "Download Course Brochure",
  subtitle:
    "Get detailed information about our courses, pricing, and schedules",
  buttonText: "Download Brochure",
};

// CTA Banner Data
const ctaBannerProps = {
  title: "Ready to Transform Your Business?",
  primaryButtonText: "Schedule a Consultation",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Learn More",
  secondaryButtonHref: "/about",
};

// CTA Banner Data
const mapProps = {
  image: mapimg,
};

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "What are your business hours?",
    answer:
      "We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.",
  },
  {
    id: 2,
    question: "How quickly can I expect a response?",
    answer:
      "We aim to respond to all inquiries within 24 hours during business days. For urgent technical support, our team is available 24/7.",
  },
  {
    id: 3,
    question: "Do you offer remote consultations?",
    answer:
      "Yes, we offer remote consultations via video conferencing platforms. You can schedule a meeting through our online booking system.",
  },
  {
    id: 4,
    question: "What areas do you service?",
    answer:
      "We provide services nationwide and have international capabilities for select solutions. Contact our sales team for specific coverage information.",
  },
];

// Our Story Data
const ourStoryProps = {
  title: "Our Story",
  content:
    "Since our inception in 2005, we've been at the forefront of digital innovation, helping businesses transform and adapt to the ever-evolving technological landscape. Our journey has been marked by continuous learning, innovation, and a commitment to delivering excellence in every project we undertake.",
  imageUrl: storyimg,
  imageAlt: "Our team working together",
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "200+", label: "Expert Team Members" },
  ],
};

// Export pre-configured components
export const CourseBrochure = ({ className = "" }) => (
  <DownloadBrochure
    title={downloadBrochureProps.title}
    subtitle={downloadBrochureProps.subtitle}
    buttonText={downloadBrochureProps.buttonText}
    className={className}
  />
);

export const BusinessCTA = ({ className = "" }) => (
  <CTABanner
    title={ctaBannerProps.title}
    primaryButtonText={ctaBannerProps.primaryButtonText}
    primaryButtonLink={ctaBannerProps.primaryButtonLink}
    secondaryButtonText={ctaBannerProps.secondaryButtonText}
    secondaryButtonHref={ctaBannerProps.secondaryButtonHref}
    className={className}
  />
);

export const CommonQuestions = ({ className = "" }) => (
  <FAQSection
    title="Frequently Asked Questions"
    faqs={faqData}
    viewAllLink="/faq"
    className={className}
  />
);

export const LocationMap = ({ className = "" }) => (
  <StaticMap
    imageUrl={mapProps.image}
    altText="Our Location"
    className={className}
    caption=""
  />
);

export const CompanyStory = ({ className = "" }) => (
  <OurStory
    title={ourStoryProps.title}
    content={ourStoryProps.content}
    imageUrl={ourStoryProps.imageUrl}
    imageAlt={ourStoryProps.imageAlt}
    stats={ourStoryProps.stats}
    className={className}
  />
);
