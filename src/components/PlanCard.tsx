import { PlanConfig } from "@/types";
import { PlanType } from "@/types/enums";
import Image from "next/image";
import React from "react";

interface IProps {
  plan: PlanConfig;
  isSelected: boolean;
  isYearly: boolean;
  onSelect: (type: PlanType) => void;
}

const PlanCard: React.FC<IProps> = ({
  plan,
  isSelected,
  isYearly,
  onSelect,
}) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.type)}
      className={`text-left border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purplish-blue 
        ${
          isSelected
            ? "border-marine-blue bg-magnolia"
            : "border-light-gray hover:border-marine-blue"
        }`}
    >
      <Image
        src={plan.icon}
        alt={plan.label}
        width={40}
        height={40}
        className="mb-3"
      />
      <h3 className="font-medium text-marine-blue">{plan.label}</h3>
      <p className="text-cool-gray text-sm">{price}</p>
      {isYearly && (
        <p className="text-purplish-blue text-xs font-medium">2 months free</p>
      )}
    </button>
  );
};

export default PlanCard;
