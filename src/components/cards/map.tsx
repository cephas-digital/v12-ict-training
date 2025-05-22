interface StaticMapProps {
  imageUrl?: string;
  altText?: string;
  width?: string;
  height?: string;
  className?: string;
  caption?: string;
}

export const StaticMap = ({
  imageUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673431806365!2d-122.41941548468204!3d37.77492997975892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1626209282733!5m2!1sen!2sus",
  altText = "Location Map",
  width = "100%",
  height = "300px",
  className = "",
  caption,
}: StaticMapProps) => {
  return (
    <div
      data-aos="zoom-out"
      data-aos-duration="1500"
      className={`${className}`}
    >
      <div className="rounded-lg overflow-hidden" style={{ width, height }}>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-gray-500 text-center">{caption}</p>
      )}
    </div>
  );
};
