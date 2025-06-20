import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { NewLogo } from "../layouts/logo";
import { Button } from "../ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems?: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
  };
}

const classNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const Navbar = ({
  navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Courses", href: "/our-courses" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  ctaButton = {
    label: "Enroll Now",
    href: "/enroll-now",
  },
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="w-full py-2 bg-white lg:px-16 md:px-10 px-5 fixed top-0 left-0 right-0 z-40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <NewLogo />
        <div className=" flex items-center lg:gap-32">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6 lg:gap-10">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={classNames(
                  "text-base cursor-pointer font-Outfit transition-colors hover:text-gray-900",
                  isActive(item.href)
                    ? "text-[#111827] font-bold"
                    : "text-[#404040] font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="primary" size="lg" href={ctaButton.href}>
              {ctaButton.label}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={classNames(
          "container md:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col space-y-4 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={classNames(
                "text-sm cursor-pointer font-Outfit transition-colors hover:text-gray-900",
                isActive(item.href)
                  ? "text-[#111827] font-bold"
                  : "text-[#404040] font-semibold"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="primary"
            size="lg"
            href={ctaButton.href}
            className="mt-2"
          >
            {ctaButton.label}
          </Button>
        </nav>
      </div>
    </header>
  );
};

// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import { NewLogo } from "../layouts/logo";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";

// interface NavItem {
//   label: string;
//   href: string;
// }

// interface NavbarProps {
//   navItems?: NavItem[];
//   ctaButton?: {
//     label: string;
//     href: string;
//   };
// }

// const classNames = (...classes: (string | undefined)[]) => {
//   return classes.filter(Boolean).join(" ");
// };

// export const Navbar = ({
//   navItems = [
//     { label: "Home", href: "/" },
//     { label: "About Us", href: "/about" },
//     { label: "Our Courses", href: "/our-courses" },
//     { label: "Contact Us", href: "/contact-us" },
//   ],
//   ctaButton = {
//     label: "Enroll Now",
//     href: "/enroll-now",
//   },
// }: NavbarProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="w-full py-2 bg-white lg:px-16 md:px-10 px-5 fixed top-0 left-0 right-0 z-40">
//       <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//         <NewLogo />
//         <div className=" flex items-center lg:gap-32">
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex md:gap-6 lg:gap-10">
//             {navItems.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.href}
//                 className="text-base cursor-pointer font-medium font-Outfit text-[#404040] transition-colors hover:text-gray-900"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           <div className="hidden md:block">
//             <Button variant="primary" size="lg" href={ctaButton.href}>
//               {ctaButton.label}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
//         >
//           {isMenuOpen ? (
//             <FiX className="h-6 w-6" />
//           ) : (
//             <FiMenu className="h-6 w-6" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         className={classNames(
//           "container md:hidden",
//           isMenuOpen ? "block" : "hidden"
//         )}
//       >
//         <nav className="flex flex-col space-y-4 py-4">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.href}
//               className="text-sm font-medium cursor-pointer text-gray-700 transition-colors hover:text-gray-900"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
//           <Button
//             variant="primary"
//             size="lg"
//             href={ctaButton.href}
//             className="mt-2"
//           >
//             {ctaButton.label}
//           </Button>
//         </nav>
//       </div>
//     </header>
//   );
// };
