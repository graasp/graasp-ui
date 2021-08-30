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
  type: string;
}

const FileVideo: FC<FileVideoProps> = ({ id, url, type }) => {
  const classes = useStyles();
  return (
    <video className={classes.video} id={id} controls>
      <source src={url} type={type} />
    </video>
  );
};

export default FileVideo;
