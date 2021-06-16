import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  video: {
    maxWidth: '100%',
  },
}));

const FileVideo = ({ id, url, type }) => {
  const classes = useStyles();
  return (
    <video className={classes.video} id={id} controls>
      <source src={url} type={type} />
    </video>
  );
};

export default FileVideo;
