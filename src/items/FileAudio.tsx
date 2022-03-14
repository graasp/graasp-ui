import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  audio: {
    maxWidth: '100%',
  },
}));

interface FileAudioProps {
  id?: string;
  url: string;
  type: string;
  className?: string;
}

const FileAudio: FC<FileAudioProps> = ({ id, url, type, className }) => {
  const classes = useStyles();
  return (
    <audio className={clsx(classes.audio, className)} id={id} controls>
      <source src={url} type={type} />
    </audio>
  );
};

export default FileAudio;
