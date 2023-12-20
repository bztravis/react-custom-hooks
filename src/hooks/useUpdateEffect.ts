import { useEffect, useRef, useCallback, EffectCallback } from 'react';

export default function useUpdateEffect(
  callback: EffectCallback,
  dependencies: unknown[]
) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
