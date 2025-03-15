import { IFormData } from "@/types";

export function calculateTotalPrice(data: IFormData): number {
  const { selectedPlan, isYearly } = data.step2;
  const { onlineService, largerStorage, customProfile } = data.step3.addOns;

  let baseCost = 0;
  if (selectedPlan === "arcade") {
    baseCost = isYearly ? 90 : 9;
  } else if (selectedPlan === "advanced") {
    baseCost = isYearly ? 120 : 12;
  } else {
    baseCost = isYearly ? 150 : 15;
  }

  const addOnline = onlineService ? (isYearly ? 10 : 1) : 0;
  const addStorage = largerStorage ? (isYearly ? 20 : 2) : 0;
  const addProfile = customProfile ? (isYearly ? 20 : 2) : 0;

  const total = baseCost + addOnline + addStorage + addProfile;
  return total;
}
