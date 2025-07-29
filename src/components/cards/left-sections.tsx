import {
  MissionVisionValues,
  ContactCards,
  ServicesGrid,
  BusinessHours,
  MissionVisionAbout,
  //   MissionVisionSimple,
} from "./left-aline";

// Mission Vision Values Data
const missionVisionValuesData = [
  {
    id: 1,
    icon: "mission",
    title: "Our Mission",
    description:
      "To empower businesses through innovative technology solutions that drive growth and efficiency.",
  },
  {
    id: 2,
    icon: "vision",
    title: "Our Vision",
    description:
      "To be the global leader in digital transformation, setting new standards in technological innovation.",
  },
  {
    id: 3,
    icon: "values",
    title: "Our Values",
    description:
      "Innovation, Excellence, Integrity, Collaboration, and Customer Success drive everything we do.",
  },
];

// Inquiries Data
const inquiriesData = [
  {
    id: 1,
    icon: "general",
    title: "General Inquiries",
    email: "info@v12digitals.co.uk",
    phone: "+447733714715",
  },
  {
    id: 2,
    icon: "support",
    title: "Technical Support",
    email: "info@v12digitals.co.uk",
    phone: "+447733714715",
  },
  {
    id: 3,
    icon: "business",
    title: "Business Development",
    email: "info@v12digitals.co.uk",
    phone: "+1 (555) 345-6789",
  },
];

// Ways to Connect Data
const connectData = [
  {
    id: 1,
    icon: "support",
    title: "Technical Support",
    description: "24/7 support for all your technical needs",
    email: "info@v12digitals.co.uk",
    phone: "+447733714715",
  },
  {
    id: 2,
    icon: "sales",
    title: "Sales Inquiries",
    description: "Talk to our sales team about solutions",
    email: "info@v12digitals.co.uk",
    phone: "+1 (555) 987-6543",
  },
  {
    id: 3,
    icon: "partnership",
    title: "Partnership Opportunities",
    description: "Explore business collaboration options",
    email: "info@v12digitals.co.uk",
    phone: "+1 (555) 456-7890",
  },
];

// Services Data
const servicesData = [
  {
    id: 1,
    icon: "cloud",
    title: "Cloud Solutions",
    description: "Secure and scalable cloud infrastructure solutions",
    features: ["Migration", "Hosting", "Storage"],
  },
  {
    id: 2,
    icon: "security",
    title: "Cybersecurity",
    description: "Advanced security measures to protect your digital assets",
    features: ["Network Security", "Data Protection", "Threat Prevention"],
  },
  {
    id: 3,
    icon: "infrastructure",
    title: "IT Infrastructure",
    description: "Robust infrastructure design and implementation",
    features: ["Network Design", "Hardware Solutions", "System Integration"],
  },
  {
    id: 4,
    icon: "software",
    title: "Software Development",
    description: "Custom software solutions for your unique needs",
    features: ["Web Apps", "Mobile Apps", "Enterprise Software"],
  },
  {
    id: 5,
    icon: "digital",
    title: "Digital Transformation",
    description: "Guide your business through digital evolution",
    features: ["Process Automation", "Digital Strategy", "Innovation"],
  },
  {
    id: 6,
    icon: "consulting",
    title: "IT Consulting",
    description: "Expert guidance for your technology decisions",
    features: ["Strategy Planning", "Tech Assessment", "Optimization"],
  },
];

// Business Hours Data
const businessHoursData = {
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    weekend: "Weekend: Closed",
  },
  socialLinks: {
    linkedin: "https://linkedin.com/company/ictcompany",
    twitter: "https://twitter.com/ictcompany",
    facebook: "https://facebook.com/ictcompany",
  },
  helpSection: {
    title: "Need Help?",
    description: "Check our FAQ section for quick answers to common questions",
    linkText: "Visit FAQ Page",
    linkUrl: "/faq",
  },
};

// Mission Vision Simple Data
const missionVisionSimpleData = {
  mission: {
    title: "Our Mission",
    description:
      "To empower individuals with cutting-edge technology skills and knowledge, enabling them to excel in the digital age.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To be the leading ICT training provider, recognized for excellence in education and student success.",
  },
};

// Export pre-configured components
export const OurMissionVisionValues = ({ className = "", iconSize = 40 }) => (
  <MissionVisionValues
    items={missionVisionValuesData}
    className={className}
    iconSize={iconSize}
  />
);

export const GeneralInquiries = ({ className = "", iconSize = 40 }) => (
  <ContactCards
    items={inquiriesData}
    className={className}
    iconSize={iconSize}
    withShadow={false}
  />
);

export const WaysToConnect = ({ className = "", iconSize = 40 }) => (
  <ContactCards
    items={connectData}
    className={className}
    iconSize={iconSize}
    withShadow={true}
  />
);

export const OurServices = ({ className = "", iconSize = 40 }) => (
  <ServicesGrid
    sectionTitle="Our Services"
    items={servicesData}
    className={className}
    iconSize={iconSize}
  />
);

export const BusinessHoursSection = ({ className = "", iconSize = 24 }) => (
  <BusinessHours
    hours={businessHoursData.hours}
    socialLinks={businessHoursData.socialLinks}
    helpSection={businessHoursData.helpSection}
    className={className}
    iconSize={iconSize}
  />
);

export const MissionVisionSection = ({ className = "" }) => (
  <MissionVisionAbout
    mission={missionVisionSimpleData.mission}
    vision={missionVisionSimpleData.vision}
    className={className}
  />
);

//   {/* Industries We Serve */}
//   <IndustriesWeServe iconSize={56} />

//   {/* Experience Stats */}
//   <ExperienceStats iconSize={48} />

//   {/* Why Choose Us */}
//   <WhyChooseUs iconSize={48} />

//   <h2 className="container mx-auto px-4 text-2xl font-bold mt-12 mb-4">Left-Aligned Components</h2>

//   {/* Mission Vision Values */}
//   <OurMissionVisionValues iconSize={48} />

//   {/* Simple Mission Vision */}
//   <MissionVisionSection />

//   {/* General Inquiries */}
//   <GeneralInquiries iconSize={48} />

//   {/* Ways to Connect */}
//   <WaysToConnect iconSize={48} />

//   {/* Our Services */}
//   <OurServices iconSize={48} />

//   {/* Business Hours */}
//   <BusinessHoursSection iconSize={32} />
