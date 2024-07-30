import { useEffect, useState } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (document) {
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
    }
  };
  // listen to fullscreen changes happening when pressing "ESC" etc ...
  useEffect(() => {
    const fullScreenChangeHandler = () => {
      if (!document.fullscreenElement) {
        // exits fullScreen
        setIsFullscreen(false);
      } else {
        // enters fullScreen
        setIsFullscreen(true);
      }
    };
    window.addEventListener('fullscreenchange', fullScreenChangeHandler);
    return () =>
      window.removeEventListener('fullscreenchange', fullScreenChangeHandler);
  }, []);
  return { isFullscreen, toggleFullscreen };
};
