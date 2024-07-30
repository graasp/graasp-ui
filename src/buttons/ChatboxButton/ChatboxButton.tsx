import {
  Chat,
  SpeakerNotesOff as SpeakerNotesOffIcon,
} from '@mui/icons-material';
import { IconButton, SvgIconOwnProps, SxProps, Tooltip } from '@mui/material';

import { ActionButton, ActionButtonVariant, IconSizeVariant } from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';

export type Props = {
  id?: string;
  onClick?: () => void;
  size?: IconSizeVariant;
  tooltip?: string;
  menuItemClassName?: string;
  showChat: boolean;
  showChatText?: string;
  hideChatText?: string;
  type?: ActionButtonVariant;
  color?: SvgIconOwnProps['color'];
  sx?: SxProps;
};

const ChatboxButton = ({
  tooltip,
  showChat,
  id,
  onClick,
  size,
  menuItemClassName,
  type,
  showChatText = 'Show Chat',
  hideChatText = 'Hide Chat',
  color,
  sx = {},
}: Props): JSX.Element => {
  const icon = showChat ? (
    <Chat color={color} sx={sx} />
  ) : (
    <SpeakerNotesOffIcon color={color} sx={sx} />
  );
  const text = showChat ? hideChatText : showChatText;

  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItemButton
          icon={icon}
          text={text}
          onClick={onClick}
          className={menuItemClassName}
        />
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={tooltip}>
          <span>
            <IconButton id={id} onClick={onClick} size={size}>
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default ChatboxButton;
