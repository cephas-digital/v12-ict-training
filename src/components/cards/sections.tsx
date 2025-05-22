import { TitleBanner } from "./title-banner";

import { TestimonialSlider } from "./testimonial";
import { ContactForm } from "./contact-form";
import { Footer, type SocialLink } from "../v-twelve/footer";
import { CoursesGrid } from "./courses-grid";
import studentone from "../../assets/images/studentone.png";
import studenttwo from "../../assets/images/studenttwo.png";
import studentthree from "../../assets/images/studentthree.png";
import courseone from "../../assets/images/courseone.png";
import coursetwo from "../../assets/images/coursetwo.png";
import coursethree from "../../assets/images/coursethree.png";
import coursefour from "../../assets/images/coursefour.png";
import coursefive from "../../assets/images/coursefive.png";
import coursesix from "../../assets/images/coursesix.png";
import footerlogo from "../../assets/images/footerlogo.png";

// Title Banner Data
const aboutBannerData = {
  title: "About V12 DIGITALS",
  subtitle:
    "Leading the way in ICT education with industry-focused training programs and expert instructors.",
};

const coursesBannerData = {
  title: "Our Courses",
  subtitle: "Discover our comprehensive range of ICT training programs",
};
const contactBannerData = {
  title: "Contact Us",
  subtitle: "Get in touch with our team for any inquiries",
};

// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Web Developer",
    image: studentone,
    quote:
      "The training program exceeded my expectations. I landed a job within weeks of completion.",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Data Analyst",
    image: studenttwo,
    quote:
      "Comprehensive curriculum and supportive instructors helped me transition into tech.",
  },
  {
    id: 3,
    name: "Emily Davis",
    position: "Security Specialist",
    image: studentthree,
    quote: "The hands-on projects prepared me well for real-world challenges.",
  },
  {
    id: 4,
    name: "David Wilson",
    position: "Full Stack Developer",
    image: studentone,
    quote:
      "The mentorship I received was invaluable. Highly recommend this program.",
  },
  {
    id: 5,
    name: "Jessica Martinez",
    position: "UX Designer",
    image: studenttwo,
    quote:
      "This course gave me the skills and confidence to change careers successfully.",
  },
];

// Contact Info Data
const contactInfoData = {
  address: {
    street: "123 Tech Street, Digital City",
    city: "DC",
    zip: "12345",
  },
  phone: "+1 (555) 123-4567",
  email: "info@techedupro.com",
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    weekend: "Weekend: Closed",
  },
};

// Footer Data
const footerData: {
  logo: {
    src: string;
    alt: string;
  };
  description: string;
  quickLinks: Array<{ label: string; href: string }>;
  contactInfo: {
    address: string;
    city: string;
    email: string;
    phone: string;
  };
  socialLinks: SocialLink[];
} = {
  logo: {
    src: footerlogo,
    alt: "V12 Logo",
  },
  description:
    "Empowering individuals with professional ICT training and career support.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Courses", href: "/courses" },
    { label: "Contact Us", href: "/contact" },
  ],
  contactInfo: {
    address: "123 Tech Street",
    city: "Digital City, DC 12345",
    email: "info@techedupro.com",
    phone: "+1 (555) 123-4567",
  },
  socialLinks: [
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "twitter", href: "https://twitter.com" },
    { platform: "linkedin", href: "https://linkedin.com" },
    { platform: "instagram", href: "https://instagram.com" },
  ],
};

// Courses Data
const coursesData = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    image: courseone,
    duration: { weeks: 12 },
    level: "Beginner to Advanced",
    detailsLink: "/courses/web-development",
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    image: coursetwo,
    duration: { weeks: 16 },
    level: "Intermediate",
    detailsLink: "/courses/data-science",
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    image: coursethree,
    duration: { weeks: 10 },
    level: "Intermediate",
    detailsLink: "/courses/cybersecurity",
  },
  {
    id: 4,
    title: "Cloud Computing",
    image: coursefour,
    duration: { weeks: 8 },
    level: "Intermediate",
    detailsLink: "/courses/cloud-computing",
  },
  {
    id: 5,
    title: "Mobile App Development",
    image: coursefive,
    duration: { weeks: 14 },
    level: "Intermediate",
    detailsLink: "/courses/mobile-development",
  },
  {
    id: 6,
    title: "Digital Marketing",
    image: coursesix,
    duration: { weeks: 12 },
    level: "Advanced",
    detailsLink: "/courses/digital-marketing",
  },
];

