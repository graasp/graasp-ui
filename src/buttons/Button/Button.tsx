import { SxProps, Theme, styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

import React, { ElementType, FC, ReactNode } from 'react';

export type GraaspButtonProps = {
  autoFocus?: boolean;
  /**
   * button contents, usually a string
   */
  children?: ReactNode;
  /**
   * classname string
   */
  className?: string;
  color?: ButtonProps['color'];
  component?: ElementType;
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
  size?: ButtonProps['size'];
  startIcon?: ReactNode;
  /**
   * styles
   */
  sx?: SxProps;
  variant?: ButtonProps['variant'];
};

const StyledButton = styled(Button)<ButtonProps | { component?: ElementType }>(
  ({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(0),
  }),
);

export const GraaspButton: FC<GraaspButtonProps> = ({
  autoFocus,
  children,
  className,
  color = 'primary',
  component,
  dataCy,
  disabled = false,
  endIcon,
  fullWidth,
  id,
  onClick,
  size = 'medium',
  startIcon,
  sx,
  variant = 'contained',
}) => {
  return (
    <StyledButton
      autoFocus={autoFocus}
      className={className}
      color={color}
      component={component}
      data-cy={dataCy}
      disabled={disabled}
      endIcon={endIcon}
      fullWidth={fullWidth}
      id={id}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      sx={sx}
      variant={variant}
    >
      {children}
    </StyledButton>
  );
};

export default GraaspButton;
