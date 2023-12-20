import { useEffect, EffectCallback } from 'react';
import useTimeout from './useTimeout';

export default function useDebounce(
  callback: EffectCallback,
  delay: number,
  dependencies: unknown[]
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]); // don't run on first mount
}
