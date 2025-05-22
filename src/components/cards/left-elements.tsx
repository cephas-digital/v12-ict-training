import Card from "./card";
import webimg from "../../assets/images/webimg.png";
import datasciencecourse from "../../assets/images/datasciencecourse.png";
import cybcourseimg from "../../assets/images/cybcourseimg.png";
import leadone from "../../assets/images/leadone.png";
import leadtwo from "../../assets/images/leadtwo.png";
import leadthree from "../../assets/images/leadthree.png";
import leadfour from "../../assets/images/leadfour.png";
import leadfive from "../../assets/images/leadfive.png";
import leadsix from "../../assets/images/leadsix.png";
import successimgone from "../../assets/images/successimgone.png";
import successimgtwo from "../../assets/images/successimgtwo.png";
import successimgthree from "../../assets/images/successimgthree.png";

// Define the different types of items we might display
interface BaseItem {
  id: string | number;
  title: string;
  imageSrc: string;
}

// Course item type
interface CourseItem extends BaseItem {
  description: string;
  learnMoreLink: string;
}

// Success story item type
interface SuccessStoryItem extends BaseItem {
  category: string;
  metric: string;
  readMoreLink: string;
}

// Team member item type
interface TeamMemberItem extends BaseItem {
  position: string;
  description: string;
}

// Props for the component
interface CardGridProps {
  sectionTitle: string;
  type: "courses" | "success-stories" | "team";
  items: (CourseItem | SuccessStoryItem | TeamMemberItem)[];
  className?: string;
}

// Sample data for courses
const coursesData = [
  {
    id: 1,
    title: "Web Development",
    description: "Master modern web development technologies and frameworks",
    imageSrc: webimg,
    learnMoreLink: "/courses/web-development",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Learn data analysis, machine learning, and visualization",
    imageSrc: datasciencecourse,
    learnMoreLink: "/courses/data-science",
  },
  {
    id: 3,
    title: "Cybersecurity",
    description: "Develop skills in network security and threat prevention",
    imageSrc: cybcourseimg,
    learnMoreLink: "/courses/cybersecurity",
  },
];

// Sample data for success stories
const successStoriesData = [
  {
    id: 1,
    category: "Finance",
    title: "Digital Infrastructure Upgrade",
    metric: "50% improved system efficiency",
    imageSrc: successimgone,
    readMoreLink: "/success-stories/finance",
  },
  {
    id: 2,
    category: "Healthcare",
    title: "Security Implementation",
    metric: "100% HIPAA compliance achieved",
    imageSrc: successimgtwo,
    readMoreLink: "/success-stories/healthcare",
  },
  {
    id: 3,
    category: "Manufacturing",
    title: "Cloud Migration",
    metric: "40% reduction in IT costs",
    imageSrc: successimgthree,
    readMoreLink: "/success-stories/manufacturing",
  },
];

// Sample data for team members (home page)
const teamMembersData = [
  {
    id: 1,
    title: "David Anderson",
    position: "Chief Executive Officer",
    description: "20+ years of technology leadership experience",
    imageSrc: leadone,
  },
  {
    id: 2,
    title: "Sarah Chen",
    position: "Chief Technology Officer",
    description: "Former Silicon Valley tech lead",
    imageSrc: leadtwo,
  },
  {
    id: 3,
    title: "Michael Roberts",
    position: "Head of Innovation",
    description: "PhD in Computer Science",
    imageSrc: leadthree,
  },
];

// Sample data for team members (about page - includes an extra member)
const aboutTeamMembersData = [
  {
    id: 1,
    title: "David Anderson",
    position: "Chief Executive Officer",
    description: "20+ years of technology leadership experience",
    imageSrc: leadone,
  },
  {
    id: 2,
    title: "Sarah Chen",
    position: "Chief Technology Officer",
    description: "Former Silicon Valley tech lead",
    imageSrc: leadtwo,
  },
  {
    id: 3,
    title: "Michael Roberts",
    position: "Head of Innovation",
    description: "PhD in Computer Science",
    imageSrc: leadthree,
  },
  {
    id: 4,
    title: "Jennifer Lee",
    position: "Chief Marketing Officer",
    description: "15+ years in digital marketing",
    imageSrc: leadfour,
  },
  {
    id: 5,
    title: "Jennifer Lee",
    position: "Chief Marketing Officer",
    description: "15+ years in digital marketing",
    imageSrc: leadfive,
  },
  {
    id: 6,
    title: "Jennifer Lee",
    position: "Chief Marketing Officer",
    description: "15+ years in digital marketing",
    imageSrc: leadsix,
  },
];

// Generic CardGrid component
const CardGrid = ({
  sectionTitle,
  type,
  items,
  className = "",
}: CardGridProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card
              key={item.id || index}
              id={item.id}
              title={item.title}
              imageSrc={item.imageSrc}
              type={type}
              // Pass type-specific props
              description={
                type === "courses" || type === "team"
                  ? (item as CourseItem | TeamMemberItem).description
                  : undefined
              }
              learnMoreLink={
                type === "courses"
                  ? (item as CourseItem).learnMoreLink
                  : undefined
              }
              category={
                type === "success-stories"
                  ? (item as SuccessStoryItem).category
                  : undefined
              }
              metric={
                type === "success-stories"
                  ? (item as SuccessStoryItem).metric
                  : undefined
              }
              readMoreLink={
                type === "success-stories"
                  ? (item as SuccessStoryItem).readMoreLink
                  : undefined
              }
              position={
                type === "team" ? (item as TeamMemberItem).position : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Pre-configured components with data
export const PopularCourses = ({ className = "" }) => (
  <CardGrid
    sectionTitle="Popular Courses"
    type="courses"
    items={coursesData}
    className={className}
  />
);

export const SuccessStories = ({ className = "" }) => (
  <CardGrid
    sectionTitle="Success Stories"
    type="success-stories"
    items={successStoriesData}
    className={className}
  />
);

export const MeetOurLeadership = ({ className = "" }) => (
  <CardGrid
    sectionTitle="Meet Our Leadership"
    type="team"
    items={teamMembersData}
    className={className}
  />
);

export const OurLeadershipTeam = ({ className = "" }) => (
  <CardGrid
    sectionTitle="Meet Our Leadership"
    type="team"
    items={aboutTeamMembersData}
    className={className}
  />
);

export default CardGrid;
