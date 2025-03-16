import { IStep1FormData, Step1Methods } from "@/types";
import { forwardRef, useImperativeHandle } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import FormInput from "./FormInput";
import StepNavigation from "./StepNavigation";

interface IProps {
  nextStep: () => void;
  data: IStep1FormData;
  updateData: (data: IStep1FormData) => void;
}

const Step1 = forwardRef<Step1Methods, IProps>((props, ref) => {
  const { nextStep, data, updateData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<IStep1FormData> = useForm<IStep1FormData>({
    defaultValues: data,
    mode: "onChange",
  });

  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise<boolean>((resolve) => {
        handleSubmit(
          (formValues: IStep1FormData) => {
            updateData(formValues);
            nextStep();
            resolve(true);
          },
          () => {
            resolve(false);
          }
        )();
      }),
  }));

  const onSubmit = (formValues: IStep1FormData) => {
    updateData(formValues);
    nextStep();
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold text-marine-blue">Personal info</h2>
        <p className="text-cool-gray text-sm mb-6">
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-grow">
        <FormInput
          label="Name"
          type="text"
          placeholder="e.g. Stephen King"
          error={errors.name?.message}
          registration={register("name", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        <FormInput
          label="Email Address"
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          error={errors.email?.message}
          registration={register("email", {
            required: "This field is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
        />
        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="e.g. +1 234 567 890"
          error={errors.phone?.message}
          registration={register("phone", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          })}
        />
      </form>

      <div className="mt-auto hidden md:block">
        <StepNavigation
          onPrev={() => {}}
          onNext={handleSubmit(onSubmit)}
          nextLabel="Next Step"
        />
      </div>
    </div>
  );
});

export default Step1;
