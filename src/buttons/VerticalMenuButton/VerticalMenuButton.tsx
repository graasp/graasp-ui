import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, IconButtonProps } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButtonVariant } from '../../types';

export type VerticalMenuButtonProps = {
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: IconButtonProps['size'];
  className?: string;
  openText?: string;
  closeText?: string;
  isOpen?: boolean;
  type?: ActionButtonVariant;
};

const VerticalMenuButton: FC<VerticalMenuButtonProps> = ({
  id,
  size,
  onClick,
  className,
  openText,
  closeText,
  isOpen,
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
            >
              <MoreVertIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default VerticalMenuButton;
