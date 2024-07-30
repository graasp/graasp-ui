import { validate, version } from 'uuid';

import { useEffect, useRef } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

import withCollapse from '../Collapse/withCollapse.js';

/**
 * The H5PItem component displays an iframe with the content of an H5P
 *
 * This component bridges the gap between the procedural "h5p-standalone"
 * package and the Graasp React ecosystem
 */
const H5PItem = ({
  itemName,
  itemId,
  contentId,
  integrationUrl: integrationBase,
  iframeId = `h5p-container-${itemId}`,
  showCollapse = false,
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
  const iframeRef = useRef(null);
  // Listen for content height changes
  useEffect(() => {
    const onResize = (event) => {
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
        version(event.data.contentId) !== 4 ||
        !validate(event.data.contentId)
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
    return () => {
      window.removeEventListener('message', onResize);
    };
  }, []);
  let iframeH5Pitem = _jsx('iframe', {
    ref: iframeRef,
    id: iframeId,
    src: integrationUrl.href,
    allowFullScreen: true,
    scrolling: 'no',
    style: {
      width: '100%',
      border: 'none',
      display: 'block',
    },
  });
  if (showCollapse) {
    iframeH5Pitem = withCollapse({ item: { name: itemName } })(iframeH5Pitem);
  }
  return iframeH5Pitem;
};
export default H5PItem;
