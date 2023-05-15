import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services";
import { AuthProps } from "@/types";

const authService = new AuthService();

const useAuthLogin = () => {
  const { mutate, isLoading, isError, error } = useMutation(
    (args: AuthProps.LoginVariable) =>
      authService.login(args.email, args.password)
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
};

const useAuthRegister = () => {
  const { mutate, isLoading, isError, error } = useMutation(
    (args: AuthProps.RegisterVariable) =>
      authService.register(
        args.name,
        args.email,
        args.password,
        args.password_confirmation
      )
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
};

const useAuthLogout = () => {
  const { mutateAsync, isLoading, isError, error } = useMutation((args: any) =>
    authService.logout()
  );

  return {
    mutateAsync,
    isLoading,
    isError,
    error,
  };
};

export { useAuthLogin, useAuthRegister, useAuthLogout };
