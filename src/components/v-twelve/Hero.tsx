import { Button } from "../ui/button";

const classNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Common interface properties
interface BaseHeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
  showButton?: boolean;
  css?: string;
  variant?: "default" | "light" | "dark";
}

// Centered Hero Props
interface CenteredHeroProps extends BaseHeroProps {
  backgroundImage?: string;
  overlayColor?: string;
  overlayOpacity?: number | string;
  overlayGradient?: string; // New prop for gradient overlays
}

// Flex Hero Props
interface FlexHeroProps extends BaseHeroProps {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "right" | "left";
}

// Full Width Hero Props
interface FullWidthHeroProps extends BaseHeroProps {
  backgroundImage: string;
  alignment?: "center" | "left";
}

// Centered Hero Component
export const CenteredHero = ({
  title,
  subtitle,
  buttonText = "Get Started",
  buttonLink = "/",
  className,
  css,
  showButton = false,
  variant = "default",
  backgroundImage,
  overlayColor = "#2563EB",
  overlayOpacity = 70,
  overlayGradient, // New gradient prop
}: CenteredHeroProps) => {
  const bgColor =
    variant === "light"
      ? "bg-white"
      : variant === "dark"
      ? "bg-gray-900"
      : "bg-gray-50";
  const textColor = variant === "dark" ? "text-white" : "text-gray-900";
  const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600";

  let opacityStyle = {};
  let opacityClass = "";

  if (typeof overlayOpacity === "number") {
    opacityStyle = { opacity: overlayOpacity / 100 };
  } else if (typeof overlayOpacity === "string") {
    opacityClass = overlayOpacity;
  }

  return (
    <section
      className={classNames(
        "flex flex-col items-center justify-center relative",
        backgroundImage ? "" : bgColor,
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div
          className={classNames(
            "absolute inset-0",
            opacityClass,
            overlayGradient || "" // Apply gradient class if provided
          )}
          style={
            overlayGradient
              ? opacityStyle // Only apply opacity if using gradient
              : {
                  backgroundColor: overlayColor,
                  ...opacityStyle,
                }
          }
        />
      )}
      <div className="container flex items-center justify-center px-4 md:px-6 relative z-10">
        <div
          className={`flex flex-col items-center justify-center text-center  ${css} mx-auto`}
        >
          <div className="space-y-8">
            <h1
              data-aos="fade-down-right"
              data-aos-duration="1500"
              className={classNames(
                " lg:text-5xl md:text-4xl text-5xl font-bold font-Outfit tracking-normal ",
                backgroundImage ? "text-white" : textColor
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={classNames(
                  "mx-auto max-w-[700px] text-xl md:text-xl font-Inter",
                  backgroundImage ? "text-gray-200" : subtitleColor
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {showButton && (
        <div className=" absolute bottom-16">
          <Button variant="default" size="lg" href={buttonLink}>
            {buttonText}
          </Button>
        </div>
      )}
    </section>
  );
};

// Flex Hero Component
export const FlexHero = ({
  title,
  subtitle,
  buttonText = "Explore Courses",
  buttonLink = "/courses",
  imageSrc,
  imageAlt,
  css,
  className,
  showButton = false,
  variant = "default",
  imagePosition = "right",
}: FlexHeroProps) => {
  const bgColor =
    variant === "light"
      ? "bg-white"
      : variant === "dark"
      ? "bg-gray-900"
      : "bg-gray-50";
  const textColor = variant === "dark" ? "text-white" : "text-[#1E293B]";
  const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section
      className={classNames(
        "py-12 md:py-16 flex items-center",
        bgColor,
        className
      )}
    >
      <div className="container px-4 md:px-6">
        <div
          className={classNames(
            "grid items-center gap-6 md:grid-cols-2 md:gap-12",
            imagePosition === "left" ? "flex-row-reverse" : ""
          )}
        >
          <div className="flex flex-col justify-center space-y-5">
            <div className="space-y-2">
              <h1
                data-aos="fade-down-right"
                data-aos-duration="1500"
                className={`classNames(
                  " lg:text-3xl md:text-3xl text-5xl lg:leading-none md:leading-10 leading-tight font-bold tracking-tighter text-[#1E293B] font-Outfit sm:text-4xl md:text-4xl",
                  textColor ${css}
                )`}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className={classNames(
                    "max-w-[600px] md:text-xl font-Inter font-normal",
                    subtitleColor
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {showButton && (
              <div>
                <Button variant="blue" size="lg" href={buttonLink}>
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
          <div className="mx-auto overflow-hidden rounded-lg">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              width={550}
              height={400}
              className="aspect-video object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Full Width Hero Component
export const FullWidthHero = ({
  title,
  subtitle,
  buttonText = "Explore Courses",
  buttonLink = "/courses",
  backgroundImage,
  className,
  showButton = false,
  alignment = "center",
}: FullWidthHeroProps) => {
  return (
    <section
      className={classNames(
        "relative flex items-center justify-center",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className={classNames(
          "container relative z-10 px-4 md:px-6 py-24",
          alignment === "center" ? "text-center" : "text-left"
        )}
      >
        <div
          className={classNames(
            "mx-auto max-w-3xl space-y-4",
            alignment === "center" ? "flex flex-col items-center" : ""
          )}
        >
          <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-[700px] text-gray-200 md:text-xl">{subtitle}</p>
          )}
          {showButton && (
            <div className="pt-4">
              <Button variant="blue" size="lg" href={buttonLink}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// import { Button } from "../ui/button";

// const classNames = (...classes: (string | undefined)[]) => {
//   return classes.filter(Boolean).join(" ");
// };

// // Common interface properties
// interface BaseHeroProps {
//   title: string;
//   subtitle?: string;
//   buttonText?: string;
//   buttonLink?: string;
//   className?: string;
//   showButton?: boolean;
//   css?: string;
//   variant?: "default" | "light" | "dark";
// }

// // Centered Hero Props
// interface CenteredHeroProps extends BaseHeroProps {
//   backgroundImage?: string;
//   overlayColor?: string;
//   overlayOpacity?: number | string; // Can be a number or Tailwind opacity class
// }

// // Flex Hero Props
// interface FlexHeroProps extends BaseHeroProps {
//   imageSrc: string;
//   imageAlt: string;
//   imagePosition?: "right" | "left";
// }

// // Full Width Hero Props
// interface FullWidthHeroProps extends BaseHeroProps {
//   backgroundImage: string;
//   alignment?: "center" | "left";
// }

// // Centered Hero Component
// export const CenteredHero = ({
//   title,
//   subtitle,
//   buttonText = "Get Started",
//   buttonLink = "/",
//   className,
//   css,
//   showButton = false,
//   variant = "default",
//   backgroundImage,
//   overlayColor = "#2563EB",
//   overlayOpacity = 70,
// }: CenteredHeroProps) => {
//   const bgColor =
//     variant === "light"
//       ? "bg-white"
//       : variant === "dark"
//       ? "bg-gray-900"
//       : "bg-gray-50";
//   const textColor = variant === "dark" ? "text-white" : "text-gray-900";
//   const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600";

//   let opacityStyle = {};
//   let opacityClass = "";

//   if (typeof overlayOpacity === "number") {
//     opacityStyle = { opacity: overlayOpacity / 100 };
//   } else if (typeof overlayOpacity === "string") {
//     opacityClass = overlayOpacity;
//   }

//   return (
//     <section
//       className={classNames(
//         "flex flex-col items-center justify-center relative",
//         backgroundImage ? "" : bgColor,
//         className
//       )}
//       style={
//         backgroundImage
//           ? {
//               backgroundImage: `url(${backgroundImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }
//           : undefined
//       }
//     >
//       {backgroundImage && (
//         <div
//           className={classNames("absolute inset-0", opacityClass)}
//           style={{
//             backgroundColor: overlayColor,
//             ...opacityStyle,
//           }}
//         />
//       )}
//       <div className="container flex items-center justify-center px-4 md:px-6 relative z-10">
//         <div
//           className={`flex flex-col items-center justify-center text-center  ${css} mx-auto`}
//         >
//           <div className="space-y-8">
//             <h1
//               data-aos="fade-down-right"
//               data-aos-duration="1500"
//               className={classNames(
//                 " lg:text-5xl md:text-4xl text-5xl font-bold font-Outfit tracking-normal ",
//                 backgroundImage ? "text-white" : textColor
//               )}
//             >
//               {title}
//             </h1>
//             {subtitle && (
//               <p
//                 className={classNames(
//                   "mx-auto max-w-[700px] text-xl md:text-xl font-Inter",
//                   backgroundImage ? "text-gray-200" : subtitleColor
//                 )}
//               >
//                 {subtitle}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//       {showButton && (
//         <div className=" absolute bottom-16">
//           <Button variant="default" size="lg" href={buttonLink}>
//             {buttonText}
//           </Button>
//         </div>
//       )}
//     </section>
//   );
// };

// // Flex Hero Component
// export const FlexHero = ({
//   title,
//   subtitle,
//   buttonText = "Explore Courses",
//   buttonLink = "/courses",
//   imageSrc,
//   imageAlt,
//   css,
//   className,
//   showButton = false,
//   variant = "default",
//   imagePosition = "right",
// }: FlexHeroProps) => {
//   const bgColor =
//     variant === "light"
//       ? "bg-white"
//       : variant === "dark"
//       ? "bg-gray-900"
//       : "bg-gray-50";
//   const textColor = variant === "dark" ? "text-white" : "text-[#1E293B]";
//   const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600";

//   return (
//     <section
//       className={classNames(
//         "py-12 md:py-16 flex items-center",
//         bgColor,
//         className
//       )}
//     >
//       <div className="container px-4 md:px-6">
//         <div
//           className={classNames(
//             "grid items-center gap-6 md:grid-cols-2 md:gap-12",
//             imagePosition === "left" ? "flex-row-reverse" : ""
//           )}
//         >
//           <div className="flex flex-col justify-center space-y-5">
//             <div className="space-y-2">
//               <h1
//                 data-aos="fade-down-right"
//                 data-aos-duration="1500"
//                 className={`classNames(
//                   " lg:text-3xl md:text-3xl text-5xl lg:leading-none md:leading-10 leading-tight font-bold tracking-tighter text-[#1E293B] font-Outfit sm:text-4xl md:text-4xl",
//                   textColor ${css}
//                 )`}
//               >
//                 {title}
//               </h1>
//               {subtitle && (
//                 <p
//                   className={classNames(
//                     "max-w-[600px] md:text-xl font-Inter font-normal",
//                     subtitleColor
//                   )}
//                 >
//                   {subtitle}
//                 </p>
//               )}
//             </div>
//             {showButton && (
//               <div>
//                 <Button variant="blue" size="lg" href={buttonLink}>
//                   {buttonText}
//                 </Button>
//               </div>
//             )}
//           </div>
//           <div className="mx-auto overflow-hidden rounded-lg">
//             <img
//               src={imageSrc || "/placeholder.svg"}
//               alt={imageAlt}
//               width={550}
//               height={400}
//               className="aspect-video object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Full Width Hero Component
// export const FullWidthHero = ({
//   title,
//   subtitle,
//   buttonText = "Explore Courses",
//   buttonLink = "/courses",
//   backgroundImage,
//   className,
//   showButton = false,
//   alignment = "center",
// }: FullWidthHeroProps) => {
//   return (
//     <section
//       className={classNames(
//         "relative flex items-center justify-center",
//         className
//       )}
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/60" />
//       <div
//         className={classNames(
//           "container relative z-10 px-4 md:px-6 py-24",
//           alignment === "center" ? "text-center" : "text-left"
//         )}
//       >
//         <div
//           className={classNames(
//             "mx-auto max-w-3xl space-y-4",
//             alignment === "center" ? "flex flex-col items-center" : ""
//           )}
//         >
//           <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
//             {title}
//           </h1>
//           {subtitle && (
//             <p className="max-w-[700px] text-gray-200 md:text-xl">{subtitle}</p>
//           )}
//           {showButton && (
//             <div className="pt-4">
//               <Button variant="blue" size="lg" href={buttonLink}>
//                 {buttonText}
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };
