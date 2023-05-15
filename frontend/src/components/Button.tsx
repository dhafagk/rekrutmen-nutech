import React from "react";
import { Spinner } from "flowbite-react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type: "button" | "reset" | "submit" | undefined;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  icon,
  onClick,
  isLoading,
}) => {
  const LoadingButton = (
    <button
      className="w-full flex items-center justify-center text-white bg-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      disabled
    >
      <Spinner color="warning" />
      <span className="pl-3">Loading...</span>
    </button>
  );

  return isLoading ? (
    LoadingButton
  ) : (
    <button
      type={type}
      className="w-full flex items-center justify-center text-white bg-primary-400 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
