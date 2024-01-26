import ForumIcon from '@mui/icons-material/Forum';
import { IconButton, IconButtonProps } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { FC, MouseEventHandler } from 'react';

export type Props = {
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: IconButtonProps['size'];
  tooltip?: string;
};

const ChatboxButton: FC<Props> = ({ tooltip, id, onClick, size }) => {
  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton id={id} onClick={onClick} size={size}>
          <ForumIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ChatboxButton;
