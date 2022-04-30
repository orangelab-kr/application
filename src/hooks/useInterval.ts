import {useEffect, useRef} from 'react';

export const useInterval = <T extends () => void>(
  callback: T,
  delay: number,
) => {
  const savedCallback = useRef<T>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (!savedCallback.current) return;
      savedCallback.current();
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
