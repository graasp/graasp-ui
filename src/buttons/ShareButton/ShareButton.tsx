import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

export type Props = {
  tooltip?: string;
  open?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  className?: string;
  size?: IconButtonProps['size'];
  id?: string;
};

const ShareButton: FC<Props> = ({
  open,
  className,
  tooltip = 'Share',
  ariaLabel,
  id,
  onClick,
  size,
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        aria-label={ariaLabel ?? tooltip}
        className={className}
        onClick={onClick}
        id={id}
        size={size}
      >
        {open ? <CloseIcon /> : <ShareIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ShareButton;
