import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  placeholder,
  isRequired,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorStyle =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

  const defaultSyle =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-400 focus:border-primary-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium dark:text-white ${
          errors[name] ? "text-red-700" : "text-gray-900"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={errors[name] ? errorStyle : defaultSyle}
        placeholder={placeholder}
        required={isRequired}
        {...register(name)}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Input;
