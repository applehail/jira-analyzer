import { z } from "zod";
import { ru } from "zod/locales";
z.config(ru());

// custom errors
const reqMsg = "Поле обязательно для заполнения";
const formatMsg = "Неверный формат";

z.config({
  customError: (issue) => {
    console.log("issue", issue);

    // Discriminate between issue types
    if (issue.code === "invalid_type") {
      return { message: reqMsg };
    }

    if (issue.code === "too_small" && issue.origin === "string" && issue.inclusive) {
      return { message: reqMsg };
    }

    if (issue.code === "invalid_format") {
      if (!issue.input) {
        return { message: reqMsg };
      }
      return { message: formatMsg };
    }

    return { message: issue.message ?? "Неизвестная ошибка" };
  },
});
