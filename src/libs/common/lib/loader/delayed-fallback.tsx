import { type FC, useEffect, useState } from 'react';
import type { AnyProps } from './types';

/**
 * get delayed fallback
 * @param Fallback
 * @param delay
 * @returns
 */
export const getDelayedFallback = (Fallback: FC, delay: number) => {
  return (props: AnyProps) => {
    const [isDelayPassed, setIsDelayPassed] = useState(false);

    useEffect(() => {
      const timerId = setTimeout(() => setIsDelayPassed(true), delay);

      return () => clearTimeout(timerId);
    }, []);

    if (!isDelayPassed) {
      return null;
    }
    return <Fallback {...props} />;
  };
};
