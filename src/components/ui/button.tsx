import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "blue" | "primary" | "outline";
  size?: "default" | "sm" | "lg";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      href,
      children,
      ...props
    },
    ref
  ) => {
    let buttonClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors";

    // To Add variant-specific classes
    if (variant === "default") {
      buttonClasses += " bg-[#fff] text-[#4488F7] hover:bg-gray-700";
    } else if (variant === "blue") {
      buttonClasses += " bg-blue-500 text-white hover:bg-blue-600";
    } else if (variant === "primary") {
      buttonClasses += " bg-[#F6B900] text-white hover:bg-yellow-600";
    } else if (variant === "outline") {
      buttonClasses +=
        " border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
    }

    //My specific style class
    if (size === "default") {
      buttonClasses +=
        " text-sm font-Outfit h-[48px] w-[149px] flex items-center justify-center";
    } else if (size === "sm") {
      buttonClasses += " text-xs font-Outfit h-8 px-3 py-1";
    } else if (size === "lg") {
      buttonClasses += " text-xl font-Outfit h-[69px] w-[232px] py-3";
    }

    // To Add any custom classes
    buttonClasses += ` ${className}`;

    // To Return my anchor tag
    if (href) {
      return (
        <Link to={href} className={buttonClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
