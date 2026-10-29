import { useMediaQuery } from "usehooks-ts";

export const useMq = () => {
  const isSmall = useMediaQuery("(max-width: 899px)");

  // меньше брейкпоинта tailwind `sm` (640px)
  const isMobile = useMediaQuery("(max-width: 639px)");

  return { isSmall, isMobile };
};
