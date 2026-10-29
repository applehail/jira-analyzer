import { useId } from "react";
import type { FieldValues } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField, type FormFieldBaseProps, type FormOption } from "./form-field";

export type FormRadioGroupProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> & {
  options: FormOption[];
  orientation?: "vertical" | "horizontal";
};

export const FormRadioGroup = <T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  disabled,
  options,
  orientation = "vertical",
}: FormRadioGroupProps<T>) => {
  const groupId = useId();

  return (
    <FormField<T>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field, fieldState, id }) => (
        <RadioGroup
          aria-labelledby={id}
          name={field.name}
          ref={field.ref}
          value={field.value ?? ""}
          onValueChange={field.onChange}
          disabled={disabled}
          className={orientation === "horizontal" ? "flex flex-row flex-wrap gap-4" : undefined}
        >
          {options.map((option) => (
            <Field key={option.value} orientation="horizontal" className="w-auto">
              <RadioGroupItem
                id={`${groupId}-${option.value}`}
                value={option.value}
                disabled={option.disabled}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor={`${groupId}-${option.value}`} className="font-normal">
                {option.label}
              </FieldLabel>
            </Field>
          ))}
        </RadioGroup>
      )}
    />
  );
};
