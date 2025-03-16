import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

const FormInput: React.FC<IProps> = ({
  label,
  type,
  placeholder,
  error,
  registration,
}) => {
  return (
    <div>
      <label className="block text-marine-blue text-sm mb-1">
        {label}
        {error && (
          <span className="text-strawberry-red ml-2 text-xs">{error}</span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...registration}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purplish-blue 
          ${error ? "border-strawberry-red" : "border-light-gray hover:border-marine-blue"}`}
      />
    </div>
  );
};

export default FormInput;
