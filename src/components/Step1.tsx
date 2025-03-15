"use client";
import { IStep1FormData } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";

interface IProps {
  nextStep: () => void;
  data: IStep1FormData;
  updateData: (data: IStep1FormData) => void;
}

const Step1: React.FC<IProps> = ({ nextStep, data, updateData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStep1FormData>({
    defaultValues: data,
  });

  const onSubmit = (formValues: IStep1FormData) => {
    updateData(formValues);
    nextStep();
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-marine-blue">Personal info</h2>
      <p className="text-cool-gray text-sm mb-6">
        Please provide your name, email address, and phone number.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-marine-blue text-sm mb-1">
            Name
            {errors.name && (
              <span className="text-strawberry-red ml-2 text-xs">
                {errors.name.message}
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="e.g. Stephen King"
            {...register("name", {
              required: "This field is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            className={`w-full px-4 py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-purplish-blue 
              ${errors.name ? "border-strawberry-red" : "border-light-gray hover:border-marine-blue"}`}
          />
        </div>

        <div>
          <label className="block text-marine-blue text-sm mb-1">
            Email Address
            {errors.email && (
              <span className="text-strawberry-red ml-2 text-xs">
                {errors.email.message}
              </span>
            )}
          </label>
          <input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            {...register("email", {
              required: "This field is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className={`w-full px-4 py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-purplish-blue 
              ${errors.email ? "border-strawberry-red" : "border-light-gray hover:border-marine-blue"}`}
          />
        </div>

        <div>
          <label className="block text-marine-blue text-sm mb-1">
            Phone Number
            {errors.phone && (
              <span className="text-strawberry-red ml-2 text-xs">
                {errors.phone.message}
              </span>
            )}
          </label>
          <input
            type="tel"
            placeholder="e.g. +1 234 567 890"
            {...register("phone", {
              required: "This field is required",
              minLength: { value: 10, message: "Phone number must be at least 10 digits" },
            })}
            className={`w-full px-4 py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-purplish-blue 
              ${errors.phone ? "border-strawberry-red" : "border-light-gray hover:border-marine-blue"}`}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-marine-blue text-white px-6 py-2 rounded-md hover:opacity-90 
              focus:outline-none focus:ring-2 focus:ring-purplish-blue"
          >
            Next Step
          </button>
        </div>
      </form>
    </>
  );
};

export default Step1;
