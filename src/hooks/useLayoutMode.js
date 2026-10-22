import { useState, useEffect } from 'react';

export function useLayoutMode() {
  const [layoutMode, setLayoutMode] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
  });

  useEffect(() => {
    function handleResize() {
      const mode = window.innerWidth < 768 ? 'mobile' : 'desktop';
      setLayoutMode(mode);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return layoutMode;
}

export default useLayoutMode;
