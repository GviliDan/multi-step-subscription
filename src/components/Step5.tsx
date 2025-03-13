"use client";
import React from "react";
import thankYouIcon from "@/assets/images/icon-thank-you.svg";

export default function Step5() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
      <img src={thankYouIcon.src} alt="Thank You" className="w-16 h-16" />
      <h2 className="text-2xl font-bold text-[hsl(213,96%,18%)]">Thank you!</h2>
      <p className="text-[hsl(231,11%,63%)] max-w-md">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        <br />
        <a
          href="mailto:support@loremgaming.com"
          className="text-[hsl(243,100%,62%)] hover:opacity-80 focus:outline-none"
        >
          support@loremgaming.com
        </a>.
      </p>
    </div>
  );
}
