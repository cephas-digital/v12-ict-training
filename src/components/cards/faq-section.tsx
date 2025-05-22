import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
  backgroundColor?: string;
}

export const FAQSection = ({
  title = "Frequently Asked Questions",
  faqs,
  viewAllLink,
  viewAllText = "View All FAQs",
  className = "",
  backgroundColor = "bg-white",
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] font-Outfit text-center mb-12">
          {title}
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-gray-50 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className=" text-[#111827] font-bold text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FiChevronDown className="flex-shrink-0 ml-2" />
                ) : (
                  <FiChevronUp className="flex-shrink-0 ml-2" />
                )}
              </button>

              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600">
                  <p className=" font-Inter text-base text-[#4B5563] font-normal">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {viewAllLink && (
          <div className="text-center mt-8">
            <a
              href={viewAllLink}
              className="text-[#0066CC] font-Outfit font-normal text-base hover:text-blue-600 "
            >
              {viewAllText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
