import React, { FC, useRef, useState, ReactEventHandler } from 'react';
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
  showCollapse,
}) => {
  const embedRef = useRef<HTMLEmbedElement>(null);
  const classes = useStyles();
  const [height, setHeight] = useState<number | string>(
    defaultHeight ?? '100%',
  );

  const onLoad: ReactEventHandler<HTMLEmbedElement> = (e) => {
    // only set pdf height if not using collapse
    if (!showCollapse) {
      // set pdf height -> probably very high
      console.log((e.target as HTMLEmbedElement)?.offsetParent);
      const newHeight = (e.target as HTMLEmbedElement)?.offsetParent
        ?.scrollHeight;
      newHeight && setHeight(newHeight);
    }
  };

  return (
    <embed
      ref={embedRef}
      id={id}
      src={url}
      width='100%'
      height={height || '100%'}
      onLoad={onLoad}
      className={clsx(classes.embed, className)}
    />
  );
};

export default FilePdf;