import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const DownloadButtonFileItem = ({ id, name, url, text }) => {
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

DownloadButtonFileItem.defaultProps = {
  id: null,
};

export default DownloadButtonFileItem;
