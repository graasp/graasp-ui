import React, { FC } from 'react';
import GraaspButton from '../Button';
import { ButtonVariant, ColorVariant } from '../types';

interface SaveButtonProps {
  onClick: (e: any) => void;
  hasChanges: boolean;
  id?: string;
  text?: string;
  savedText?: string;
  color?: ColorVariant;
  variant?: ButtonVariant;
}

const SaveButton: FC<SaveButtonProps> = ({
  id,
  onClick,
  variant,
  color,
  text = 'Save',
  savedText = 'Saved',
  hasChanges,
}) => {
  return (
    <GraaspButton
      id={id}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={!hasChanges}
    >
      {hasChanges ? text : savedText}
    </GraaspButton>
  );
};

export default SaveButton;
