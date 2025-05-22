import CenteredGrid from "./centered-grid";
import memberone from "../../assets/images/memberone.png";
import membertwo from "../../assets/images/membertwo.png";
import memberthree from "../../assets/images/memberthree.png";
import memberfour from "../../assets/images/memberfour.png";

// Industries We Serve
const industriesData = [
  { id: 1, icon: "healthcare", title: "Healthcare" },
  { id: 2, icon: "finance", title: "Finance" },
  { id: 3, icon: "manufacturing", title: "Manufacturing" },
  { id: 4, icon: "education", title: "Education" },
  { id: 5, icon: "retail", title: "Retail" },
  { id: 6, icon: "government", title: "Government" },
];

// Experience Stats
const experienceData = [
  { id: 1, icon: "clock", title: "18+", subtitle: "Years of Excellence" },
  { id: 2, icon: "users", title: "500+", subtitle: "Global Clients" },
  { id: 3, icon: "projects", title: "1000+", subtitle: "Projects Delivered" },
  { id: 4, icon: "globe", title: "25+", subtitle: "Countries Served" },
];

// Why Choose Us
const whyChooseUsData = [
  {
    id: 1,
    icon: "clock",
    title: "20+ Years Experience",
    description: "Decades of expertise in delivering ICT solutions",
  },
  {
    id: 2,
    icon: "support",
    title: "24/7 Support",
    description: "Round-the-clock technical assistance and support",
  },
  {
    id: 3,
    icon: "uptime",
    title: "99.9% Uptime",
    description: "Reliable and consistent service availability",
  },
];

// Awards & Recognition
const awardsData = [
  {
    id: 1,
    icon: "recorgnition",
    title: "Excellence Award 2021",
    subtitle: "Technology Innovation Category",
  },
  {
    id: 2,
    icon: "recorgnition",
    title: "Excellence Award 2022",
    subtitle: "Technology Innovation Category",
  },
  {
    id: 3,
    icon: "recorgnition",
    title: "Excellence Award 2023",
    subtitle: "Technology Innovation Category",
  },
  {
    id: 4,
    icon: "recorgnition",
    title: "Excellence Award 2024",
    subtitle: "Technology Innovation Category",
  },
];

// Why Learn With Us
const whyLearnWithUsData = [
  {
    id: 1,
    icon: "expert",
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience",
  },
  {
    id: 2,
    icon: "book",
    title: "Flexible Learning",
    description: "Study at your own pace with our flexible program structure",
  },
  {
    id: 3,
    icon: "briefcase",
    title: "Career Support",
    description: "Get guidance and support for your career development",
  },
];

// Why Choose Us Timeline
const whyChooseTimelineData = [
  { id: 1, icon: "instructor", title: "Expert Instructors" },
  { id: 2, icon: "award", title: "Industry-Recognized Certificates" },
  { id: 3, icon: "education", title: "Hands-on Training" },
  { id: 4, icon: "career", title: "Career Support" },
];

// Our Expert Team
const expertTeamData = [
  {
    id: 1,
    image: memberone,
    title: "Dr. James Wilson",
    subtitle: "Technical Director",
  },
  {
    id: 2,
    image: membertwo,
    title: "Lisa Anderson",
    subtitle: "Lead Instructor",
  },
  {
    id: 3,
    image: memberthree,
    title: "David Chen",
    subtitle: "Training Manager",
  },
  {
    id: 4,
    image: memberfour,
    title: "Maria Garcia",
    subtitle: "Career Advisor",
  },
];

// Export pre-configured components
export const IndustriesWeServe = ({ className = "", iconSize = 48 }) => (
  <CenteredGrid
    sectionTitle="Industries We Serve"
    items={industriesData}
    variant="industries"
    columns={6}
    className={className}
    iconSize={iconSize}
  />
);

export const ExperienceStats = ({ className = "", iconSize = 40 }) => (
  <CenteredGrid
    sectionTitle=""
    items={experienceData}
    variant="stats"
    columns={4}
    className={className}
    withBackground={true}
    iconSize={iconSize}
  />
);

export const WhyChooseUs = ({ className = "", iconSize = 40 }) => (
  <CenteredGrid
    sectionTitle="Why Choose Us"
    items={whyChooseUsData}
    variant="benefits"
    columns={3}
    className={className}
    iconSize={iconSize}
  />
);

export const AwardsRecognition = ({ className = "", iconSize = 40 }) => (
  <CenteredGrid
    sectionTitle="Awards & Recognition"
    items={awardsData}
    variant="awards"
    columns={4}
    className={className}
    withBackground={true}
    withShadow={false}
    iconSize={iconSize}
  />
);

export const WhyLearnWithUs = ({ className = "", iconSize = 40 }) => (
  <CenteredGrid
    sectionTitle="Why Learn With Us"
    items={whyLearnWithUsData}
    variant="benefits"
    columns={3}
    className={className}
    withBackground={true}
    iconSize={iconSize}
  />
);

export const WhyChooseTimeline = ({ className = "", iconSize = 40 }) => (
  <CenteredGrid
    sectionTitle="Why Choose Us"
    items={whyChooseTimelineData}
    variant="timeline"
    columns={4}
    className={className}
    iconSize={iconSize}
  />
);

export const OurExpertTeam = ({ className = "" }) => (
  <CenteredGrid
    sectionTitle="Our Expert Team"
    items={expertTeamData}
    variant="team"
    columns={7}
    className={className}
    withBackground={false}
  />
);
