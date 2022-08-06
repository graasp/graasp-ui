import React, { FC, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { PropTypes } from '@material-ui/core';
import { ButtonVariant } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export interface GraaspButtonProps {
  autoFocus?: boolean;
  /**
   * button contents, usually a string
   */
  children?: ReactNode;
  /**
   * classname string
   */
  className?: string;
  color?: PropTypes.Color;
  component?: React.ElementType;
  /**
   * cypress data-cy attribute
   */
  dataCy?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  /**
   * id string
   */
  id?: string;
  /**
   * on click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: 'medium' | 'large' | 'small';
  startIcon?: ReactNode;
  variant?: ButtonVariant;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

/**
 * Column properties.
 */
export const GraaspButton: FC<GraaspButtonProps> = ({
  id,
  dataCy,
  onClick,
  children,
  className,
  startIcon,
  autoFocus,
  endIcon,
  fullWidth,
  component = 'button',
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
      component={component}
    >
      {children}
    </Button>
  );
};

export default GraaspButton;
