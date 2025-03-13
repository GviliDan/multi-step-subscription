"use client";
import React, { useState } from "react";

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3({ nextStep, prevStep }: Step3Props) {
  // For demonstration, isYearly would normally come from global state
  const [isYearly, setIsYearly] = useState(false);
  const [onlineService, setOnlineService] = useState(true);
  const [largerStorage, setLargerStorage] = useState(true);
  const [customProfile, setCustomProfile] = useState(false);

  const handleNext = () => {
    nextStep();
  };

  const priceOnline = isYearly ? "+$10/yr" : "+$1/mo";
  const priceStorage = isYearly ? "+$20/yr" : "+$2/mo";
  const priceProfile = isYearly ? "+$20/yr" : "+$2/mo";

  return (
    <>
      <h2 className="text-2xl font-bold text-[hsl(213,96%,18%)]">Pick add-ons</h2>
      <p className="text-[hsl(231,11%,63%)] text-sm mb-6">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="space-y-3 mb-6">
        {/* Online service */}
        <label
          className={`flex items-center border p-3 rounded-md cursor-pointer
                      hover:border-[hsl(213,96%,18%)] focus-within:ring-2 focus-within:ring-[hsl(243,100%,62%)]
            ${
              onlineService
                ? "border-[hsl(213,96%,18%)] bg-[hsl(217,100%,97%)]"
                : "border-[hsl(229,24%,87%)]"
            }`}
        >
          <input
            type="checkbox"
            checked={onlineService}
            onChange={(e) => setOnlineService(e.target.checked)}
            className="mr-3 accent-[hsl(243,100%,62%)] focus:outline-none"
          />
          <div className="flex flex-col">
            <span className="font-medium text-[hsl(213,96%,18%)]">Online service</span>
            <span className="text-sm text-[hsl(231,11%,63%)]">
              Access to multiplayer games
            </span>
          </div>
          <span className="ml-auto text-[hsl(243,100%,62%)] text-sm">
            {priceOnline}
          </span>
        </label>

        {/* Larger storage */}
        <label
          className={`flex items-center border p-3 rounded-md cursor-pointer
                      hover:border-[hsl(213,96%,18%)] focus-within:ring-2 focus-within:ring-[hsl(243,100%,62%)]
            ${
              largerStorage
                ? "border-[hsl(213,96%,18%)] bg-[hsl(217,100%,97%)]"
                : "border-[hsl(229,24%,87%)]"
            }`}
        >
          <input
            type="checkbox"
            checked={largerStorage}
            onChange={(e) => setLargerStorage(e.target.checked)}
            className="mr-3 accent-[hsl(243,100%,62%)] focus:outline-none"
          />
          <div className="flex flex-col">
            <span className="font-medium text-[hsl(213,96%,18%)]">Larger storage</span>
            <span className="text-sm text-[hsl(231,11%,63%)]">
              Extra 1TB of cloud save
            </span>
          </div>
          <span className="ml-auto text-[hsl(243,100%,62%)] text-sm">
            {priceStorage}
          </span>
        </label>

        {/* Customizable profile */}
        <label
          className={`flex items-center border p-3 rounded-md cursor-pointer
                      hover:border-[hsl(213,96%,18%)] focus-within:ring-2 focus-within:ring-[hsl(243,100%,62%)]
            ${
              customProfile
                ? "border-[hsl(213,96%,18%)] bg-[hsl(217,100%,97%)]"
                : "border-[hsl(229,24%,87%)]"
            }`}
        >
          <input
            type="checkbox"
            checked={customProfile}
            onChange={(e) => setCustomProfile(e.target.checked)}
            className="mr-3 accent-[hsl(243,100%,62%)] focus:outline-none"
          />
          <div className="flex flex-col">
            <span className="font-medium text-[hsl(213,96%,18%)]">Customizable profile</span>
            <span className="text-sm text-[hsl(231,11%,63%)]">
              Custom theme on your profile
            </span>
          </div>
          <span className="ml-auto text-[hsl(243,100%,62%)] text-sm">
            {priceProfile}
          </span>
        </label>
      </div>

      {/* Navigation */}
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
