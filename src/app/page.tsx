"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";

export default function Home() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4 nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5 />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(217,100%,97%)] p-4 md:p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg w-full max-w-4xl shadow-lg overflow-hidden">
        <Sidebar currentStep={step} />
        <div className="w-full md:w-2/3 p-6 md:p-8">{renderStep()}</div>
      </div>
    </div>
  );
}
