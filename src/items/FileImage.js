import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: '100%',
  },
}));

const FileImage = ({ id, url, alt }) => {
  const classes = useStyles();
  return <img id={id} className={classes.image} src={url} alt={alt} />;
};

export default FileImage;
