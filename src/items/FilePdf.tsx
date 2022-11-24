import { SxProps, styled } from '@mui/material';

import React, { FC, ReactEventHandler, useRef, useState } from 'react';

import {
  GRAASP_ASSETS_PROTOCOL,
  ITEM_MAX_HEIGHT,
  PDF_VIEWER_LINK,
} from '../constants';

interface FilePdfProps {
  id?: string;
  url: string;
  height?: number | string;
  sx?: SxProps;
  showCollapse?: boolean;
  /**
   * use a custom pdf reader from the link if defined
   * */
  pdfViewerLink?: string;
}

const StyledEmbed = styled('embed')({
  maxHeight: ITEM_MAX_HEIGHT,
});

const FilePdf: FC<FilePdfProps> = ({
  url,
  id,
  sx,
  height: defaultHeight,
  showCollapse,
  pdfViewerLink,
}) => {
  const embedRef = useRef<HTMLEmbedElement>(null);
  const [height, setHeight] = useState<number | string>(
    defaultHeight ?? '100%',
  );

  const onLoad: ReactEventHandler<HTMLEmbedElement> = (e) => {
    // only set pdf height if not using collapse
    if (!showCollapse) {
      // set pdf height -> probably very high
      const newHeight = (e.target as HTMLEmbedElement)?.offsetParent
        ?.scrollHeight;
      newHeight && setHeight(newHeight);
    }
  };

  const urlWithPdfViewer = `${GRAASP_ASSETS_PROTOCOL}${PDF_VIEWER_LINK}${encodeURIComponent(
    url,
  )}`;

  return (
    <StyledEmbed
      ref={embedRef}
      id={id}
      src={urlWithPdfViewer}
      width='100%'
      height={height || '100%'}
      onLoad={onLoad}
      sx={sx}
    />
  );
};

export default FilePdf;
