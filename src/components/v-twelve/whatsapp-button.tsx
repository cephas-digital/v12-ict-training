import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";

interface WhatsappButtonProps {
  phoneNumber: string;
}

export function WhatsappButton({ phoneNumber }: WhatsappButtonProps) {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\+/g, "")}`; // Remove '+' for the link

  return (
    <div className="fixed bottom-10 right-24 z-50">
      {/* Use a standard <a> tag for external links */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button
          className="rounded-full w-14 h-14 shadow-lg bg-[#25D366] hover:bg-[#1DA851] text-white"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7" />
        </Button>
      </a>
    </div>
  );
}
