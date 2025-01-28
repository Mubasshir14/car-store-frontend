/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  resetForm?: boolean;
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const CarForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  resetForm = true,
}: TFormProps) => {
  const methods = useForm({
    ...(defaultValues && { defaultValues }),
    ...(resolver && { resolver }),
  });

  const submit = (data: FieldValues) => {
    onSubmit(data);
    if (resetForm) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CarForm;