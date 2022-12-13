import { useState } from 'react';

export type FullscreenHookType = {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};

export const useFullscreen = (): FullscreenHookType => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = (): void => {
    const bodyElem = document.body;
    if (!document.fullscreenElement) {
      bodyElem
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(
            `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
          );
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return { isFullscreen, toggleFullscreen };
};
