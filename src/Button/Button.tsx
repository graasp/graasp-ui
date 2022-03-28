import React, { FC, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from '@material-ui/core';
import { ButtonVariant } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface GraaspButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  children?: ReactNode;
  color?: PropTypes.Color;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  size?: 'medium' | 'large' | 'small';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  autoFocus?: boolean;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const GraaspButton: FC<GraaspButtonProps> = ({
  id,
  onClick,
  children,
  color = 'primary',
  variant = 'contained',
  disabled = false,
  className,
  size = 'medium',
  startIcon,
  autoFocus,
  endIcon,
}) => {
  const classes = useStyles();
  return (
    <Button
      id={id}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={clsx(classes.button, className)}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      autoFocus={autoFocus}
    >
      {children}
    </Button>
  );
};

export default GraaspButton;
