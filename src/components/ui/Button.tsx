"use client";

import React from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "neutral";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  children,
  fullWidth = false,
  ...props
}) => {
  const base = "inline-flex items-center justify-center rounded-md text-[14px] font-bold leading-[20px] transition-colors";
  
  const sizes = {
    sm: "px-3 h-8 text-[12px]",
    md: "px-4 h-10 text-[14px]"
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--brand-primary)] text-white hover:brightness-[0.95] active:brightness-[0.9]",
    secondary:
      "bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)] hover:bg-[#eceff3]",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:bg-[var(--border-light)]",
    neutral:
      "bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)] hover:bg-[#eceff3]",
  };

  return (
    <button className={clsx(base, sizes[size], variants[variant], fullWidth && "w-full", className)} {...props}>
      {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;


