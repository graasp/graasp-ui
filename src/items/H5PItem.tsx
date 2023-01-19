import * as uuid from 'uuid';

import React, { FC, useEffect, useRef } from 'react';

/**
 * React props types for {@link H5PItem}
 */
interface H5PItemProps {
  itemId: string;
  contentId: string;
  integrationUrl: string;
  iframeId?: string;
}
/**
 * The H5PItem component displays an iframe with the content of an H5P
 *
 * This component bridges the gap between the procedural "h5p-standalone"
 * package and the Graasp React ecosystem
 */
const H5PItem: FC<H5PItemProps> = ({
  itemId,
  contentId,
  integrationUrl: integrationBase,
  iframeId = `h5p-container-${itemId}`,
}) => {
  /*
    h5p-standalone (and H5P itself) expect the integration to be done on the
    window global object, which does not allow multiple H5Ps to be loaded
    simultaneously (as they will be competing for the same global object)
    As a workaround, we wrap the H5P integration into an iframe, such that it
    gets its own window object. We can also enable the sandbox attribute for
    additional security
   */

  const integrationUrl = new URL(integrationBase);
  integrationUrl.searchParams.set('content', encodeURIComponent(contentId));

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for content height changes
  useEffect(() => {
    const onResize = (event: MessageEvent): void => {
      // iframe must be mounted
      if (iframeRef.current === null) {
        return;
      }
      // message origin must be same window
      if (event.origin !== integrationUrl.origin) {
        return;
      }
      // message source must be iframe of this H5P integration
      if (event.source !== iframeRef.current.contentWindow) {
        return;
      }
      // message data should be object
      if (!event.data || typeof event.data !== 'object') {
        return;
      }
      // message should have fields contentId and height
      if (!event.data.contentId || !event.data.height) {
        return;
      }
      // contentId should be UUID string
      if (
        typeof event.data.contentId !== 'string' ||
        uuid.version(event.data.contentId) !== 4 ||
        !uuid.validate(event.data.contentId)
      ) {
        return;
      }
      // contentId should match current item
      if (event.data.contentId !== contentId) {
        return;
      }
      // height should be number
      if (typeof event.data.height !== 'number') {
        return;
      }
      // height should be int
      const newHeight = parseInt(event.data.height);
      iframeRef.current.height = newHeight.toString();
    };

    window.addEventListener('message', onResize);
    // cleanup on unmount
    return () => window.removeEventListener('message', onResize);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id={iframeId}
      src={integrationUrl.href}
      scrolling={'no'}
      frameBorder={0}
      style={{ width: '100%', border: 'none', display: 'block' }}
    ></iframe>
  );
};

export default H5PItem;
