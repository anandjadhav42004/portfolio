import { useState, useEffect } from 'react';

/**
 * Checks if the current viewport is a desktop device:
 * screen width >= 768px AND using a precision pointer (mouse/trackpad), not touch.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    
    // Set initial value
    setIsDesktop(mediaQuery.matches);

    // Event listener for viewport changes / device emulation
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return isDesktop;
}

export default useIsDesktop;

