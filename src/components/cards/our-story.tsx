interface Stat {
  value: string;
  label: string;
}

interface OurStoryProps {
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  stats?: Stat[];
  className?: string;
  imagePosition?: "left" | "right";
}

export const OurStory = ({
  title = "Our Story",
  content = "Since our inception in 2005, we've been at the forefront of digital innovation, helping businesses transform and adapt to the ever-evolving technological landscape. Our journey has been marked by continuous learning, innovation, and a commitment to delivering excellence in every project we undertake.",
  imageUrl = "/placeholder.svg?height=400&width=600",
  imageAlt = "Our team working together",
  stats = [
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "200+", label: "Expert Team Members" },
  ],
  className = "",
  imagePosition = "left",
}: OurStoryProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
            imagePosition === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className={`${imagePosition === "right" ? "md:order-2" : ""}`}>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={imageAlt}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Content */}
          <div className={`${imagePosition === "right" ? "md:order-1" : ""}`}>
            <h2 className="text-2xl md:text-3xl font-Outfit text-[#1F2937] font-bold mb-4">
              {title}
            </h2>
            <p className="text-[#4B5563] font-Inter font-normal text-[15px] mb-10">
              {content}
            </p>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                  <div className=" bg-[#F9FAFB] p-5 rounded-lg" key={index}>
                    <div className="text-[#2563EB] font-normal font-Outfit text-2xl md:text-3xl ">
                      {stat.value}
                    </div>
                    <div className="text-[#4B5563] font-Inter text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