// Export pre-configured components
export const AboutBanner = ({ className = "" }) => (
  <TitleBanner
    title={aboutBannerData.title}
    subtitle={aboutBannerData.subtitle}
    className={className}
  />
);

export const CoursesBanner = ({ className = "" }) => (
  <TitleBanner
    title={coursesBannerData.title}
    subtitle={coursesBannerData.subtitle}
    className={className}
  />
);

export const ContactBanner = ({ className = "" }) => (
  <TitleBanner
    title={contactBannerData.title}
    subtitle={contactBannerData.subtitle}
    className={className}
  />
);

export const StudentTestimonials = ({ className = "" }) => (
  <TestimonialSlider testimonials={testimonialsData} className={className} />
);

// Two different contact form components to match the different designs
export const GetInTouch = ({ className = "" }) => (
  <ContactForm
    contactInfo={contactInfoData}
    className={className}
    withMap={false}
  />
);

export const GetInTouchWithMap = ({ className = "" }) => (
  <ContactForm
    contactInfo={contactInfoData}
    className={className}
    withMap={true}
  />
);

export const MainFooter = ({ className = "" }) => (
  <Footer
    logo={footerData.logo}
    description={footerData.description}
    quickLinks={footerData.quickLinks}
    contactInfo={footerData.contactInfo}
    socialLinks={footerData.socialLinks}
    className={className}
  />
);

export const OurCourses = ({ className = "" }) => (
  <CoursesGrid
    courses={coursesData}
    title="Our Courses"
    subtitle="Explore our industry-leading courses designed to help you succeed in the tech world"
    className={className}
  />
);

// import { TitleBanner } from "./title-banner";

// import { TestimonialSlider } from "./testimonial";
// import { ContactForm } from "./contact-form";
// import { Footer, SocialLink } from "../v-twelve/footer";
// import { CoursesGrid } from "./courses-grid";
// import studentone from "../../assets/images/studentone.png";
// import studenttwo from "../../assets/images/studenttwo.png";
// import studentthree from "../../assets/images/studentthree.png";
// import courseone from "../../assets/images/courseone.png";
// import coursetwo from "../../assets/images/coursetwo.png";
// import coursethree from "../../assets/images/coursethree.png";
// import coursefour from "../../assets/images/coursefour.png";
// import coursefive from "../../assets/images/coursefive.png";
// import coursesix from "../../assets/images/coursesix.png";
// import footerlogo from "../../assets/images/footerlogo.png";

// // Title Banner Data
// const aboutBannerData = {
//   title: "About V12 DIGITALS",
//   subtitle:
//     "Leading the way in ICT education with industry-focused training programs and expert instructors.",
// };

// const coursesBannerData = {
//   title: "Our Courses",
//   subtitle: "Discover our comprehensive range of ICT training programs",
// };
// const contactBannerData = {
//   title: "Contact Us",
//   subtitle: "Get in touch with our team for any inquiries",
// };

// // Testimonials Data
// const testimonialsData = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     position: "Web Developer",
//     image: studentone,
//     quote:
//       "The training program exceeded my expectations. I landed a job within weeks of completion.",
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     position: "Data Analyst",
//     image: studenttwo,
//     quote:
//       "Comprehensive curriculum and supportive instructors helped me transition into tech.",
//   },
//   {
//     id: 3,
//     name: "Emily Davis",
//     position: "Security Specialist",
//     image: studentthree,
//     quote: "The hands-on projects prepared me well for real-world challenges.",
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     position: "Full Stack Developer",
//     image: studentone,
//     quote:
//       "The mentorship I received was invaluable. Highly recommend this program.",
//   },
//   {
//     id: 5,
//     name: "Jessica Martinez",
//     position: "UX Designer",
//     image: studenttwo,
//     quote:
//       "This course gave me the skills and confidence to change careers successfully.",
//   },
// ];

// // Contact Info Data
// const contactInfoData = {
//   address: {
//     street: "123 Tech Street, Digital City",
//     city: "DC",
//     zip: "12345",
//   },
//   phone: "+1 (555) 123-4567",
//   email: "info@techedupro.com",
//   hours: {
//     weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
//     weekend: "Weekend: Closed",
//   },
// };

