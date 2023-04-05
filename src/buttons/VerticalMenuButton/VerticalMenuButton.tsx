import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, IconButtonProps } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButtonVariant } from '../../types';

export type VerticalMenuButtonProps = {
  className?: string;
  color?: IconButtonProps['color'];
  id?: string;
  isOpen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: IconButtonProps['size'];
  openText?: string;
  closeText?: string;
  type?: ActionButtonVariant;
};

const VerticalMenuButton: FC<VerticalMenuButtonProps> = ({
  className,
  color,
  id,
  isOpen = false,
  onClick,
  size,
  openText,
  closeText,
  type,
}) => {
  const tooltip = isOpen ? closeText : openText;

  switch (type) {
    default:
      return (
        <Tooltip title={tooltip}>
          <span>
            <IconButton
              id={id}
              onClick={onClick}
              className={className}
              size={size}
              color={color}
            >
              <MoreVertIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default VerticalMenuButton;
