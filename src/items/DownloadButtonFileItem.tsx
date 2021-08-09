import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

interface DownloadButtonFileItemProps {
  name: string;
  url: string;
  id?: string;
  text?: string;
}

const DownloadButtonFileItem: FC<DownloadButtonFileItemProps> = ({
  id,
  name,
  url,
  text,
}) => {
  const classes = useStyles();
  const buttonText = text || `Download ${name}`;

  return (
    <a
      id={id}
      className={classes.link}
      href={url}
      target='_blank'
      rel='noreferrer'
      download={name}
    >
      <Button
        color='primary'
        variant='contained'
        size='large'
        startIcon={<GetAppIcon />}
      >
        {buttonText}
      </Button>
    </a>
  );
};

export default DownloadButtonFileItem;
