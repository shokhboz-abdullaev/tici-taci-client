import { useEffect, useRef } from 'react';

const useUnload = (fn: (e: BeforeUnloadEvent) => void) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

export default useUnload;