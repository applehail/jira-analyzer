import { Spinner } from "@/components/ui/spinner";
import { loader } from "./loader-func";
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from "./types";

const options = {
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

export const pageLoader = (
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
  loaderOptions: LoaderDefaultOptions = options,
  FallbackWaiting = Spinner,
) => loader(loadComponent, additionalProps, loaderOptions, FallbackWaiting);
