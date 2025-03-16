import { Step3Data } from "@/types";
import React, { useCallback, useState } from "react";
import AddOnCard from "./AddOnCard";
import StepNavigation from "./StepNavigation";

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

  return (
    <>
      <h2 className="text-2xl font-bold text-marine-blue">Pick add-ons</h2>
      <p className="text-cool-gray text-sm mb-6">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="space-y-3 mb-6">
        <AddOnCard
          label="Online service"
          description="Access to multiplayer games"
          price={priceOnline}
          checked={onlineService}
          onChange={() => setOnlineService((prev) => !prev)}
        />
        <AddOnCard
          label="Larger storage"
          description="Extra 1TB of cloud save"
          price={priceStorage}
          checked={largerStorage}
          onChange={() => setLargerStorage((prev) => !prev)}
        />
        <AddOnCard
          label="Customizable profile"
          description="Custom theme on your profile"
          price={priceProfile}
          checked={customProfile}
          onChange={() => setCustomProfile((prev) => !prev)}
        />
      </div>

      <StepNavigation
        onPrev={prevStep}
        onNext={handleNext}
        nextLabel="Next Step"
      />
    </>
  );
};

export default Step3;
