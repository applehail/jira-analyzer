import { useEffect } from 'react';

export const useOutsideClicker = (ref: any, action: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [action, ref]);
};
