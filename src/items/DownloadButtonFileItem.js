import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
}));

const DownloadButtonFileItem = ({ name, url }) => {
  const classes = useStyles();

  return (
    <a
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
      >{`Download ${name}`}</Button>
    </a>
  );
};

export default DownloadButtonFileItem;
