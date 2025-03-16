import { IFormData } from "@/types";
import { PlanType } from "@/types/enums";
import { calculateTotalPrice } from "@/utils/calculateTotal";
import React, { useCallback, useMemo } from "react";
import StepNavigation from "./StepNavigation";

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
  data: IFormData;
  updateBilling: (isYearly: boolean) => void;
}

const Step4: React.FC<IProps> = ({ nextStep, prevStep, data, updateBilling }) => {
  const { step2, step3 } = data;

  const planCost = useMemo(() => {
    if (step2.isYearly) {
      if (step2.selectedPlan === PlanType.Arcade) return "$90/yr";
      if (step2.selectedPlan === PlanType.Advanced) return "$120/yr";
      return "$150/yr";
    } else {
      if (step2.selectedPlan === PlanType.Arcade) return "$9/mo";
      if (step2.selectedPlan === PlanType.Advanced) return "$12/mo";
      return "$15/mo";
    }
  }, [step2.isYearly, step2.selectedPlan]);

  const onlinePrice = useMemo(
    () => (step2.isYearly ? "+$10/yr" : "+$1/mo"),
    [step2.isYearly]
  );
  const storagePrice = useMemo(
    () => (step2.isYearly ? "+$20/yr" : "+$2/mo"),
    [step2.isYearly]
  );
  const profilePrice = useMemo(
    () => (step2.isYearly ? "+$20/yr" : "+$2/mo"),
    [step2.isYearly]
  );

  const numericTotal = useMemo(() => calculateTotalPrice(data), [data]);
  const total = useMemo(
    () => (step2.isYearly ? `$${numericTotal}/yr` : `$${numericTotal}/mo`),
    [step2.isYearly, numericTotal]
  );

  const capitalPlan = useMemo(() => {
    if (!step2.selectedPlan) return "";
    return (
      step2.selectedPlan.charAt(0).toUpperCase() + step2.selectedPlan.slice(1)
    );
  }, [step2.selectedPlan]);

  const selectedAddOns = useMemo(() => {
    const addons = [
      {
        label: "Online service",
        selected: step3.addOns.onlineService,
        price: onlinePrice,
      },
      {
        label: "Larger storage",
        selected: step3.addOns.largerStorage,
        price: storagePrice,
      },
      {
        label: "Customizable profile",
        selected: step3.addOns.customProfile,
        price: profilePrice,
      },
    ];
    return addons.filter((addon) => addon.selected);
  }, [step3.addOns, onlinePrice, storagePrice, profilePrice]);

  const handleChangePlan = useCallback(() => {
    updateBilling(!step2.isYearly);
  }, [step2.isYearly, updateBilling]);

  return (
    <>
      <h2 className="text-2xl font-bold text-marine-blue">Finishing up</h2>
      <p className="text-cool-gray text-sm mb-6">
        Double-check everything looks OK before confirming.
      </p>

      <div className="border border-light-gray rounded-md p-4 mb-6 bg-magnolia min-h-[8rem]">
        <div className="flex items-center justify-between pb-2">
          <div>
            <strong className="text-marine-blue">
              {capitalPlan} ({step2.isYearly ? "Yearly" : "Monthly"})
            </strong>
            <br />
            <button
              onClick={handleChangePlan}
              className="text-purplish-blue text-sm underline mt-1 hover:opacity-80 focus:outline-none"
            >
              Change
            </button>
          </div>
          <div className="font-bold text-marine-blue">{planCost}</div>
        </div>
        <hr className="border-light-gray" />
        {selectedAddOns.length > 0 ? (
          selectedAddOns.map((addon) => (
            <div
              key={addon.label}
              className="flex items-center justify-between my-2"
            >
              <span className="text-marine-blue">{addon.label}</span>
              <span className="text-marine-blue">{addon.price}</span>
            </div>
          ))
        ) : (
          <p className="text-cool-gray text-sm italic mt-4">
            No add-ons selected
          </p>
        )}
      </div>

      <div className="flex items-center justify-between px-4 mb-6">
        <span className="text-cool-gray">
          Total (per {step2.isYearly ? "year" : "month"})
        </span>
        <span className="text-purplish-blue font-bold text-lg">{total}</span>
      </div>

      <StepNavigation onPrev={prevStep} onNext={nextStep} nextLabel="Confirm" />
    </>
  );
};

export default Step4;
