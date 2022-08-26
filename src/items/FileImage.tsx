import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
interface FileImageProps {
  id?: string;
  url?: string;
  alt: string;
  className?: string;
}

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '100%',
  },
}));

const FileImage: FC<FileImageProps> = ({ id, url, alt, className }) => {
  const classes = useStyles();
  return (
    <img
      id={id}
      className={clsx(classes.image, className)}
      src={url}
      alt={alt}
    />
  );
};

export default FileImage;
