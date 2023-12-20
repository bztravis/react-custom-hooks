import { useCallback, useEffect, useRef, EffectCallback } from 'react';

export default function useTimeout(callback: EffectCallback, delay: number) {
  // must be refs to avoid triggering a redefinition of set and clear on every render, would be dependencies of their useCallback definitions
  const callBackRef = useRef(callback);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    callBackRef.current = callback;
  }, [callback]);

  // set and clear must be defined with useCallback to avoid a invoking the callback param on every render of the component using the hook
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callBackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
