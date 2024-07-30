import { Button } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

export const GraaspButton = ({
  autoFocus,
  children,
  className,
  color = 'primary',
  dataCy,
  disabled = false,
  endIcon,
  fullWidth,
  id,
  onClick,
  size = 'medium',
  startIcon,
  type,
  variant = 'contained',
  href,
  role,
  ...other
}) =>
  _jsx(Button, {
    role: role,
    autoFocus: autoFocus,
    className: className,
    color: color,
    'data-cy': dataCy,
    disabled: disabled,
    endIcon: endIcon,
    fullWidth: fullWidth,
    id: id,
    onClick: onClick,
    size: size,
    startIcon: startIcon,
    type: type,
    variant: variant,
    href: href,
    title: href,
    ...other,
    children: children,
  });
export default GraaspButton;
