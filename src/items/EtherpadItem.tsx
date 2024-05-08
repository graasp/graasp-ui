import React, { FC } from 'react';

/**
 * @see https://etherpad.org/doc/v1.8.18/#index_embed-parameters
 */
type EtherpadEmbedOptions = {
  showLineNumbers?: boolean;
  showControls?: boolean;
  showChat?: boolean;
  useMonospaceFont?: boolean;
  userName?: string;
  userColor?: string;
  noColors?: boolean;
  alwaysShowChat?: boolean;
  lang?: string;
  rtl?: boolean;
  '#L'?: number;
};

interface EtherpadItemProps {
  itemId: string;
  padUrl: string;
  iframeId?: string;
  options?: EtherpadEmbedOptions;
  style?: React.CSSProperties;
}

const EtherpadItem: FC<EtherpadItemProps> = ({
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

  return (
    <iframe
      id={iframeId}
      src={src.href}
      frameBorder={0}
      sandbox='allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin'
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        display: 'block',
        ...style,
      }}
    ></iframe>
  );
};

export default EtherpadItem;
