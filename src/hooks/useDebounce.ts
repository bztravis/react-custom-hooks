// import { useEffect, EffectCallback } from 'react';
// import useTimeout from './useTimeout';

// export default function useDebounce(
//   callback: EffectCallback,
//   delay: number,
//   dependencies: unknown[]
// ) {
//   const { reset, clear } = useTimeout(callback, delay);

//   useEffect(reset, [...dependencies, reset]);
//   useEffect(clear, [clear]); // don't run on first mount
// }

import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return { debouncedValue, setInstantly: setDebouncedValue };
};

export default useDebounce;
