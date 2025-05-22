import type React from "react";

import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

interface DownloadBrochureProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
  backgroundColor?: string;
  onSubmit?: (name: string, email: string) => void;
}

export const DownloadBrochure = ({
  title = "Download Course Brochure",
  subtitle = "Get detailed information about our courses, pricing, and schedules",
  buttonText = "Download Brochure",
  className = "",
  backgroundColor = "bg-gray-50",
  onSubmit,
}: DownloadBrochureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // If onSubmit prop is provided, call it
      if (onSubmit) {
        await onSubmit(name, email);
      } else {
        // Default behavior - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSuccess(true);
      setName("");
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-16 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 font-Outfit ">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{subtitle}</p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 font-Inter font-normal text-base placeholder:text-base placeholder:font-Inter placeholder:text-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 font-Inter font-normal text-base placeholder:text-base placeholder:font-Inter placeholder:text-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4488F7] font-Outfit font-bold text-base hover:bg-blue-600 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <FaDownload /> {isSubmitting ? "Processing..." : buttonText}
          </button>

          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md">
              Thank you! Your brochure has been sent to your email.
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
