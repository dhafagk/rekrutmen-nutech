import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";

interface FormProps {
  children: (methods: UseFormReturn) => React.ReactNode;
  defaultValues: any;
  onSubmit: (values: any, onResetCallback: () => void) => void;
  validationSchema: any;
  reset?: boolean;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  defaultValues,
  children,
  validationSchema,
}) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods.reset))}
        noValidate
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};

export default Form;
