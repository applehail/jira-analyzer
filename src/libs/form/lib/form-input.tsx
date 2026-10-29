import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, type FormFieldBaseProps } from "./form-field";

export type FormInputProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> &
  Omit<ComponentProps<typeof Input>, "name" | "value" | "defaultValue" | "id" | "className" | "disabled">;

export const FormInput = <T extends FieldValues = FieldValues>({ name, label, description, className, disabled, ...inputProps }: FormInputProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    render={({ field, fieldState, id }) => (
      <Input {...inputProps} {...field} id={id} value={field.value ?? ""} disabled={disabled} aria-invalid={fieldState.invalid} />
    )}
  />
);
