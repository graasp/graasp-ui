import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  video: {
    maxWidth: '100%',
  },
}));

interface FileVideoProps {
  id?: string;
  url: string;
  className?: string;
}

const FileVideo: FC<FileVideoProps> = ({ id, url, className }) => {
  const classes = useStyles();
  return (
    <video className={clsx(classes.video, className)} id={id} controls>
      <source src={url} />
    </video>
  );
};

export default FileVideo;
