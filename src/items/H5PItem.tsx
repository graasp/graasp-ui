import React, { FC } from 'react';

/**
 * React props types for {@link H5PItem}
 */
interface H5PItemProps {
  itemId: string;
  contentId: string;
  integrationUrl: string;
}
/**
 * The H5PItem component displays an iframe with the content of an H5P
 *
 * This component bridges the gap between the procedural "h5p-standalone"
 * package and the Graasp React ecosystem
 */
const H5PItem: FC<H5PItemProps> = ({ itemId, contentId, integrationUrl }) => {
  /*
    h5p-standalone (and H5P itself) expect the integration to be done on the
    window global object, which does not allow multiple H5Ps to be loaded
    simultaneously (as they will be competing for the same global object)
    As a workaround, we wrap the H5P integration into an iframe, such that it
    gets its own window object. We can also enable the sandbox attribute for
    additional security
   */
  return (
    <iframe
      id={`h5p-container-${itemId}`}
      src={`${integrationUrl}?content=${encodeURIComponent(contentId)}`}
      scrolling={'no'}
      frameBorder={0}
      style={{ width: '100%', border: 'none', display: 'block' }}
    ></iframe>
  );
};

export default H5PItem;
