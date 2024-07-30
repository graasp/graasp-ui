import { jsx as _jsx } from 'react/jsx-runtime';

const EtherpadItem = ({
  itemId,
  padUrl,
  iframeId = `etherpad-container-${itemId}`,
  options,
  style,
}) => {
  const src = new URL(padUrl);
  if (options) {
    Object.entries(options).forEach(([param, value]) =>
      src.searchParams.set(param, String(value)),
    );
  }
  return _jsx('iframe', {
    id: iframeId,
    src: src.href,
    frameBorder: 0,
    sandbox:
      'allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin',
    style: {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block',
      ...style,
    },
  });
};
export default EtherpadItem;
