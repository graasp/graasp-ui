import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ITEM_MAX_HEIGHT } from '../constants';

interface FilePdfProps {
  id?: string;
  url: string;
  height?: number | string;
  className?: string;
  showCollapse?: boolean;
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
  const classes = useStyles();

  const src = `https://pdfviewer.dev.graasp.org/pdf/web/viewer.html?file=${encodeURIComponent(url)}`;

  return (
    <iframe
      id={id}
      src={src}
      width='100%'
      height={defaultHeight || '100%'}
      className={clsx(classes.embed, className)}
    />
  );
};

export default FilePdf;
