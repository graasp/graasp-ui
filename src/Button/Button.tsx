import React, { FC, ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { ButtonVariant, ColorVariant } from '../types';
import { styled } from '@mui/material';

interface GraaspButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
  dataCy?: string;
  children?: ReactNode;
  color?: ColorVariant;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  size?: 'medium' | 'large' | 'small';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  autoFocus?: boolean;
  fullWidth?: boolean;
}

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
  const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: theme.spacing(0),
  }));
  return (
    <StyledButton
      id={id}
      data-cy={dataCy}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={className}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
};

export default GraaspButton;
