// import { FiArrowRight } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Define the different types of items we might display
interface CardProps {
  id: string | number;
  title: string;
  imageSrc: string;
  type: "courses" | "success-stories" | "team";

  // Optional props for different card types
  description?: string;
  learnMoreLink?: string;
  category?: string;
  metric?: string;
  readMoreLink?: string;
  position?: string;
}

const Card = ({
  id,
  title,
  imageSrc,
  type,
  description,
  learnMoreLink,
  category,
  metric,
  readMoreLink,
  position,
}: CardProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg">
      <div className="overflow-hidden ">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className={`w-full object-cover ${type === "team" ? "h-64" : "h-48"}`}
        />
      </div>

      {/* Conditional rendering based on card type */}
      {type === "courses" && (
        <div className=" px-5 pt-5 pb-5">
          <h3 className="text-xl text-[#000] font-Outfit font-semibold mb-2">
            {title}
          </h3>
          <p className="text-[#4B5563] font-Inter font-normal text-sm mb-4">
            {description}
          </p>
          <Link
            to={learnMoreLink}
            className="text-[#4488F7] text-sm font-Outfit font-medium flex items-center hover:text-blue-600 transition-colors mt-auto"
          >
            Learn More <FaArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}

      {type === "success-stories" && (
        <div className=" p-5">
          <div className="text-[#4488F7] font-normal font-Outfit text-base mb-1">
            {category}
          </div>
          <h3 className="text-xl font-Outfit text-[#1E293B] font-bold mb-2">
            {title}
          </h3>
          <p className="text-[#4B5563] text-base font-Inter mb-4">{metric}</p>
          <Link
            to={readMoreLink}
            className="text-blue-500 text-base font-normal flex items-center hover:text-blue-600 transition-colors mt-auto"
          >
            Read More <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      )}

      {type === "team" && (
        <>
          <div className=" p-4">
            <h3 className="text-xl text-[#111827] font-Outfit font-bold mb-1 ">
              {title}
            </h3>
            <div className="text-[#4488F7] font-Outfit font-normal text-base mb-2">
              {position}
            </div>
            <p className="text-[#4B5563] font-Inter text-base font-normal ">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
