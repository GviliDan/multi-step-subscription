import React from "react";

interface IProps {
  label: string;
  description: string;
  price: string;
  checked: boolean;
  onChange: () => void;
}

const AddOnCard: React.FC<IProps> = ({
  label,
  description,
  price,
  checked,
  onChange,
}) => {
  return (
    <label
      className={`flex items-center border p-3 rounded-md cursor-pointer hover:border-marine-blue focus-within:ring-2 focus-within:ring-purplish-blue ${
        checked ? "border-marine-blue bg-magnolia" : "border-light-gray"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-3 accent-purplish-blue"
      />
      <div className="flex flex-col">
        <span className="font-medium text-marine-blue">{label}</span>
        <span className="text-sm text-cool-gray">{description}</span>
      </div>
      <span className="ml-auto text-purplish-blue text-sm">{price}</span>
    </label>
  );
};

export default AddOnCard;
