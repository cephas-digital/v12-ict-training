import type React from "react";
import {
  FaBook,
  FaBriefcase,
  FaCertificate,
  FaChartArea,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaGraduationCap,
  FaHeadset,
  FaHospital,
  FaLaptopCode,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import { FaDiagramProject, FaHandshakeAngle } from "react-icons/fa6";
import { FiAward, FiBook } from "react-icons/fi";
import { BsBank2, BsPiggyBankFill, BsShopWindow } from "react-icons/bs";
import { PiBankBold, PiBankFill } from "react-icons/pi";
import { RiBankFill, RiGraduationCapLine } from "react-icons/ri";
import {
  FiHome,
  FiDollarSign,
  FiTrello,
  FiShoppingBag,
  FiGrid,
} from "react-icons/fi";
import { IoMdTrophy } from "react-icons/io";

// Define the item interface
interface GridItem {
  id: string | number;
  icon?: string;
  iconComponent?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  link?: string;
}

// Props for the component
interface CenteredGridProps {
  sectionTitle: string;
  items: GridItem[];
  variant?:
    | "default"
    | "industries"
    | "stats"
    | "benefits"
    | "awards"
    | "team"
    | "timeline";
  columns?: 2 | 3 | 4 | 5 | 6 | 7;
  className?: string;
  withBackground?: boolean;
  withBorder?: boolean;
  withShadow?: boolean;
  iconSize?: number; // Added new prop for icon size
}

// Helper function to get the icon component
const getIconComponent = (icon: string, size = 40) => {
  // Increased default size from 24 to 40
  const iconProps = { size, className: "text-blue-500" };

  switch (icon) {
    // Industries
    case "healthcare":
      return <FaHospital {...iconProps} />;
    case "finance":
      return <BsBank2 {...iconProps} />;
    case "manufacturing":
      return <FaChartArea {...iconProps} />;
    case "education":
      return <RiBankFill {...iconProps} />;
    case "retail":
      return <FaWarehouse {...iconProps} />;
    case "government":
      return <PiBankBold {...iconProps} />;

    // Stats & Benefits
    case "clock":
      return <FaClock {...iconProps} />;
    case "users":
      return <FaUsers {...iconProps} />;
    case "projects":
      return <FaDiagramProject {...iconProps} />;
    case "globe":
      return <FaGlobe {...iconProps} />;
    case "award":
      return <FaCertificate {...iconProps} />;
    case "recorgnition":
      return <IoMdTrophy {...iconProps} />;
    case "support":
      return <FaHeadset {...iconProps} />;
    case "uptime":
      return <FaCheckCircle {...iconProps} />;
    case "education":
      return <FiBook {...iconProps} />;
    case "career":
      return <FaHandshakeAngle {...iconProps} />;
    case "instructor":
      return <FaGraduationCap {...iconProps} />;
    case "expert":
      return <RiGraduationCapLine {...iconProps} />;
    case "book":
      return <FaBook {...iconProps} />;
    case "briefcase":
      return <FaBriefcase {...iconProps} />;

    default:
      return <FiAward {...iconProps} />;
  }
};

const CenteredGrid = ({
  sectionTitle,
  items,
  variant = "default",
  columns = 4,
  className = "",
  withBackground = false,
  withBorder = false,
  withShadow = false,
  iconSize = 40, // Default to 40px icons
}: CenteredGridProps) => {
  // Determine the grid columns class based on the columns prop
  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
    7: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  }[columns];

  // Determine item classes based on variant
  const getItemClasses = () => {
    const baseClasses = "flex flex-col items-center text-center p-4";

    if (withBorder) {
      return `${baseClasses} border rounded-lg`;
    }

    if (withShadow) {
      return `${baseClasses} shadow-md rounded-lg`;
    }

    return baseClasses;
  };

  // Get icon size based on variant
  const getIconSizeByVariant = () => {
    switch (variant) {
      case "industries":
        return iconSize || 48; // Larger icons for industries
      case "stats":
        return iconSize || 40; // Medium icons for stats
      case "benefits":
        return iconSize || 40;
      case "timeline":
        return iconSize || 36;
      default:
        return iconSize || 40;
    }
  };

  // Render different item layouts based on variant
  const renderItem = (item: GridItem) => {
    const currentIconSize = getIconSizeByVariant();

    switch (variant) {
      case "industries":
        return (
          <div
            data-aos="flip-up"
            data-aos-duration="1500"
            className={getItemClasses()}
          >
            <div className="text-blue-500 mb-4">
              {item.iconComponent ||
                getIconComponent(item.icon || "", currentIconSize)}
            </div>
            <h3 className=" font-Outfit font-normal text-base text-[#1E293B]">
              {item.title}
            </h3>
          </div>
        );

      case "stats":
        return (
          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            className={getItemClasses()}
          >
            <div className="text-blue-500 mb-4">
              {item.iconComponent ||
                getIconComponent(item.icon || "", currentIconSize)}
            </div>
            <h3 className="text-3xl font-normal text-[#111827] font-Outfit mb-1">
              {item.title}
            </h3>
            <p className="text-[#4B5563] font-Inter font-normal text-base">
              {item.subtitle}
            </p>
          </div>
        );

      case "benefits":
        return (
          <div className={getItemClasses()}>
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="text-blue-500 mb-4"
            >
              {item.iconComponent ||
                getIconComponent(item.icon || "", currentIconSize)}
            </div>
            <h3
              data-aos="fade-right"
              data-aos-duration="1500"
              className="font-bold mb-2 font-Outfit text-[#1E293B] text-xl"
            >
              {item.title}
            </h3>
            <p
              data-aos="fade-left"
              data-aos-duration="1500"
              className="text-[#64748B] text-base font-normal font-Inter"
            >
              {item.description}
            </p>
          </div>
        );

      case "awards":
        return (
          <div className={`${getItemClasses()} bg-[#fff] rounded-lg shadow-sm`}>
            <div className="text-blue-500 mb-4">
              {item.iconComponent ||
                getIconComponent(item.icon || "", currentIconSize)}
            </div>
            <h3 className="font-normal font-Outfit text-base mb-1">
              {item.title}
            </h3>
            <p className="text-[#4B5563] font-Inter font-normal text-base">
              {item.subtitle}
            </p>
          </div>
        );

      case "team":
        return (
          <div
            data-aos="flip-left"
            data-aos-duration="1500"
            className={getItemClasses()}
          >
            {item.image && (
              <div className="mb-4 overflow-hidden rounded-full w-[192px] h-[192px]">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-bold mb-1 font-Outfit text-base">
              {item.title}
            </h3>
            <p className="text-[#4B5563] font-Inter font-normal text-sm">
              {item.subtitle}
            </p>
          </div>
        );

      case "timeline":
        return (
          <div className={getItemClasses()}>
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="text-[#4488F7] mb-4"
            >
              {item.iconComponent ||
                getIconComponent(item.icon || "", currentIconSize)}
            </div>
            <h3
              data-aos="fade-right"
              data-aos-duration="1500"
              className="font-Outfit font-normal text-xl text-[#000] mb-1"
            >
              {item.title}
            </h3>
          </div>
        );

      default:
        return (
          <div className={getItemClasses()}>
            <div className="text-blue-500 mb-4">
              {item.iconComponent ||
                getIconComponent(item.icon || "", currentIconSize)}
            </div>
            <h3 className="font-bold mb-2">{item.title}</h3>
            {item.subtitle && <p className="text-gray-700">{item.subtitle}</p>}
            {item.description && (
              <p className="text-gray-600 text-sm">{item.description}</p>
            )}
          </div>
        );
    }
  };

  return (
    <section
      className={`py-12 ${withBackground ? "bg-gray-50" : ""} ${className}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-[#111827] font-bold font-Outfit text-center mb-10">
          {sectionTitle}
        </h2>
        <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
          {items.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CenteredGrid;

// import type React from "react";
// import {
//   FaCertificate,
//   FaClock,
//   FaGlobe,
//   FaGraduationCap,
//   FaLaptopCode,
//   FaUsers,
// } from "react-icons/fa";
// import { FaDiagramProject, FaHandshakeAngle } from "react-icons/fa6";
// import { ImTrophy } from "react-icons/im";
// import {
//   FiClock,
//   FiBriefcase,
//   FiGlobe,
//   FiAward,
//   FiHeadphones,
//   FiCheckCircle,
//   FiBook,
//   FiBriefcase as FiBag,
// } from "react-icons/fi";
// import {
//   FiHome,
//   FiDollarSign,
//   FiTrello,
//   FiBookOpen,
//   FiShoppingBag,
//   FiGrid,
// } from "react-icons/fi";
// import { IoMdTrophy } from "react-icons/io";

// // Define the item interface
// interface GridItem {
//   id: string | number;
//   icon?: string;
//   iconComponent?: React.ReactNode;
//   title: string;
//   subtitle?: string;
//   description?: string;
//   image?: string;
//   link?: string;
// }

// // Props for the component
// interface CenteredGridProps {
//   sectionTitle: string;
//   items: GridItem[];
//   variant?:
//     | "default"
//     | "industries"
//     | "stats"
//     | "benefits"
//     | "awards"
//     | "team"
//     | "timeline";
//   columns?: 2 | 3 | 4 | 5 | 6 | 7;
//   className?: string;
//   withBackground?: boolean;
//   withBorder?: boolean;
//   withShadow?: boolean;
//   iconSize?: number; // Added new prop for icon size
// }

// // Helper function to get the icon component
// const getIconComponent = (icon: string, size = 40) => {
//   // Increased default size from 24 to 40
//   const iconProps = { size, className: "text-blue-500" };

//   switch (icon) {
//     // Industries
//     case "healthcare":
//       return <FiHome {...iconProps} />;
//     case "finance":
//       return <FiDollarSign {...iconProps} />;
//     case "manufacturing":
//       return <FiTrello {...iconProps} />;
//     case "education":
//       return <FaLaptopCode {...iconProps} />;
//     case "retail":
//       return <FiShoppingBag {...iconProps} />;
//     case "government":
//       return <FiGrid {...iconProps} />;

//     // Stats & Benefits
//     case "clock":
//       return <FaClock {...iconProps} />;
//     case "users":
//       return <FaUsers {...iconProps} />;
//     case "projects":
//       return <FaDiagramProject {...iconProps} />;
//     case "globe":
//       return <FaGlobe {...iconProps} />;
//     case "award":
//       return <FaCertificate {...iconProps} />;
//     case "recorgnition":
//       return <IoMdTrophy {...iconProps} />;
//     case "support":
//       return <FiHeadphones {...iconProps} />;
//     case "uptime":
//       return <FiCheckCircle {...iconProps} />;
//     case "education":
//       return <FiBook {...iconProps} />;
//     case "career":
//       return <FaHandshakeAngle {...iconProps} />;
//     case "instructor":
//       return <FaGraduationCap {...iconProps} />;

//     default:
//       return <FiAward {...iconProps} />;
//   }
// };

// const CenteredGrid = ({
//   sectionTitle,
//   items,
//   variant = "default",
//   columns = 4,
//   className = "",
//   withBackground = false,
//   withBorder = false,
//   withShadow = false,
//   iconSize = 40, // Default to 40px icons
// }: CenteredGridProps) => {
//   // Determine the grid columns class based on the columns prop
//   const gridColsClass = {
//     2: "grid-cols-1 sm:grid-cols-2",
//     3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
//     4: "grid-cols-2 sm:grid-cols-2 md:grid-cols-4",
//     5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
//     6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
//     7: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
//   }[columns];

//   // Determine item classes based on variant
//   const getItemClasses = () => {
//     const baseClasses = "flex flex-col items-center text-center p-4";

//     if (withBorder) {
//       return `${baseClasses} border rounded-lg`;
//     }

//     if (withShadow) {
//       return `${baseClasses} shadow-md rounded-lg`;
//     }

//     return baseClasses;
//   };

//   // Get icon size based on variant
//   const getIconSizeByVariant = () => {
//     switch (variant) {
//       case "industries":
//         return iconSize || 48; // Larger icons for industries
//       case "stats":
//         return iconSize || 40; // Medium icons for stats
//       case "benefits":
//         return iconSize || 40;
//       case "timeline":
//         return iconSize || 36;
//       default:
//         return iconSize || 40;
//     }
//   };

//   // Render different item layouts based on variant
//   const renderItem = (item: GridItem) => {
//     const currentIconSize = getIconSizeByVariant();

//     switch (variant) {
//       case "industries":
//         return (
//           <div className={getItemClasses()}>
//             <div className="text-blue-500 mb-4">
//               {item.iconComponent ||
//                 getIconComponent(item.icon || "", currentIconSize)}
//             </div>
//             <h3 className="font-medium">{item.title}</h3>
//           </div>
//         );

//       case "stats":
//         return (
//           <div className={getItemClasses()}>
//             <div className="text-blue-500 mb-4">
//               {item.iconComponent ||
//                 getIconComponent(item.icon || "", currentIconSize)}
//             </div>
//             <h3 className="text-3xl font-normal text-[#111827] font-Outfit mb-1">
//               {item.title}
//             </h3>
//             <p className="text-[#4B5563] font-Inter font-normal text-base">
//               {item.subtitle}
//             </p>
//           </div>
//         );

//       case "benefits":
//         return (
//           <div className={getItemClasses()}>
//             <div className="text-blue-500 mb-4">
//               {item.iconComponent ||
//                 getIconComponent(item.icon || "", currentIconSize)}
//             </div>
//             <h3 className="font-bold mb-2">{item.title}</h3>
//             <p className="text-gray-600 text-sm">{item.description}</p>
//           </div>
//         );

//       case "awards":
//         return (
//           <div className={getItemClasses()}>
//             <div className="text-blue-500 mb-4">
//               {item.iconComponent ||
//                 getIconComponent(item.icon || "", currentIconSize)}
//             </div>
//             <h3 className="font-normal font-Outfit text-base mb-1">
//               {item.title}
//             </h3>
//             <p className="text-[#4B5563] font-Inter font-normal text-base">
//               {item.subtitle}
//             </p>
//           </div>
//         );

//       case "team":
//         return (
//           <div className={getItemClasses()}>
//             {item.image && (
//               <div className="mb-4 overflow-hidden rounded-full w-[192px] h-[192px]">
//                 <img
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             )}
//             <h3 className="font-bold mb-1 font-Outfit text-base">
//               {item.title}
//             </h3>
//             <p className="text-[#4B5563] font-Inter font-normal text-sm">
//               {item.subtitle}
//             </p>
//           </div>
//         );

//       case "timeline":
//         return (
//           <div className={getItemClasses()}>
//             <div className="text-[#4488F7] mb-4">
//               {item.iconComponent ||
//                 getIconComponent(item.icon || "", currentIconSize)}
//             </div>
//             <h3 className="font-Outfit font-normal text-xl text-[#000] mb-1">
//               {item.title}
//             </h3>
//           </div>
//         );

//       default:
//         return (
//           <div className={getItemClasses()}>
//             <div className="text-blue-500 mb-4">
//               {item.iconComponent ||
//                 getIconComponent(item.icon || "", currentIconSize)}
//             </div>
//             <h3 className="font-bold mb-2">{item.title}</h3>
//             {item.subtitle && <p className="text-gray-700">{item.subtitle}</p>}
//             {item.description && (
//               <p className="text-gray-600 text-sm">{item.description}</p>
//             )}
//           </div>
//         );
//     }
//   };

//   return (
//     <section
//       className={`py-12 ${withBackground ? "bg-gray-50" : ""} ${className}`}
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl text-[#111827] font-bold font-Outfit text-center mb-10">
//           {sectionTitle}
//         </h2>
//         <div className={`grid ${gridColsClass} gap-6 md:gap-8`}>
//           {items.map((item) => (
//             <div key={item.id}>{renderItem(item)}</div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CenteredGrid;
