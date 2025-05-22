import { FaClock, FaGraduationCap } from "react-icons/fa";
// import { FiClock, FiUsers } from "react-icons/fi";

interface Course {
  id: string | number;
  title: string;
  image: string;
  duration: {
    weeks: number;
    text?: string;
  };
  level:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Beginner to Advanced"
    | string;
  description?: string;
  detailsLink: string;
}

interface CourseCardProps {
  course: Course;
  className?: string;
}

export const CourseCard = ({ course, className = "" }: CourseCardProps) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="overflow-hidden ">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold font-Outfit mb-3">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-[#4B5563] text-sm">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span className=" font-Inter font-normal text-sm text-[#4B5563]">
              {course.duration.weeks} {course.duration.text || "weeks"}
            </span>
          </div>

          <div className="flex items-center">
            <FaGraduationCap className="mr-1" />
            <span className="font-Inter font-normal text-sm text-[#4B5563]">
              {course.level}
            </span>
          </div>
        </div>

        {course.description && (
          <p className="text-gray-600 mb-4">{course.description}</p>
        )}

        <div className="mt-auto">
          <a
            href={course.detailsLink}
            className="block text-center bg-[#4488F7] font-Outfit font-normal text-base hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};
