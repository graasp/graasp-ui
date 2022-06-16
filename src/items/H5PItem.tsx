import { H5POptions } from 'h5p-standalone';
import React from 'react';
import { FC } from 'react';

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
  h5pAssetsHost: string;
  playerOptions: H5POptions;
}

/**
 * The H5PItem component displays an iframe with the content of an H5P
 *
 * This component bridges the gap between the procedural "h5p-standalone"
 * package and the Graasp React ecosystem
 */
const H5PItem: FC<H5PItemProps> = ({
  itemId,
  h5pAssetsHost,
  playerOptions,
}) => {
  /*
    The following implementation performs the integration as a side-effect. Unfortunately, h5p-standalone (and H5P itself) expect the integration to be done on the window global object, which does not allow multiple H5Ps to be loaded simultaneously (as they will be competing for the same global object).
   *
  const h5pContainerEl = useRef(null);

  useEffect(() => {
    if (h5pContainerEl.current) {
      new H5P(h5pContainerEl.current, playerOptions);
    }
  }, [itemId]);

  return <div ref={h5pContainerEl} id={buildH5PContainerId(itemId)}></div>;
   */

  /*
    As a workaround, we wrap the H5P integration into an iframe, such that it gets its own window object
   */
  const containerId = buildH5PContainerId(itemId);
  const container = `<div id="${containerId}"></div>`;
  const script = `<script type="text/javascript" src="${h5pAssetsHost}/main.bundle.js"></script>`;
  const init = `
    <script type="text/javascript">
      const el = document.getElementById("${containerId}");
      const options = JSON.parse('${JSON.stringify(playerOptions)}');
      new H5PStandalone.H5P(el, options);
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          window.frameElement.height = entry.contentRect.height;
        }
      });
      resizeObserver.observe(el);
    </script>
  `;
  return (
    <iframe
      srcDoc={container + script + init}
      scrolling={'no'}
      frameBorder={0}
      style={{ width: '100%', border: 'none', display: 'block' }}
    ></iframe>
  );
};

export default H5PItem;
