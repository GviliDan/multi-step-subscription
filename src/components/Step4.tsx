"use client";
import React from "react";

interface Step4Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step4({ nextStep, prevStep }: Step4Props) {
  // In real app, read plan/add-ons from context or props
  const planName = "Arcade";
  const isYearly = false;
  const planCost = isYearly ? "$90/yr" : "$9/mo";
  const addons = [
    { name: "Online service", price: isYearly ? "+$10/yr" : "+$1/mo" },
    { name: "Larger storage", price: isYearly ? "+$20/yr" : "+$2/mo" },
  ];
  const total = isYearly ? "$120/yr" : "$12/mo";
  const totalTimeframe = isYearly ? "year" : "month";

  const handleConfirm = () => {
    nextStep();
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[hsl(213,96%,18%)]">
        Finishing up
      </h2>
      <p className="text-[hsl(231,11%,63%)] text-sm mb-6">
        Double-check everything looks OK before confirming.
      </p>

      <div className="border border-[hsl(229,24%,87%)] rounded-md p-4 mb-6 bg-[hsl(217,100%,97%)]">
        <div className="flex items-center justify-between pb-2">
          <div>
            <strong className="text-[hsl(213,96%,18%)]">
              {planName} ({isYearly ? "Yearly" : "Monthly"})
            </strong>
            <br />
            <button className="text-[hsl(243,100%,62%)] text-sm underline mt-1 hover:opacity-80 focus:outline-none">
              Change
            </button>
          </div>
          <div className="font-bold text-[hsl(213,96%,18%)]">{planCost}</div>
        </div>
        <hr className="border-[hsl(229,24%,87%)]" />
        {addons.map((addon) => (
          <div
            className="flex items-center justify-between my-2"
            key={addon.name}
          >
            <span className="text-[hsl(213,96%,18%)]">{addon.name}</span>
            <span className="text-[hsl(213,96%,18%)]">{addon.price}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 mb-6">
        <span className="text-[hsl(231,11%,63%)]">
          Total (per {totalTimeframe})
        </span>
        <span className="text-[hsl(243,100%,62%)] font-bold text-lg">
          {total}
        </span>
      </div>

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
          onClick={handleConfirm}
          className="bg-[hsl(243,100%,62%)] text-white px-6 py-2 rounded-md hover:opacity-90
                     focus:outline-none focus:ring-2 focus:ring-[hsl(243,100%,62%)]"
        >
          Confirm
        </button>
      </div>
    </>
  );
}
