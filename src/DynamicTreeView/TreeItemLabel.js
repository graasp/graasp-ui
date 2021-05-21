import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const TreeItemLabel = ({ showCheckbox, checked, className, name }) => {
  const classes = useStyles();
  if (showCheckbox) {
    return (
      <div className={classes.label}>
        <Checkbox
          checked={checked}
          color='primary'
          size='small'
          className={className}
        />
        {name}
      </div>
    );
  }

  return name;
};

export default TreeItemLabel;
