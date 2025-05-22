import { CourseCard } from "./course-card";

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

interface CoursesGridProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}

export const CoursesGrid = ({
  courses,
  title = "Our Courses",
  subtitle,
  className = "",
  columns = 3,
}: CoursesGridProps) => {
  const gridColsClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={`py-16 lg:px-16 md:px-10 px-5 ${className}`}>
      <div className="container mx-auto px-4">
        {/* {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )} */}

        <div className={`grid ${gridColsClass} gap-8`}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};
