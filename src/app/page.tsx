"use client";
import { useState, useCallback, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import { IFormData, IStep1FormData } from "@/types";
import { PlanType } from "@/types/enums";

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

  const nextStep = useCallback(() => {
    setStep((current) => (current < 5 ? current + 1 : current));
  }, []);

  const prevStep = useCallback(() => {
    setStep((current) => (current > 1 ? current - 1 : current));
  }, []);

  const updateStepData = useCallback((stepKey: keyof IFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: data,
    }));
  }, []);

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <Step1
            nextStep={nextStep}
            data={formData.step1}
            updateData={(data: IStep1FormData) => updateStepData("step1", data)}
          />
        );
      case 2:
        return (
          <Step2
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-magnolia p-4 md:p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg w-full max-w-4xl shadow-lg overflow-hidden">
        <Sidebar currentStep={step} />
        <div className="w-full md:w-2/3 p-6 md:p-8 md:min-h-[620px]">
          {stepContent}
        </div>
      </div>
    </div>
  );
}
