import { ChangeEvent, useEffect, useMemo, useState } from "react";

type AddValidSuffix<T> = {
  [K in keyof T & string as `${K}Valid`]: string | null;
};

/**
 * Tipo para validar formularios
 */
export interface FormValidations<T> {
  // eslint-disable-next-line no-unused-vars
  [key: string]: [(value: string, formState: T) => boolean, string];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = <T extends Record<string, any>>(
  initialForm: T = {} as T,
  formValidations?: FormValidations<T>
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<AddValidSuffix<T>>(
    {} as AddValidSuffix<T>
  );

  useEffect(() => {
    createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [ initialForm ])
  
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    if (!formValidations) return;

    const formCheckValues = {} as AddValidSuffix<T>;

    for (const formField of Object.keys(formValidations!)) {
      const [fn, errorMessage = "Este campo es requerido."] =
        formValidations[formField];

      const fieldName = `${formField}Valid` as unknown;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formCheckValues[fieldName] = fn(formState[formField], formState)
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    formValidation,
    isFormValid,
  };
};