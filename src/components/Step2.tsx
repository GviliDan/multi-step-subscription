"use client";
import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import arcadeIcon from "@/assets/images/icon-arcade.svg";
import advancedIcon from "@/assets/images/icon-advanced.svg";
import proIcon from "@/assets/images/icon-pro.svg";
import { Step2Data } from "@/types";
import { PlanType } from "@/types/enums";

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
  data: Step2Data;
  updateData: (data: Step2Data) => void;
}

const Step2: React.FC<IProps> = ({ nextStep, prevStep, data, updateData }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(data.selectedPlan);
  const [isYearly, setIsYearly] = useState<boolean>(data.isYearly);
  const [error, setError] = useState<string>("");

  const planPrice = useCallback(
    (plan: PlanType) => {
      if (plan === PlanType.Arcade) return isYearly ? "$90/yr" : "$9/mo";
      if (plan === PlanType.Advanced) return isYearly ? "$120/yr" : "$12/mo";
      if (plan === PlanType.Pro) return isYearly ? "$150/yr" : "$15/mo";
      return "";
    },
    [isYearly]
  );

  const planCards = useMemo(() => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setSelectedPlan(PlanType.Arcade)}
          className={`text-left border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purplish-blue 
            ${
              selectedPlan === PlanType.Arcade
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray hover:border-marine-blue"
            }`}
        >
          <Image
            src={arcadeIcon}
            alt="Arcade"
            width={40}
            height={40}
            className="mb-3"
          />
          <h3 className="font-medium text-marine-blue">Arcade</h3>
          <p className="text-cool-gray text-sm">{planPrice(PlanType.Arcade)}</p>
          {isYearly && (
            <p className="text-purplish-blue text-xs font-medium">
              2 months free
            </p>
          )}
        </button>
        <button
          type="button"
          onClick={() => setSelectedPlan(PlanType.Advanced)}
          className={`text-left border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purplish-blue 
            ${
              selectedPlan === PlanType.Advanced
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray hover:border-marine-blue"
            }`}
        >
          <Image
            src={advancedIcon}
            alt="Advanced"
            width={40}
            height={40}
            className="mb-3"
          />
          <h3 className="font-medium text-marine-blue">Advanced</h3>
          <p className="text-cool-gray text-sm">
            {planPrice(PlanType.Advanced)}
          </p>
          {isYearly && (
            <p className="text-purplish-blue text-xs font-medium">
              2 months free
            </p>
          )}
        </button>
        <button
          type="button"
          onClick={() => setSelectedPlan(PlanType.Pro)}
          className={`text-left border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purplish-blue 
            ${
              selectedPlan === PlanType.Pro
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray hover:border-marine-blue"
            }`}
        >
          <Image
            src={proIcon}
            alt="Pro"
            width={40}
            height={40}
            className="mb-3"
          />
          <h3 className="font-medium text-marine-blue">Pro</h3>
          <p className="text-cool-gray text-sm">{planPrice(PlanType.Pro)}</p>
          {isYearly && (
            <p className="text-purplish-blue text-xs font-medium">
              2 months free
            </p>
          )}
        </button>
      </div>
    );
  }, [selectedPlan, isYearly, planPrice]);

  const handleNext = useCallback(() => {
    if (selectedPlan === PlanType.None) {
      setError("Please select a plan.");
      return;
    }
    setError("");
    updateData({ selectedPlan, isYearly });
    nextStep();
  }, [selectedPlan, isYearly, nextStep, updateData]);

  return (
    <>
      <h2 className="text-2xl font-bold text-marine-blue">Select your plan</h2>
      <p className="text-cool-gray text-sm mb-6">
        You have the option of monthly or yearly billing.
      </p>

      {planCards}

      {error && <p className="text-strawberry-red mb-4 text-sm">{error}</p>}

      <div className="bg-magnolia p-3 rounded-md flex items-center justify-center space-x-4 mb-6">
        <span
          className={
            !isYearly ? "text-marine-blue font-medium" : "text-cool-gray"
          }
        >
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-purplish-blue">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <div className="w-11 h-6 bg-light-gray rounded-full peer peer-checked:bg-purplish-blue transition-all" />
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all" />
        </label>
        <span
          className={
            isYearly ? "text-marine-blue font-medium" : "text-cool-gray"
          }
        >
          Yearly
        </span>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="text-cool-gray hover:text-marine-blue focus:outline-none focus:ring-2 focus:ring-purplish-blue rounded"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={selectedPlan === PlanType.None}
          className={`bg-marine-blue text-white px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purplish-blue
            ${
              selectedPlan === PlanType.None
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
        >
          Next Step
        </button>
      </div>
    </>
  );
};

export default Step2;
