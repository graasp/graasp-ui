import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
interface FileImageProps {
  id?: string;
  url: string;
  alt: string;
}

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '100%',
  },
}));

const FileImage: FC<FileImageProps> = ({ id, url, alt }) => {
  const classes = useStyles();
  return <img id={id} className={classes.image} src={url} alt={alt} />;
};

export default FileImage;