// // Footer Data
// const footerData: {
//   logo: {
//     src: string;
//     alt: string;
//   };
//   description: string;
//   quickLinks: Array<{ label: string; href: string }>;
//   contactInfo: {
//     address: string;
//     city: string;
//     email: string;
//     phone: string;
//   };
//   socialLinks: SocialLink[];
// } = {
//   logo: {
//     src: footerlogo,
//     alt: "V12 Logo",
//   },
//   description:
//     "Empowering individuals with professional ICT training and career support.",
//   quickLinks: [
//     { label: "Home", href: "/" },
//     { label: "About Us", href: "/about" },
//     { label: "Our Courses", href: "/courses" },
//     { label: "Contact Us", href: "/contact" },
//   ],
//   contactInfo: {
//     address: "123 Tech Street",
//     city: "Digital City, DC 12345",
//     email: "info@techedupro.com",
//     phone: "+1 (555) 123-4567",
//   },
//   socialLinks: [
//     { platform: "facebook", href: "https://facebook.com" },
//     { platform: "twitter", href: "https://twitter.com" },
//     { platform: "linkedin", href: "https://linkedin.com" },
//     { platform: "instagram", href: "https://instagram.com" },
//   ],
// };

// // Courses Data
// const coursesData = [
//   {
//     id: 1,
//     title: "Web Development Bootcamp",
//     image: courseone,
//     duration: { weeks: 12 },
//     level: "Beginner to Advanced",
//     detailsLink: "/courses/web-development",
//   },
//   {
//     id: 2,
//     title: "Data Science & Analytics",
//     image: coursetwo,
//     duration: { weeks: 16 },
//     level: "Intermediate",
//     detailsLink: "/courses/data-science",
//   },
//   {
//     id: 3,
//     title: "Cybersecurity Fundamentals",
//     image: coursethree,
//     duration: { weeks: 10 },
//     level: "Intermediate",
//     detailsLink: "/courses/cybersecurity",
//   },
//   {
//     id: 4,
//     title: "Cloud Computing",
//     image: coursefour,
//     duration: { weeks: 8 },
//     level: "Intermediate",
//     detailsLink: "/courses/cloud-computing",
//   },
//   {
//     id: 5,
//     title: "Mobile App Development",
//     image: coursefive,
//     duration: { weeks: 14 },
//     level: "Intermediate",
//     detailsLink: "/courses/mobile-development",
//   },
//   {
//     id: 6,
//     title: "Digital Marketing",
//     image: coursesix,
//     duration: { weeks: 12 },
//     level: "Advanced",
//     detailsLink: "/courses/digital-marketing",
//   },
// ];

// // Export pre-configured components
// export const AboutBanner = ({ className = "" }) => (
//   <TitleBanner
//     title={aboutBannerData.title}
//     subtitle={aboutBannerData.subtitle}
//     className={className}
//   />
// );

// export const CoursesBanner = ({ className = "" }) => (
//   <TitleBanner
//     title={coursesBannerData.title}
//     subtitle={coursesBannerData.subtitle}
//     className={className}
//   />
// );

// export const ContactBanner = ({ className = "" }) => (
//   <TitleBanner
//     title={contactBannerData.title}
//     subtitle={contactBannerData.subtitle}
//     className={className}
//   />
// );

// export const StudentTestimonials = ({ className = "" }) => (
//   <TestimonialSlider testimonials={testimonialsData} className={className} />
// );

// export const GetInTouch = ({ className = "", withMap = false }) => (
//   <ContactForm
//     contactInfo={contactInfoData}
//     className={className}
//     withMap={withMap}
//   />
// );

// export const MainFooter = ({ className = "" }) => (
//   <Footer
//     logo={footerData.logo}
//     description={footerData.description}
//     quickLinks={footerData.quickLinks}
//     contactInfo={footerData.contactInfo}
//     socialLinks={footerData.socialLinks}
//     className={className}
//   />
// );

// export const OurCourses = ({ className = "" }) => (
//   <CoursesGrid
//     courses={coursesData}
//     title="Our Courses"
//     subtitle="Explore our industry-leading courses designed to help you succeed in the tech world"
//     className={className}
//   />
// );
// // export const OurCourses = ({ className = "" }) => (
// //   <CourseCard
// //     courses={coursesData}
// //     title="Our Courses"
// //     subtitle="Explore our industry-leading courses designed to help you succeed in the tech world"
// //     className={className}
// //   />
// // );
