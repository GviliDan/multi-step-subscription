import React from "react";

interface StepNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  prevLabel?: string;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  onPrev,
  onNext,
  nextDisabled = false,
  nextLabel = "Next Step",
  prevLabel = "Go Back",
}) => {
  const buttonBg =
    nextLabel === "Confirm" ? "bg-marine-blue" : "bg-purplish-blue";

  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onPrev}
        className="text-cool-gray hover:text-marine-blue focus:outline-none focus:ring-2 focus:ring-purplish-blue rounded"
      >
        {prevLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`${buttonBg} text-white px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purplish-blue ${
          nextDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default StepNavigation;
