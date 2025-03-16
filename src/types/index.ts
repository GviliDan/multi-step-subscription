import { StaticImageData } from "next/image";
import { PlanType } from "./enums";

export type IStep1FormData = {
  name: string;
  email: string;
  phone: string;
};

export type IFormData = {
  step1: {
    name: string;
    email: string;
    phone: string;
  };
  step2: Step2Data;
  step3: {
    addOns: IAddOns;
  };
};

export interface Step2Data {
  selectedPlan: PlanType;
  isYearly: boolean;
}

export interface IAddOns {
  onlineService: boolean;
  largerStorage: boolean;
  customProfile: boolean;
}

export interface Step3Data {
  addOns: IAddOns;
}

export interface PlanConfig {
  type: PlanType;
  label: string;
  icon: StaticImageData;
  monthlyPrice: string;
  yearlyPrice: string;
}

export interface Step1Methods {
  submitForm: () => Promise<boolean>;
}

export interface Step2Methods {
  submitPlan: () => Promise<boolean>;
}
