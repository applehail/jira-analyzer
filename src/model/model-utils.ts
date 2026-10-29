import { z } from "zod";
import { Dayjs } from "dayjs";

export const commonValidation = {
  price: z
    .union([z.string(), z.number()])
    .refine((data) => !isNaN(Number(data)), "Не число")
    .transform(Number)
    .refine((num) => num >= 0, "Положительное число"),
  stringReq: z.string().min(1, "Поле обязательно для заполнения"),
  id: z.string().refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value"),
  idNumber: z.number().refine((num) => num > 0, "Положительное число"),
  datetime: z
    .custom<Dayjs>()
    // Проверка на пустое значение
    .refine((val) => val !== null, {
      message: "Поле обязательно для заполнения",
    })
    // Проверка на валидность (неполный ввод, несуществующая дата)
    .refine((val) => val === null || val.isValid(), {
      message: "Неверный формат",
    }),
  phone: z
    .string()
    .transform((val) => {
      const out = val.replace(/[^\d+]/g, "");
      // console.log("out", out);
      return out;
    })
    .refine((val) => (val.length === 11 && ["7", "8"].includes(val[0])) || (val.length === 12 && ["7", "8"].includes(val[1])), {
      message: "Некорректный номер телефона",
    }),
};

export const NumberToString = z.codec(z.number(), z.string(), {
  decode: (num) => num.toString(),
  encode: (str) => Number.parseFloat(str),
});
