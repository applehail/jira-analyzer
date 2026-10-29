import type { ReactNode } from "react";
import { FormProvider, useForm, type DefaultValues, type FieldValues, type Resolver, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { cn } from "cn";

export type FormSchema = z.ZodType<FieldValues, FieldValues>;

type FormApi<TSchema extends FormSchema> = UseFormReturn<z.input<TSchema>, unknown, z.output<TSchema>>;

export type FormProps<TSchema extends FormSchema> = {
  schema: TSchema;
  defaultValues?: DefaultValues<z.input<TSchema>>;
  onSubmit: (values: z.output<TSchema>, form: FormApi<TSchema>) => void | Promise<void>;
  /** Содержимое формы или render-функция с доступом к методам react-hook-form */
  children: ReactNode | ((form: FormApi<TSchema>) => ReactNode);
  mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
  className?: string;
};

/** Базовая форма: zod-схема + react-hook-form, контекст для Form* инпутов. */
export const Form = <TSchema extends FormSchema>({ schema, defaultValues, onSubmit, children, mode = "onSubmit", className }: FormProps<TSchema>) => {
  const form = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    // zodResolver не выводит дженерики из обобщённой схемы — приводим тип вручную
    resolver: zodResolver(schema) as unknown as Resolver<z.input<TSchema>, unknown, z.output<TSchema>>,
    defaultValues,
    mode,
  });

  return (
    <FormProvider {...form}>
      <form noValidate className={cn("flex flex-col gap-5", className)} onSubmit={form.handleSubmit((values) => onSubmit(values, form))}>
        {typeof children === "function" ? children(form) : children}
      </form>
    </FormProvider>
  );
};
