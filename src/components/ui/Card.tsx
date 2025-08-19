import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, elevated = false, children, ...props }) => {
  return (
    <div
      className={clsx(
        "bg-white border border-[var(--border-light)] rounded-lg",
        elevated && "shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;


