import type { FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, type FormFieldBaseProps } from "./form-field";

export type FormCheckboxProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T>;

export const FormCheckbox = <T extends FieldValues = FieldValues>({ name, label, description, className, disabled }: FormCheckboxProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    orientation="horizontal"
    render={({ field, fieldState, id }) => (
      <Checkbox
        id={id}
        name={field.name}
        ref={field.ref}
        checked={!!field.value}
        onCheckedChange={field.onChange}
        onBlur={field.onBlur}
        disabled={disabled}
        aria-invalid={fieldState.invalid}
      />
    )}
  />
);
