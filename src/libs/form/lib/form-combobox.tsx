import type { FieldValues } from "react-hook-form";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { FormField, type FormFieldBaseProps, type FormOption } from "./form-field";

export type FormComboboxProps<T extends FieldValues = FieldValues> = FormFieldBaseProps<T> & {
  options: FormOption[];
  placeholder?: string;
  emptyText?: string;
  clearable?: boolean;
};

/** Combobox со значением-строкой (`option.value`) в форме. */
export const FormCombobox = <T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  disabled,
  options,
  placeholder,
  emptyText = "Ничего не найдено",
  clearable = true,
}: FormComboboxProps<T>) => (
  <FormField<T>
    name={name}
    label={label}
    description={description}
    className={className}
    render={({ field, fieldState, id }) => (
      <Combobox
        items={options}
        name={field.name}
        disabled={disabled}
        value={options.find((o) => o.value === field.value) ?? null}
        onValueChange={(option: FormOption | null) => field.onChange(option?.value ?? "")}
        isItemEqualToValue={(a: FormOption, b: FormOption) => a.value === b.value}
      >
        <ComboboxInput id={id} ref={field.ref} onBlur={field.onBlur} placeholder={placeholder} showClear={clearable} aria-invalid={fieldState.invalid} />
        <ComboboxContent>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {(option: FormOption) => (
              <ComboboxItem key={option.value} value={option}>
                {option.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )}
  />
);
