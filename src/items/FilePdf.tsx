import React, { FC, useRef, useState, ReactEventHandler } from 'react';
import { ITEM_MAX_HEIGHT } from '../constants';
import { styled, SxProps } from '@mui/material';

interface FilePdfProps {
  id?: string;
  url: string;
  height?: number | string;
  sx?: SxProps;
}

const StyledEmbed = styled('embed')({
  maxHeight: ITEM_MAX_HEIGHT,
});

const FilePdf: FC<FilePdfProps> = ({ url, id, height: defaultHeight, sx }) => {
  const embedRef = useRef<HTMLEmbedElement>(null);
  const [height, setHeight] = useState<number | string>(
    defaultHeight ?? '100%',
  );

  const onLoad: ReactEventHandler<HTMLEmbedElement> = (e) => {
    // set pdf height -> probably very high
    const newHeight = (e.target as HTMLEmbedElement)?.offsetParent
      ?.scrollHeight;
    newHeight && setHeight(newHeight);
  };

  return (
    <StyledEmbed
      ref={embedRef}
      id={id}
      src={url}
      width='100%'
      height={height || '100%'}
      onLoad={onLoad}
      sx={sx}
    />
  );
};

export default FilePdf;
