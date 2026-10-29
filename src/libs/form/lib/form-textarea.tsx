import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormField, type FormFieldBaseProps } from "./form-field";

export type FormTextareaProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> &
  Omit<ComponentProps<typeof Textarea>, "name" | "value" | "defaultValue" | "id" | "className" | "disabled">;

export const FormTextarea = <T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  disabled,
  ...textareaProps
}: FormTextareaProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    render={({ field, fieldState, id }) => (
      <Textarea {...textareaProps} {...field} id={id} value={field.value ?? ""} disabled={disabled} aria-invalid={fieldState.invalid} />
    )}
  />
);
