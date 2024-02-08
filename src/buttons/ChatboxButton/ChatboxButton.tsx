import { IconSizeVariant } from '@/types';

import ForumIcon from '@mui/icons-material/Forum';
import { IconButton, Tooltip } from '@mui/material';

export type Props = {
  id?: string;
  onClick?: () => void;
  size?: IconSizeVariant;
  tooltip?: string;
};

const ChatboxButton = ({ tooltip, id, onClick, size }: Props): JSX.Element => (
  <Tooltip title={tooltip}>
    <span>
      <IconButton id={id} onClick={onClick} size={size}>
        <ForumIcon />
      </IconButton>
    </span>
  </Tooltip>
);

export default ChatboxButton;
