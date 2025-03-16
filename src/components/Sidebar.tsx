import Image from "next/image";
import mobileBg from "@/assets/images/bg-sidebar-mobile.svg";
import desktopBg from "@/assets/images/bg-sidebar-desktop.svg";
import { SLIDE_BAR_STEPS } from "@/constants";

interface IProps {
  currentStep: number;
}

const Sidebar: React.FC<IProps> = ({ currentStep }) => {
  return (
    <div className="relative w-full md:w-1/3 h-44 md:h-auto text-white">
      <div className="absolute inset-0 md:hidden">
        <Image
          src={mobileBg}
          alt="Sidebar Mobile"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={desktopBg}
          alt="Sidebar Desktop"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 md:h-full md:mt-0 mt-4 flex flex-row md:flex-col md:items-center md:items-start justify-center md:justify-start p-4 md:p-8">
        {SLIDE_BAR_STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const active = currentStep === stepNumber;

          return (
            <div
              key={label}
              className={`flex items-center mb-0 md:mb-6 mx-2 md:mx-0 ${
                active ? "font-bold" : "opacity-75"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center border-2 rounded-full ${
                  active
                    ? "bg-white text-purplish-blue border-white"
                    : "border-light-gray"
                }`}
              >
                {stepNumber}
              </div>

              <div className="hidden md:flex flex-col text-xs uppercase tracking-wider ml-2">
                <span className="text-[0.65rem]">Step {stepNumber}</span>
                <strong className="text-sm">{label}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;