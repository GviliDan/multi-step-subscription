"use client";
import React from "react";
import Image from "next/image";
import thankYouIcon from "@/assets/images/icon-thank-you.svg";

const Step5: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
      <Image src={thankYouIcon} alt="Thank You" width={64} height={64} />
      <h2 className="text-2xl font-bold text-marine-blue">Thank you!</h2>
      <p className="text-cool-gray max-w-md">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        <br />
        <a
          href="mailto:support@loremgaming.com"
          className="text-purplish-blue hover:opacity-80 focus:outline-none"
        >
          support@loremgaming.com
        </a>.
      </p>
    </div>
  );
};

export default Step5;
