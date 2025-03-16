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

  const handleToggleOnline = () => {
    const newValue = !onlineService;
    setOnlineService(newValue);
    updateData({
      addOns: {
        onlineService: newValue,
        largerStorage,
        customProfile,
      },
    });
  };

  const handleToggleStorage = () => {
    const newValue = !largerStorage;
    setLargerStorage(newValue);
    updateData({
      addOns: {
        onlineService,
        largerStorage: newValue,
        customProfile,
      },
    });
  };

  const handleToggleProfile = () => {
    const newValue = !customProfile;
    setCustomProfile(newValue);
    updateData({
      addOns: {
        onlineService,
        largerStorage,
        customProfile: newValue,
      },
    });
  };

  const handleNext = useCallback(() => {
    nextStep();
  }, [nextStep]);

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold text-marine-blue">Pick add-ons</h2>
        <p className="text-cool-gray text-sm mb-6">
          Add-ons help enhance your gaming experience.
        </p>
      </div>

      <div className="flex-grow">
        <div className="space-y-3 mb-6">
          <AddOnCard
            label="Online service"
            description="Access to multiplayer games"
            price={priceOnline}
            checked={onlineService}
            onChange={handleToggleOnline}
          />
          <AddOnCard
            label="Larger storage"
            description="Extra 1TB of cloud save"
            price={priceStorage}
            checked={largerStorage}
            onChange={handleToggleStorage}
          />
          <AddOnCard
            label="Customizable profile"
            description="Custom theme on your profile"
            price={priceProfile}
            checked={customProfile}
            onChange={handleToggleProfile}
          />
        </div>
      </div>

      <div className="mt-auto hidden md:block">
        <StepNavigation
          onPrev={prevStep}
          onNext={handleNext}
          nextLabel="Next Step"
        />
      </div>
    </div>
  );
};

export default Step3;
