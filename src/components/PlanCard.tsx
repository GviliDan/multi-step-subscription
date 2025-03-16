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
      className={`border rounded-xl p-4 w-full text-left
        ${
          isSelected
            ? "border-marine-blue bg-magnolia"
            : "border-light-gray hover:border-marine-blue"
        }`}
    >
      <div className="flex flex-row md:flex-col items-start md:items-start md:gap-8 gap-4">
        <div className="rounded-full flex items-center justify-center">
          <Image src={plan.icon} alt={plan.label} width={40} height={40} />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-marine-blue text-lg">{plan.label}</h3>
          <p className="text-gray-400 text-sm font-medium">{price}</p>
          {isYearly && (
            <p className="text-marine-blue text-xs font-medium mt-1">
              2 months free
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default PlanCard;
