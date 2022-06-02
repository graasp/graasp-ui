import { H5P, H5POptions } from 'h5p-standalone';
import React, { FC, useEffect, useRef } from 'react';

/**
 * Helper to generate unique H5P container IDs
 * (multiple H5Ps can be displayed simultaneously)
 */
export const buildH5PContainerId = (itemId: string) =>
  `h5p-container-${itemId}`;

/**
 * React props types for {@link H5PItem}
 */
interface H5PItemProps {
  itemId: string;
  playerOptions: H5POptions;
}

/**
 * The H5PItem component displays an iframe with the content of an H5P
 *
 * This component bridges the gap between the procedural "h5p-standalone"
 * package and the Graasp React ecosystem
 */
const H5PItem: FC<H5PItemProps> = ({ itemId, playerOptions }) => {
  const h5pContainerEl = useRef(null);

  useEffect(() => {
    if (h5pContainerEl.current) {
      new H5P(h5pContainerEl.current, playerOptions);
    }
  }, [itemId]);

  return <div ref={h5pContainerEl} id={buildH5PContainerId(itemId)}></div>;
};

export default H5PItem;
