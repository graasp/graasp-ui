import EditIcon from '@mui/icons-material/Edit';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { FC, MouseEventHandler } from 'react';

export type Props = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler;
  tooltip?: string;
  size?: IconButtonProps['size'];
};

const EditButton: FC<Props> = ({
  id,
  className,
  ariaLabel,
  onClick,
  tooltip = 'edit',
  size = 'small',
}) => {
  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton
          id={id}
          aria-label={ariaLabel}
          className={className}
          onClick={onClick}
          size={size}
        >
          <EditIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default EditButton;
