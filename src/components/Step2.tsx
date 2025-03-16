import advancedIcon from "@/assets/images/icon-advanced.svg";
import arcadeIcon from "@/assets/images/icon-arcade.svg";
import proIcon from "@/assets/images/icon-pro.svg";
import { PlanConfig, Step2Data, Step2Methods } from "@/types";
import { PlanType } from "@/types/enums";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import PlanCard from "./PlanCard";
import StepNavigation from "./StepNavigation";

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
  data: Step2Data;
  updateData: (data: Step2Data) => void;
}

const Step2 = forwardRef<Step2Methods, IProps>((props, ref) => {
  const { nextStep, prevStep, data, updateData } = props;

  const plans: PlanConfig[] = [
    {
      type: PlanType.Arcade,
      label: "Arcade",
      icon: arcadeIcon,
      monthlyPrice: "$9/mo",
      yearlyPrice: "$90/yr",
    },
    {
      type: PlanType.Advanced,
      label: "Advanced",
      icon: advancedIcon,
      monthlyPrice: "$12/mo",
      yearlyPrice: "$120/yr",
    },
    {
      type: PlanType.Pro,
      label: "Pro",
      icon: proIcon,
      monthlyPrice: "$15/mo",
      yearlyPrice: "$150/yr",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState<PlanType>(data.selectedPlan);
  const [isYearly, setIsYearly] = useState<boolean>(data.isYearly);
  const [error, setError] = useState<string>("");

  const handleSelectPlan = (planType: PlanType) => {
    setSelectedPlan(planType);
    updateData({ selectedPlan: planType, isYearly });
  };

  const planCards = useMemo(() => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.type}
            plan={plan}
            isSelected={selectedPlan === plan.type}
            isYearly={isYearly}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>
    );
  }, [selectedPlan, isYearly]);

  const handleNext = useCallback((): boolean => {
    if (selectedPlan === PlanType.None) {
      setError("Please select a plan.");
      return false;
    }
    setError("");
    updateData({ selectedPlan, isYearly });

    return true;
  }, [selectedPlan, isYearly, updateData]);

  useImperativeHandle(ref, () => ({
    submitPlan: () =>
      new Promise<boolean>((resolve) => {
        const result = handleNext();
        resolve(result);
      }),
  }));

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-marine-blue">Select your plan</h2>
      <p className="text-cool-gray text-sm mb-6">
        You have the option of monthly or yearly billing.
      </p>

      {planCards}

      {error && <p className="text-strawberry-red mb-4 text-sm">{error}</p>}

      <div className="bg-magnolia p-3 rounded-md flex items-center justify-center space-x-4 md:mb-6">
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

      <div className="mt-auto hidden md:block">
        <StepNavigation
          onPrev={prevStep}
          onNext={() => {
            if (handleNext()) {
              nextStep();
            }
          }}
          nextDisabled={selectedPlan === PlanType.None}
        />
      </div>
    </div>
  );
});

export default Step2;
