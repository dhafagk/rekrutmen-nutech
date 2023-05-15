import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AuthValidation } from "@/validations";
import { Button, Form, Input } from "@/components";
import { useRouter } from "next/router";
import { AuthStore } from "@/stores/auth.store";
import { useAuthRegister } from "@/hooks/useAuth";
import { AuthProps } from "@/types";
import { toast } from "react-hot-toast";
import { shallow } from "zustand/shallow";

type Props = {};

const RegisterPage = (props: Props) => {
  const route = useRouter();
  const [setUserData, setToken] = AuthStore(
    (state) => [state.addUserData, state.addToken],
    shallow
  );
  const { mutate, isLoading, isError } = useAuthRegister();
  const handleSubmit = (values: AuthProps.RegisterVariable) => {
    mutate(values, {
      onSuccess: ({ data }) => {
        setToken(data.data.access_token);
        setUserData(data.data.user);
        toast.success("Login Berhasil!");
        route.replace("/dashboard");
      },
      onError: (error) => {
        toast.error("Login Gagal!");
        console.log(error);
      },
    });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2 !static"
            src="/logo.jpg"
            alt="logo"
            fill
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <Form
              defaultValues={{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={AuthValidation.RegisterSchemaValidation}
            >
              {() => (
                <>
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="admin"
                    isRequired
                  />

                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="admin@admin.com"
                    isRequired
                  />

                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="••••••••"
                    isRequired
                  />

                  <Input
                    type="password"
                    label="Password Confirmation"
                    name="password_confirmation"
                    placeholder="••••••••"
                    isRequired
                  />

                  <Button
                    type="submit"
                    text="Buat Akun"
                    isLoading={isLoading}
                  />

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Sudah punya akun?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-primary-400 hover:underline dark:text-primary-500"
                    >
                      Login
                    </Link>
                  </p>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
