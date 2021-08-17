import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  audio: {
    maxWidth: '100%',
  },
}));

const FileAudio = ({ id, url, type }) => {
  const classes = useStyles();
  return (
    <audio className={classes.audio} id={id} controls>
      <source src={url} type={type} />
    </audio>
  );
};

export default FileAudio;
