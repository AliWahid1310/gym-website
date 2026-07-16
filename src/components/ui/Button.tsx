import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-semibold tracking-wide uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variantStyles: Record<string, string> = {
  primary:
    "bg-[#D91E2A] text-white hover:bg-[#B8101A] focus-visible:ring-[#D91E2A] active:scale-[0.97]",
  secondary:
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0A0A0A] focus-visible:ring-white active:scale-[0.97]",
  dark: "bg-[#0A0A0A] text-white hover:bg-[#222] focus-visible:ring-[#0A0A0A] active:scale-[0.97]",
  white:
    "bg-white text-[#0A0A0A] hover:bg-[#F5F5F5] focus-visible:ring-white active:scale-[0.97]",
};

const sizeStyles: Record<string, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
