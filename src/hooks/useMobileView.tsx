import { useEffect, useState } from 'react';

export type MobileViewType = {
  isMobile: boolean;
};
export const useMobileView = (): MobileViewType => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = (): void => {
    if (window.innerWidth > 600) {
      setIsMobile(false);
    } else if (window.innerWidth < 600) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};
