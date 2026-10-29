import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { FormField, type FormFieldBaseProps } from "./form-field";

export type FormSwitchProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> & {
  size?: ComponentProps<typeof Switch>["size"];
};

export const FormSwitch = <T extends FieldValues = FieldValues>({ name, label, description, className, disabled, size }: FormSwitchProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    orientation="horizontal"
    render={({ field, fieldState, id }) => (
      <Switch
        id={id}
        name={field.name}
        ref={field.ref}
        size={size}
        checked={!!field.value}
        onCheckedChange={field.onChange}
        onBlur={field.onBlur}
        disabled={disabled}
        aria-invalid={fieldState.invalid}
      />
    )}
  />
);
