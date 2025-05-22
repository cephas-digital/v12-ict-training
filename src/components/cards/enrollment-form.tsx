import type React from "react";

import { useState } from "react";
import {
  FaCalendar,
  FaEnvelope,
  FaPhone,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

interface EnrollmentFormProps {
  className?: string;
  onSubmit?: (formData: EnrollmentFormData) => void;
}

interface EnrollmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel: string;
  desiredProgram: string;
  startDate: string;
  referralSource: string;
  specialRequirements: string;
}

const educationLevels = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other",
];

const programs = [
  "Web Development Bootcamp",
  "Data Science & Analytics",
  "Cybersecurity Fundamentals",
  "Cloud Computing",
  "Mobile App Development",
  "Digital Marketing",
];

const referralSources = [
  "Search Engine",
  "Social Media",
  "Friend or Family",
  "Advertisement",
  "Email",
  "Other",
];

export function EnrollmentForm({
  className = "",
  onSubmit,
}: EnrollmentFormProps) {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    educationLevel: "",
    desiredProgram: "",
    startDate: "",
    referralSource: "",
    specialRequirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
      // Reset form after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        educationLevel: "",
        desiredProgram: "",
        startDate: "",
        referralSource: "",
        specialRequirements: "",
      });
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto bg-white shadow p-8 rounded-lg my-16 ${className}`}
    >
      <h1 className="text-2xl md:text-3xl font-Outfit font-bold  text-center mb-8">
        Enrollment Form
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className=" mb-4 text-[#111827] font-bold font-Outfit text-lg">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                First Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaRegUser size={16} />
                </span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full pl-10 pr-3 py-2  placeholder:text-sm placeholder:text-[#9CA3AF] text-sm font-Inter placeholder:font-Inter font-normal placeholder:font-extralight rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaRegUser size={16} />
                </span>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full pl-10 pr-3 py-2  placeholder:text-sm placeholder:text-[#9CA3AF] text-sm font-Inter placeholder:font-Inter font-normal placeholder:font-extralight rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaRegEnvelope size={16} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 placeholder:text-sm placeholder:text-[#9CA3AF] text-sm font-Inter placeholder:font-Inter font-normal placeholder:font-extralight rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FiPhone size={16} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-3 py-2 placeholder:text-sm placeholder:text-[#9CA3AF] text-sm font-Inter placeholder:font-Inter font-normal placeholder:font-extralight rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="mb-8">
          <h2 className="text-[#111827] font-bold font-Outfit text-lg mb-4">
            Academic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Education Level */}
            <div>
              <label
                htmlFor="educationLevel"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                Previous Education Level
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#d1d5db] font-Inter placeholder:font-Inter placeholder:font-extralight text-[#000] placeholder:text-sm text-sm font-extralight bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="" disabled>
                  Select education level
                </option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Desired Program */}
            <div>
              <label
                htmlFor="desiredProgram"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                Desired Program
              </label>
              <select
                id="desiredProgram"
                name="desiredProgram"
                value={formData.desiredProgram}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#d1d5db] font-Inter placeholder:font-Inter placeholder:font-extralight text-[#000] placeholder:text-sm text-sm font-extralight bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="" disabled>
                  Select program
                </option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                Start Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaCalendar size={16} />
                </span>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-[6px] bg-gray-50 placeholder:text-sm placeholder:text-[#9CA3AF] text-sm font-Inter placeholder:font-Inter font-extralight placeholder:font-extralight border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Referral Source */}
            <div>
              <label
                htmlFor="referralSource"
                className="block text-base font-Outfit font-normal text-[#374151] mb-1"
              >
                How did you hear about us?
              </label>
              <select
                id="referralSource"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#d1d5db] font-Inter placeholder:font-Inter font-extralight placeholder:font-extralight text-[#000] placeholder:text-sm text-sm  bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="" disabled>
                  Select option
                </option>
                {referralSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="mt-6">
            <label
              htmlFor="specialRequirements"
              className="block text-base font-Outfit font-normal text-[#374151] mb-1"
            >
              Special Requirements or Comments
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              placeholder="Enter any additional information..."
              rows={4}
              className="w-full px-3 py-2  font-Inter placeholder:font-Inter placeholder:font-extralight text-[#000] placeholder:text-sm text-sm font-normal rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#F6B900] font-Outfit font-bold hover:bg-yellow-600 text-white text-lg rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Complete Enrollment
        </button>
      </form>
    </div>
  );
}
