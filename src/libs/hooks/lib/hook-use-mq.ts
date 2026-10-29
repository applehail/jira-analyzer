import { useMediaQuery } from "usehooks-ts";

export const useMq = () => {
  const isSmall = useMediaQuery("(max-width: 899px)");

  return { isSmall };
};
