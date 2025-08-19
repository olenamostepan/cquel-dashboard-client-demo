import React from "react";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return initials.join("");
}

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = 32 }) => {
  const dimension = `${size}px`;
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover border border-[var(--border-light)]"
        style={{ width: dimension, height: dimension }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-[var(--border-light)] text-[var(--text-secondary)] flex items-center justify-center border border-[var(--border-default)]"
      style={{ width: dimension, height: dimension }}
      aria-label={name}
    >
      <span className="text-[12px] font-bold">{getInitials(name)}</span>
    </div>
  );
};

export default Avatar;


