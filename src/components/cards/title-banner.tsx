interface TitleBannerProps {
  title: string;
  subtitle: string;
  className?: string;
  textColor?: string;
  backgroundColor?: string;
}

export const TitleBanner = ({
  title,
  subtitle,
  className = "",
  textColor = "text-white",
  backgroundColor = "bg-blue-500",
}: TitleBannerProps) => {
  return (
    <section
      className={`py-16 lg:px-16 md:px-10 px-5 ${backgroundColor} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 font-Outfit ${textColor}`}
          >
            {title}
          </h1>
          <p
            className={`text-lg md:text-xl/7 font-Inter ${textColor} opacity-90`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
