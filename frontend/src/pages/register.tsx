import { RegisterPage } from "@/components";
import { UnauthorizedLayout } from "@/layout";
import React from "react";

type Props = {};

const register = (props: Props) => {
  return (
    <UnauthorizedLayout title="Register">
      <RegisterPage />
    </UnauthorizedLayout>
  );
};

export default register;
