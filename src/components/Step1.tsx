"use client";
import React, { useState } from "react";

interface Step1Props {
  nextStep: () => void;
}

export default function Step1({ nextStep }: Step1Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic check
    if (!name || !email || !phone) {
      setError("Please fill all fields.");
      return;
    }
    // Additional checks: email format, phone format, etc.
    nextStep();
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[hsl(213,96%,18%)]">Personal info</h2>
      <p className="text-[hsl(231,11%,63%)] text-sm mb-6">
        Please provide your name, email address, and phone number.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-[hsl(354,84%,57%)]">{error}</p>}

        <div>
          <label className="block text-[hsl(213,96%,18%)] text-sm mb-1">Name</label>
          <input
            type="text"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[hsl(229,24%,87%)] rounded-md
                       focus:outline-none focus:ring-2 focus:ring-[hsl(243,100%,62%)]"
          />
        </div>

        <div>
          <label className="block text-[hsl(213,96%,18%)] text-sm mb-1">Email Address</label>
          <input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[hsl(229,24%,87%)] rounded-md
                       focus:outline-none focus:ring-2 focus:ring-[hsl(243,100%,62%)]"
          />
        </div>

        <div>
          <label className="block text-[hsl(213,96%,18%)] text-sm mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g. +1 234 567 890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-[hsl(229,24%,87%)] rounded-md
                       focus:outline-none focus:ring-2 focus:ring-[hsl(243,100%,62%)]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[hsl(213,96%,18%)] text-white px-6 py-2 rounded-md 
                       hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[hsl(243,100%,62%)]"
          >
            Next Step
          </button>
        </div>
      </form>
    </>
  );
}
