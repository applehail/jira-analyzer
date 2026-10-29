import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, type FormFieldBaseProps } from "./form-field";

export type FormFileProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> &
  Omit<ComponentProps<typeof Input>, "name" | "value" | "defaultValue" | "id" | "className" | "disabled" | "type" | "onChange">;

/** Выбор одного файла: значение поля — `File | undefined`. */
export const FormFile = <T extends FieldValues = FieldValues>({ name, label, description, className, disabled, ...inputProps }: FormFileProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    render={({ field, fieldState, id }) => (
      <Input
        {...inputProps}
        type="file"
        id={id}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        onChange={(e) => field.onChange(e.target.files?.[0])}
        disabled={disabled}
        aria-invalid={fieldState.invalid}
      />
    )}
  />
);
