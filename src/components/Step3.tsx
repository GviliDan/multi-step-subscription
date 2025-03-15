"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Step3Data } from "@/types";

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
  isYearly: boolean;
  data: Step3Data;
  updateData: (data: Step3Data) => void;
}

const Step3: React.FC<IProps> = ({
  nextStep,
  prevStep,
  isYearly,
  data,
  updateData,
}) => {
  const [onlineService, setOnlineService] = useState(data.addOns.onlineService);
  const [largerStorage, setLargerStorage] = useState(data.addOns.largerStorage);
  const [customProfile, setCustomProfile] = useState(data.addOns.customProfile);

  const priceOnline = isYearly ? "+$10/yr" : "+$1/mo";
  const priceStorage = isYearly ? "+$20/yr" : "+$2/mo";
  const priceProfile = isYearly ? "+$20/yr" : "+$2/mo";

  const handleNext = useCallback(() => {
    updateData({
      addOns: {
        onlineService,
        largerStorage,
        customProfile,
      },
    });
    nextStep();
  }, [onlineService, largerStorage, customProfile, nextStep, updateData]);

  const addOnCards = useMemo(() => {
    return (
      <div className="space-y-3 mb-6">
        <label
          className={`flex items-center border p-3 rounded-md cursor-pointer
            hover:border-marine-blue focus-within:ring-2 focus-within:ring-purplish-blue
            ${
              onlineService
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray"
            }`}
        >
          <input
            type="checkbox"
            checked={onlineService}
            onChange={() => setOnlineService((prev) => !prev)}
            className="mr-3 accent-purplish-blue"
          />
          <div className="flex flex-col">
            <span className="font-medium text-marine-blue">Online service</span>
            <span className="text-sm text-cool-gray">
              Access to multiplayer games
            </span>
          </div>
          <span className="ml-auto text-purplish-blue text-sm">
            {priceOnline}
          </span>
        </label>

        <label
          className={`flex items-center border p-3 rounded-md cursor-pointer
            hover:border-marine-blue focus-within:ring-2 focus-within:ring-purplish-blue
            ${
              largerStorage
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray"
            }`}
        >
          <input
            type="checkbox"
            checked={largerStorage}
            onChange={() => setLargerStorage((prev) => !prev)}
            className="mr-3 accent-purplish-blue"
          />
          <div className="flex flex-col">
            <span className="font-medium text-marine-blue">Larger storage</span>
            <span className="text-sm text-cool-gray">
              Extra 1TB of cloud save
            </span>
          </div>
          <span className="ml-auto text-purplish-blue text-sm">
            {priceStorage}
          </span>
        </label>

        <label
          className={`flex items-center border p-3 rounded-md cursor-pointer
            hover:border-marine-blue focus-within:ring-2 focus-within:ring-purplish-blue
            ${
              customProfile
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray"
            }`}
        >
          <input
            type="checkbox"
            checked={customProfile}
            onChange={() => setCustomProfile((prev) => !prev)}
            className="mr-3 accent-purplish-blue"
          />
          <div className="flex flex-col">
            <span className="font-medium text-marine-blue">
              Customizable profile
            </span>
            <span className="text-sm text-cool-gray">
              Custom theme on your profile
            </span>
          </div>
          <span className="ml-auto text-purplish-blue text-sm">
            {priceProfile}
          </span>
        </label>
      </div>
    );
  }, [
    onlineService,
    largerStorage,
    customProfile,
    priceOnline,
    priceStorage,
    priceProfile,
  ]);

  return (
    <>
      <h2 className="text-2xl font-bold text-marine-blue">Pick add-ons</h2>
      <p className="text-cool-gray text-sm mb-6">
        Add-ons help enhance your gaming experience.
      </p>

      {addOnCards}

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
          className="bg-marine-blue text-white px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purplish-blue"
        >
          Next Step
        </button>
      </div>
    </>
  );
};

export default Step3;
