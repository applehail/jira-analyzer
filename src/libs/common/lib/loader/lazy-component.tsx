import { lazy } from 'react';

import { sleep } from '../common';
import type { LoadComponent, LoaderDefaultOptions } from './types';

/**
 * get lazy component
 * @param loadComponent
 * @param loaderOptions
 * @returns
 */
export const getLazyComponent = (
  loadComponent: LoadComponent,
  loaderOptions: LoaderDefaultOptions,
) =>
  lazy(() => {
    // fix the moment of starting loading
    const start = performance.now();
    // start loading
    return loadComponent().then((moduleExports) => {
      // loading is finished
      const end = performance.now();
      const diff = end - start;

      const { delay, minimumLoading } = loaderOptions;

      if (diff < delay || (diff > delay && diff > delay + minimumLoading)) {
        return moduleExports;
      }

      return sleep(delay + minimumLoading - diff).then(() => moduleExports);
    });
  });
