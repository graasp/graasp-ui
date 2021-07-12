import React from 'react';
import { Button } from '@material-ui/core';

const SaveButton = ({
  id,
  onClick,
  text = 'Save',
  cancelText = 'Cancel',
  hasChanges,
}) => {
  return (
    <Button variant='contained' id={id} color='primary' onClick={onClick}>
      {hasChanges ? text : cancelText}
    </Button>
  );
};

export default SaveButton;
