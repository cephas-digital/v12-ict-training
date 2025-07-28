import type React from "react";
import { useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

interface ContactInfo {
  address: {
    street: string;
    city: string;
    zip: string;
  };
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekend?: string;
  };
}

interface ContactFormProps {
  contactInfo: ContactInfo;
  className?: string;
  iconSize?: number;
  withMap?: boolean;
  mapUrl?: string;
}

export const ContactForm = ({
  contactInfo,
  className = "",
  iconSize = 24,
  withMap = false,
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673431806365!2d-122.41941548468204!3d37.77492997975892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1626209282733!5m2!1sen!2sus",
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        "There was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic contact form without map (two-column layout)
  if (!withMap) {
    return (
      <section
        data-aos="zoom-in"
        data-aos-duration="1500"
        className={`py-16 ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div data-aos="fade-up" data-aos-duration="1500">
              <h2 className="text-2xl mb-6 font-Outfit font-normal text-[#000]">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-[#F6B900] mr-4">
                    <FaMapMarkerAlt size={iconSize} />
                  </div>
                  <div>
                    <h3 className="font-Outfit font-normal text-base mb-1">
                      Address
                    </h3>
                    <p className="text-[#4B5563] font-Inter text-base font-normal">
                      {contactInfo.address.street},{contactInfo.address.city},{" "}
                      {contactInfo.address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#F6B900] mr-4">
                    <FaPhone size={iconSize} />
                  </div>
                  <div>
                    <h3 className="font-Outfit font-normal text-base mb-1">
                      Phone
                    </h3>
                    <p className="text-[#4B5563] font-Inter text-base font-normal">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#F6B900] mr-4">
                    <FaEnvelope size={iconSize} />
                  </div>
                  <div>
                    <h3 className="font-Outfit font-normal text-base mb-1">
                      Email
                    </h3>
                    <p className="text-[#4B5563] font-Inter text-base font-normal">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#F6B900] mr-4">
                    <FaClock size={iconSize} />
                  </div>
                  <div>
                    <h3 className="font-Outfit font-normal text-base mb-1">
                      Business Hours
                    </h3>
                    <p className="text-[#4B5563] font-Inter text-base font-normal">
                      {contactInfo.hours.weekdays}
                    </p>
                    {contactInfo.hours.weekend && (
                      <p className="text-[#4B5563] font-Inter text-base font-normal">
                        {contactInfo.hours.weekend}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-down" data-aos-duration="1500">
              <h2 className="text-2xl font-Outfit font-bold mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F6B900] font-Outfit font-bold text-base text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6B900] focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitSuccess && (
                  <div className="p-3 bg-green-100 text-green-700 rounded-md">
                    Your message has been sent successfully!
                  </div>
                )}

                {submitError && (
                  <div className="p-3 bg-red-100 text-red-700 rounded-md">
                    {submitError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Contact form with map (three-column layout)
  return (
    <section
      data-aos="zoom-in"
      data-aos-duration="1500"
      className={`py-16 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl mb-6 font-Outfit font-bold text-[#000]">
              Contact Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-[#F6B900] mr-4">
                  <FaMapMarkerAlt size={iconSize} />
                </div>
                <div>
                  <h3 className="font-Outfit font-normal text-base mb-1">
                    Office Address
                  </h3>
                  <p className="text-[#4B5563] font-Inter text-base font-normal">
                    {contactInfo.address.street}
                    <br />
                    {contactInfo.address.city}, {contactInfo.address.zip}
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-[#F6B900] mr-4">
                  <FaPhone size={iconSize} />
                </div>
                <div>
                  <h3 className="font-Outfit font-normal text-base mb-1">
                    Phone
                  </h3>
                  <p className="text-[#4B5563] font-Inter text-base font-normal">
                    {contactInfo.phone}
                    <br />
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-[#F6B900] mr-4">
                  <FaEnvelope size={iconSize} />
                </div>
                <div>
                  <h3 className="font-Outfit font-normal text-base mb-1">
                    Email
                  </h3>
                  <p className="text-[#4B5563] font-Inter text-base font-normal">
                    info@v12digitals.co.uk
                    <br />
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-[#F6B900] mr-4">
                  <FaClock size={iconSize} />
                </div>
                <div>
                  <h3 className="font-Outfit font-normal text-base mb-1">
                    Working Hours
                  </h3>
                  <p className="text-[#4B5563] font-Inter text-base font-normal">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="font-Outfit font-normal text-base mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#F6B900] transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#F6B900] transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#F6B900] transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#F6B900] transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#F6B900] transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="">
            <h2 className="text-2xl font-Outfit font-bold mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base text-[#374151] font-normal font-Outfit mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-base text-[#374151] font-normal font-Outfit mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-base text-[#374151] font-normal font-Outfit mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-base text-[#374151] font-normal font-Outfit mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-base text-[#374151] font-normal font-Outfit mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F6B900] font-Outfit font-bold text-base text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6B900] focus:ring-offset-2 disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitSuccess && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md">
                  Your message has been sent successfully!
                </div>
              )}

              {submitError && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {submitError}
                </div>
              )}
            </form>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold font-Outfit text-[#111827] mb-6">
              Visit Us
            </h2>
            <div className="h-80 rounded-lg overflow-hidden">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
            <p className="mt-4 text-[#4B5563] font-Inter text-base font-normal">
              Find us at our main office:
              <br />
              {contactInfo.address.street}
              <br />
              {contactInfo.address.city}, {contactInfo.address.zip}
              <br />
              United States
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// import type React from "react";
// import { useState } from "react";
// import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// interface ContactInfo {
//   address: {
//     street: string;
//     city: string;
//     zip: string;
//   };
//   phone: string;
//   email: string;
//   hours: {
//     weekdays: string;
//     weekend?: string;
//   };
// }

// interface ContactFormProps {
//   contactInfo: ContactInfo;
//   className?: string;
//   iconSize?: number;
//   withMap?: boolean;
//   mapUrl?: string;
// }

// export const ContactForm = ({
//   contactInfo,
//   className = "",
//   iconSize = 24,
//   withMap = false,
//   mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673431806365!2d-122.41941548468204!3d37.77492997975892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1626209282733!5m2!1sen!2sus",
// }: ContactFormProps) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitError("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//       });

//       setSubmitSuccess(true);
//       setTimeout(() => setSubmitSuccess(false), 5000);
//     } catch (error) {
//       setSubmitError(
//         "There was an error sending your message. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className={`py-16 ${className}`}>
//       <div className="container mx-auto px-4">
//         <div
//           className={`grid grid-cols-1 ${
//             withMap ? "lg:grid-cols-3 gap-8" : "lg:grid-cols-2 gap-12"
//           }`}
//         >
//           {/* Contact Information */}
//           <div>
//             <h2 className="text-2xl mb-6 font-Outfit font-normal text-[#000]">
//               Get in Touch
//             </h2>
//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <div className="text-[#F6B900] mr-4">
//                   <FaMapMarkerAlt size={iconSize} />
//                 </div>
//                 <div>
//                   <h3 className="font-Outfit font-normal text-base mb-1">
//                     Address
//                   </h3>
//                   <p className="text-[#4B5563] font-Inter text-base font-normal">
//                     {contactInfo.address.street},{contactInfo.address.city},{" "}
//                     {contactInfo.address.zip}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="text-[#F6B900] mr-4">
//                   <FaPhone size={iconSize} />
//                 </div>
//                 <div>
//                   <h3 className="font-Outfit font-normal text-base mb-1">
//                     Phone
//                   </h3>
//                   <p className="text-[#4B5563] font-Inter text-base font-normal">
//                     {contactInfo.phone}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="text-[#F6B900] mr-4">
//                   <FaEnvelope size={iconSize} />
//                 </div>
//                 <div>
//                   <h3 className="font-Outfit font-normal text-base mb-1">
//                     Email
//                   </h3>
//                   <p className="text-[#4B5563] font-Inter text-base font-normal">
//                     {contactInfo.email}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="text-[#F6B900] mr-4">
//                   <FaClock size={iconSize} />
//                 </div>
//                 <div>
//                   <h3 className="font-Outfit font-normal text-base mb-1">
//                     Business Hours
//                   </h3>
//                   <p className="text-[#4B5563] font-Inter text-base font-normal">
//                     {contactInfo.hours.weekdays}
//                   </p>
//                   {contactInfo.hours.weekend && (
//                     <p className="text-[#4B5563] font-Inter text-base font-normal">
//                       {contactInfo.hours.weekend}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div>
//             <h2 className="text-2xl font-Outfit font-bold mb-6">
//               Send us a Message
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your Name"
//                   className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Your Email"
//                   className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   placeholder="Subject"
//                   className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   rows={5}
//                   className="w-full font-Inter placeholder:font-Inter text-base placeholder:text-base font-normal placeholder:font-normal px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-[#F6B900] font-Outfit font-bold text-base text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6B900] focus:ring-offset-2 disabled:opacity-70"
//               >
//                 {isSubmitting ? "Sending..." : "Send Message"}
//               </button>

//               {submitSuccess && (
//                 <div className="p-3 bg-green-100 text-green-700 rounded-md">
//                   Your message has been sent successfully!
//                 </div>
//               )}

//               {submitError && (
//                 <div className="p-3 bg-red-100 text-red-700 rounded-md">
//                   {submitError}
//                 </div>
//               )}
//             </form>
//           </div>

//           {/* Map */}
//           {withMap && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Visit Us</h2>
//               <div className="h-80 rounded-lg overflow-hidden">
//                 <iframe
//                   src={mapUrl}
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   title="Location Map"
//                 ></iframe>
//               </div>
//               <p className="mt-4 text-[#4B5563] font-Inter text-base font-normal">
//                 Find us at our main office:
//                 <br />
//                 {contactInfo.address.street}
//                 <br />
//                 {contactInfo.address.city}, {contactInfo.address.zip}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };
