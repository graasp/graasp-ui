import React, { FC } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface TreeItemLabelProps {
  name: string;
  className?: string;
  showCheckbox?: boolean;
  checked?: boolean;
}

const TreeItemLabel: FC<TreeItemLabelProps> = ({
  showCheckbox = false,
  checked = false,
  className,
  name,
}) => {
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

  return <React.Fragment>{name}</React.Fragment>;
};

export default TreeItemLabel;
