"use client";
import Sidebar from "@/components/Sidebar";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import StepNavigation from "@/components/StepNavigation";
import { IFormData, IStep1FormData, Step1Methods, Step2Methods } from "@/types";
import { PlanType } from "@/types/enums";
import { useCallback, useMemo, useRef, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IFormData>({
    step1: { name: "", email: "", phone: "" },
    step2: { selectedPlan: PlanType.None, isYearly: false },
    step3: {
      addOns: {
        onlineService: false,
        largerStorage: false,
        customProfile: false,
      },
    },
  });

  const step1Ref = useRef<Step1Methods>(null);
  const step2Ref = useRef<Step2Methods>(null);

  const nextStep = useCallback(() => {
    setStep((current) => (current < 5 ? current + 1 : current));
  }, []);

  const prevStep = useCallback(() => {
    setStep((current) => (current > 1 ? current - 1 : current));
  }, []);

  const updateStepData = useCallback(
    <K extends keyof IFormData>(stepKey: K, data: IFormData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [stepKey]: data,
      }));
    },
    []
  );

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <Step1
            ref={step1Ref}
            nextStep={nextStep}
            data={formData.step1}
            updateData={(data: IStep1FormData) => updateStepData("step1", data)}
          />
        );
      case 2:
        return (
          <Step2
            ref={step2Ref}
            nextStep={nextStep}
            prevStep={prevStep}
            data={formData.step2}
            updateData={(data) => updateStepData("step2", data)}
          />
        );
      case 3:
        return (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            data={formData.step3}
            updateData={(data) => updateStepData("step3", data)}
            isYearly={formData.step2.isYearly}
          />
        );
      case 4:
        return (
          <Step4
            nextStep={nextStep}
            prevStep={prevStep}
            data={formData}
            updateBilling={(isYearly) =>
              updateStepData("step2", { ...formData.step2, isYearly })
            }
          />
        );
      case 5:
        return <Step5 />;
      default:
        return null;
    }
  }, [step, formData, nextStep, prevStep, updateStepData]);

  const handleGlobalNext = async () => {
    if (step === 1 && step1Ref.current) {
      const isValid = await step1Ref.current.submitForm();
      if (!isValid) return;

      return;
    }
    if (step === 2 && step2Ref.current) {
      const isValid = await step2Ref.current.submitPlan();
      if (!isValid) return;
    }

    nextStep();
  };

  const nextDisabled =
    step === 2 && formData.step2.selectedPlan === PlanType.None;

  const nextLabel = step === 4 ? "Confirm" : "Next Step";
  const prevLabel = step === 1 ? "" : "Go Back";

  return (
    <div className="flex min-h-screen md:items-center justify-center bg-magnolia md:p-6">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg overflow-hidden md:rounded-lg items-center md:items-stretch md:bg-white md:p-6">
        <Sidebar currentStep={step} />
        <div
          className="
            bg-white
            w-[90vw] md:w-2/3
            p-6 md:p-8
            md:min-h-[620px]
            -mt-[90px] md:mt-0
            z-10
            rounded-xl md:rounded-none
          "
        >
          {stepContent}
        </div>
      </div>

      {step < 5 && (
        <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white">
          <StepNavigation
            onPrev={prevStep}
            onNext={handleGlobalNext}
            nextDisabled={nextDisabled}
            nextLabel={nextLabel}
            prevLabel={prevLabel}
          />
        </div>
      )}
    </div>
  );
}
