import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  video: {
    maxWidth: '100%',
  },
}));

interface FileVideoProps {
  id?: string;
  url: string;
}

const FileVideo: FC<FileVideoProps> = ({ id, url }) => {
  const classes = useStyles();
  return (
    <video className={classes.video} id={id} controls>
      <source src={url} />
    </video>
  );
};

export default FileVideo;
