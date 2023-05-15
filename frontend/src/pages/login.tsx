import { LoginPage } from "@/components";
import { UnauthorizedLayout } from "@/layout";
import React from "react";

type Props = {};

const login = (props: Props) => {
  return (
    <UnauthorizedLayout title="Login">
      <LoginPage />
    </UnauthorizedLayout>
  );
};

export default login;
