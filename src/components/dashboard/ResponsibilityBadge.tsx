import React from "react";

interface ResponsibilityBadgeProps {
  responsibility: "your" | "cquel" | "supplier" | "accepted";
}

const ResponsibilityBadge: React.FC<ResponsibilityBadgeProps> = ({ responsibility }) => {
  if (responsibility === "accepted") {
    return null; // Don't show badge for accepted items
  }

  const getBadgeStyles = () => {
    switch (responsibility) {
      case "your":
        return {
          background: "#fdeee9",
          color: "#e9571f",
          border: "1px solid #f4c4a3"
        };
      case "cquel":
        return {
          background: "#eaf8f1",
          color: "#126e53",
          border: "1px solid #a8d5c4"
        };
      case "supplier":
        return {
          background: "#e8f1f8",
          color: "#004b75",
          border: "1px solid #b8d4e8"
        };
      default:
        return {};
    }
  };

  const getLabel = () => {
    switch (responsibility) {
      case "your":
        return "Your Action";
      case "cquel":
        return "CQuel's Action";
      case "supplier":
        return "Supplier Action";
      default:
        return "";
    }
  };

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-bold whitespace-nowrap"
      style={getBadgeStyles()}
    >
      {getLabel()}
    </span>
  );
};

export default ResponsibilityBadge;
