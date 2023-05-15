import { AuthProps } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthInfoProps {
  userData: AuthProps.UserData | null;
  access_token: string | null;
  addUserData: (userData: AuthProps.UserData) => void;
  addToken: (token: string) => void;
  removeUserData: () => void;
  removeToken: () => void;
}

export const AuthStore = create(
  persist<AuthInfoProps>(
    (set, get) => ({
      userData: null,
      access_token: null,
      addUserData: (userData) =>
        set(() => {
          return { userData };
        }),
      addToken: (token) =>
        set(() => {
          return { access_token: token };
        }),
      removeUserData: () =>
        set(() => {
          return { userData: null };
        }),
      removeToken: () =>
        set(() => {
          return { access_token: null };
        }),
    }),
    {
      name: "AuthStore",
    }
  )
);
