import * as yup from "yup";

const LoginSchemaValidation = yup
  .object()
  .shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters long"),
  })
  .required();

const RegisterSchemaValidation = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters long"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

export { LoginSchemaValidation, RegisterSchemaValidation };
