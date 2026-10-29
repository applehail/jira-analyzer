import { type FC, Suspense } from "react";

import { getDelayedFallback } from "./delayed-fallback";
import { getLazyComponent } from "./lazy-component";
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from "./types";

export const loader = (loadComponent: LoadComponent, additionalProps: AnyProps, loaderOptions: LoaderDefaultOptions, FallbackWaiting: FC) => {
  const Fallback = loaderOptions.delay ? getDelayedFallback(FallbackWaiting, loaderOptions.delay) : FallbackWaiting;

  const LazyComponent = getLazyComponent(loadComponent, loaderOptions);

  return function AsyncComponent(props: AnyProps) {
    return (
      <Suspense fallback={<Fallback />}>
        <LazyComponent {...additionalProps} {...props} />
      </Suspense>
    );
  };
};
