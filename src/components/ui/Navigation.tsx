"use client";

import React from "react";
import clsx from "clsx";

export interface NavItem {
  id: string;
  label: string;
}

export interface NavigationProps {
  items: NavItem[];
  activeId: string;
  onChange?: (id: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, activeId, onChange }) => {
  return (
    <div className="w-full bg-white sticky top-0 z-40 border-b border-[var(--border-light)]">
      <div className="container-page">
        <nav className="flex items-center gap-6 overflow-x-auto h-[50px]">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                className={clsx(
                  "relative h-[50px] flex items-center text-[14px] whitespace-nowrap transition-colors",
                  isActive ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)] font-normal hover:text-[var(--text-primary)]"
                )}
                onClick={() => onChange?.(item.id)}
              >
                {item.label}
                <span
                  className={clsx(
                    "absolute left-0 right-0 -bottom-px h-[2px] rounded-full",
                    isActive ? "bg-[var(--brand-primary)]" : "bg-transparent"
                  )}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;


