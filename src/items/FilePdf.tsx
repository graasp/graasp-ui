import React, { FC, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ITEM_MAX_HEIGHT } from '../constants';

interface FilePdfProps {
  id?: string;
  url: string;
  height?: number | string;
  className?: string;
}

const useStyles = makeStyles({
  embed: {
    maxHeight: ITEM_MAX_HEIGHT,
  },
});

const FilePdf: FC<FilePdfProps> = ({
  url,
  id,
  height: defaultHeight,
  className,
}) => {
  const embedRef = useRef<HTMLEmbedElement>(null);
  const classes = useStyles();

  return (
    <embed
      ref={embedRef}
      id={id}
      src={url}
      width='100%'
      height={defaultHeight || ITEM_MAX_HEIGHT}
      className={clsx(classes.embed, className)}
    />
  );
};

export default FilePdf;
