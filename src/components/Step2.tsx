"use client";
import React, { useState } from "react";
import arcadeIcon from "@/assets/images/icon-arcade.svg";
import advancedIcon from "@/assets/images/icon-advanced.svg";
import proIcon from "@/assets/images/icon-pro.svg";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2({ nextStep, prevStep }: Step2Props) {
  const [selectedPlan, setSelectedPlan] = useState<"arcade" | "advanced" | "pro">(
    "arcade"
  );
  const [isYearly, setIsYearly] = useState(false);

  const handleNext = () => {
    nextStep();
  };

  const planPrice = (plan: "arcade" | "advanced" | "pro") => {
    if (plan === "arcade") return isYearly ? "$90/yr" : "$9/mo";
    if (plan === "advanced") return isYearly ? "$120/yr" : "$12/mo";
    return isYearly ? "$150/yr" : "$15/mo";
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[hsl(213,96%,18%)]">Select your plan</h2>
      <p className="text-[hsl(231,11%,63%)] text-sm mb-6">
        You have the option of monthly or yearly billing.
      </p>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Arcade */}
        <button
          onClick={() => setSelectedPlan("arcade")}
          className={`text-left border rounded-lg p-4 focus:outline-none
                      focus:ring-2 focus:ring-[hsl(243,100%,62%)]
                      hover:border-[hsl(213,96%,18%)]
            ${
              selectedPlan === "arcade"
                ? "border-[hsl(213,96%,18%)] bg-[hsl(217,100%,97%)]"
                : "border-[hsl(229,24%,87%)]"
            }`}
        >
          <img src={arcadeIcon.src} alt="Arcade" className="w-10 h-10 mb-3" />
          <h3 className="font-medium text-[hsl(213,96%,18%)]">Arcade</h3>
          <p className="text-[hsl(231,11%,63%)] text-sm">{planPrice("arcade")}</p>
          {isYearly && (
            <p className="text-[hsl(243,100%,62%)] text-xs font-medium">
              2 months free
            </p>
          )}
        </button>

        {/* Advanced */}
        <button
          onClick={() => setSelectedPlan("advanced")}
          className={`text-left border rounded-lg p-4 focus:outline-none
                      focus:ring-2 focus:ring-[hsl(243,100%,62%)]
                      hover:border-[hsl(213,96%,18%)]
            ${
              selectedPlan === "advanced"
                ? "border-[hsl(213,96%,18%)] bg-[hsl(217,100%,97%)]"
                : "border-[hsl(229,24%,87%)]"
            }`}
        >
          <img src={advancedIcon.src} alt="Advanced" className="w-10 h-10 mb-3" />
          <h3 className="font-medium text-[hsl(213,96%,18%)]">Advanced</h3>
          <p className="text-[hsl(231,11%,63%)] text-sm">{planPrice("advanced")}</p>
          {isYearly && (
            <p className="text-[hsl(243,100%,62%)] text-xs font-medium">
              2 months free
            </p>
          )}
        </button>

        {/* Pro */}
        <button
          onClick={() => setSelectedPlan("pro")}
          className={`text-left border rounded-lg p-4 focus:outline-none
                      focus:ring-2 focus:ring-[hsl(243,100%,62%)]
                      hover:border-[hsl(213,96%,18%)]
            ${
              selectedPlan === "pro"
                ? "border-[hsl(213,96%,18%)] bg-[hsl(217,100%,97%)]"
                : "border-[hsl(229,24%,87%)]"
            }`}
        >
          <img src={proIcon.src} alt="Pro" className="w-10 h-10 mb-3" />
          <h3 className="font-medium text-[hsl(213,96%,18%)]">Pro</h3>
          <p className="text-[hsl(231,11%,63%)] text-sm">{planPrice("pro")}</p>
          {isYearly && (
            <p className="text-[hsl(243,100%,62%)] text-xs font-medium">
              2 months free
            </p>
          )}
        </button>
      </div>

      {/* Monthly/Yearly toggle */}
      <div className="bg-[hsl(217,100%,97%)] p-3 rounded-md flex items-center justify-center space-x-4 mb-6">
        <span
          className={
            !isYearly
              ? "text-[hsl(213,96%,18%)] font-medium"
              : "text-[hsl(231,11%,63%)]"
          }
        >
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer focus-within:ring-2 focus-within:ring-[hsl(243,100%,62%)]">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <div className="w-11 h-6 bg-[hsl(229,24%,87%)] rounded-full peer peer-checked:bg-[hsl(243,100%,62%)] transition-all" />
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all" />
        </label>
        <span
          className={
            isYearly
              ? "text-[hsl(213,96%,18%)] font-medium"
              : "text-[hsl(231,11%,63%)]"
          }
        >
          Yearly
        </span>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="text-[hsl(231,11%,63%)] hover:text-[hsl(213,96%,18%)] focus:outline-none 
                     focus:ring-2 focus:ring-[hsl(243,100%,62%)] rounded"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-[hsl(213,96%,18%)] text-white px-6 py-2 rounded-md hover:opacity-90
                     focus:outline-none focus:ring-2 focus:ring-[hsl(243,100%,62%)]"
        >
          Next Step
        </button>
      </div>
    </>
  );
}
