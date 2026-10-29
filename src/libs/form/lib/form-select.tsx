import type { FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, type FormFieldBaseProps, type FormOption } from "./form-field";

export type FormSelectProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> & {
  options: FormOption[];
  placeholder?: string;
};

export const FormSelect = <T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  disabled,
  options,
  placeholder,
}: FormSelectProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    render={({ field, fieldState, id }) => (
      <Select items={options} name={field.name} value={field.value ?? null} onValueChange={field.onChange} disabled={disabled}>
        <SelectTrigger id={id} ref={field.ref} onBlur={field.onBlur} aria-invalid={fieldState.invalid} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  />
);
