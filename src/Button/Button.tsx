import React, { FC, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from '@material-ui/core';
import { ButtonVariant } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface GraaspButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  dataCy?: string;
  children?: ReactNode;
  color?: PropTypes.Color;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  size?: 'medium' | 'large' | 'small';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  autoFocus?: boolean;
  fullWidth?: boolean;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const GraaspButton: FC<GraaspButtonProps> = ({
  id,
  dataCy,
  onClick,
  children,
  className,
  startIcon,
  autoFocus,
  endIcon,
  fullWidth,
  color = 'primary',
  variant = 'contained',
  disabled = false,
  size = 'medium',
}) => {
  const classes = useStyles();
  return (
    <Button
      id={id}
      data-cy={dataCy}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={clsx(classes.button, className)}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default GraaspButton;
