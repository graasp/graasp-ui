import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from '@material-ui/core';
import { ButtonVariant } from '../types';

interface GraaspButtonProps {
  onClick: (e: any) => void;
  id?: string;
  text?: string;
  color?: PropTypes.Color;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const GraaspButton: FC<GraaspButtonProps> = ({
  id,
  onClick,
  text,
  color = 'primary',
  variant = 'contained',
  disabled = false,
}) => {
  return (
    <Button
      variant={variant}
      id={id}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default GraaspButton;
