import type React from "react";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Testimonial {
  id: string | number;
  name: string;
  position: string;
  image: string;
  quote: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  title?: string;
  autoplay?: boolean;
  interval?: number;
  className?: string;
  slidesToShow?: number;
}

export const TestimonialSlider = ({
  testimonials,
  title = "What Our Students Say",
  autoplay = true,
  interval = 5000,
  className = "",
  slidesToShow = 3,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalSlides = testimonials.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  // Responsive slides to show
  const getResponsiveSlidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return Math.min(2, slidesToShow);
    }
    return slidesToShow;
  };

  const [responsiveSlidesToShow, setResponsiveSlidesToShow] =
    useState(slidesToShow);

  useEffect(() => {
    const handleResize = () => {
      setResponsiveSlidesToShow(getResponsiveSlidesToShow());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slidesToShow]);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      if (currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoplay, interval, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex < maxIndex ? currentIndex + 1 : 0);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : maxIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + responsiveSlidesToShow
  );

  return (
    <section
      data-aos="flip-up"
      data-aos-duration="1500"
      className={`py-16  ${className}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] font-Outfit  text-center mb-12">
          {title}
        </h2>

        <div className="relative">
          {/* Testimonials */}
          <div
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(0px)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className=" font-Outfit font-normal text-base text-[#000]">
                        {testimonial.name}
                      </h3>
                      <p className="text-[#4B5563] font-Inter text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#4B5563] text-base/6 font-Inter italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className=" flex justify-between items-center mt-2">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className=" z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none hidden md:block"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-6 w-6 text-blue-500" />
            </button>

            <button
              onClick={nextSlide}
              className="  z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none hidden md:block"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-6 w-6 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
