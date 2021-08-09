import React, { FC } from 'react';
import Button from '@material-ui/core/Button';

interface SaveButtonProps {
  onClick: (e: any) => void;
  hasChanges: boolean;
  id?: string;
  text?: string;
  cancelText?: string;
}

const SaveButton: FC<SaveButtonProps> = ({
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
