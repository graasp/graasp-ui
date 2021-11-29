import React, { FC, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ITEM_MAX_HEIGHT } from '../constants';

interface FilePdfProps {
  id?: string;
  url: string;
  height?: number | string;
}

const useStyles = makeStyles({
  embed: {
    maxHeight: ITEM_MAX_HEIGHT,
  },
});

const FilePdf: FC<FilePdfProps> = ({ url, id, height: defaultHeight }) => {
  const embedRef = useRef<HTMLEmbedElement>(null);
  const classes = useStyles();
  const [height, setHeight] = useState<number | string>(
    defaultHeight ?? '100%',
  );

  const onLoad = (e): void => {
    // set pdf height -> probably very high
    setHeight(e.target?.offsetParent?.scrollHeight);
  };

  return (
    <embed
      ref={embedRef}
      id={id}
      src={url}
      width='100%'
      height={height || '100%'}
      onLoad={onLoad}
      className={classes.embed}
    />
  );
};

export default FilePdf;
