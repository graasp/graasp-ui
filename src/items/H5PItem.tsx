import { H5POptions } from 'h5p-standalone';
import React, { FC } from 'react';

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
    h5p-standalone (and H5P itself) expect the integration to be done on the
    window global object, which does not allow multiple H5Ps to be loaded
    simultaneously (as they will be competing for the same global object)
    As a workaround, we wrap the H5P integration into an iframe, such that it
    gets its own window object. We can also enable the sandbox attribute for
    additional security
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
      sandbox={
        'allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-scripts'
      }
      style={{ width: '100%', border: 'none', display: 'block' }}
    ></iframe>
  );
};

export default H5PItem;
