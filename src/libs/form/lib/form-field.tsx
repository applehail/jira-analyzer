import { useId, type ReactNode } from "react";
import { Controller, useFormContext, type ControllerFieldState, type ControllerRenderProps, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";

export type FormOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

/** Общие props всех Form* инпутов. Для типобезопасного `name` указывайте тип формы: `<FormInput<MyForm> name="..." />`. */
export type FormFieldBaseProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  disabled?: boolean;
};

type FormFieldProps<TFieldValues extends FieldValues> = FormFieldBaseProps<TFieldValues> & {
  /** horizontal — для checkbox/switch: контрол слева, подпись справа */
  orientation?: "vertical" | "horizontal";
  render: (ctx: { field: ControllerRenderProps<TFieldValues>; fieldState: ControllerFieldState; id: string }) => ReactNode;
};

/** Обёртка Controller + Field/FieldLabel/FieldDescription/FieldError. На ней построены все Form* компоненты. */
export const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  orientation = "vertical",
  render,
}: FormFieldProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null;
        const content = render({ field, fieldState, id });

        if (orientation === "horizontal") {
          return (
            <Field orientation="horizontal" data-invalid={fieldState.invalid} className={className}>
              {content}
              <div data-slot="field-content" className="flex flex-1 flex-col gap-0.5 leading-snug">
                {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
                {description && <FieldDescription>{description}</FieldDescription>}
                {error}
              </div>
            </Field>
          );
        }

        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            {content}
            {description && <FieldDescription>{description}</FieldDescription>}
            {error}
          </Field>
        );
      }}
    />
  );
};
