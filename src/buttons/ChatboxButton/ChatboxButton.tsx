import { MessageSquareIcon, MessageSquareOffIcon } from 'lucide-react';

import { IconButton, Tooltip } from '@mui/material';

import { ActionButton, ActionButtonVariant, IconSizeVariant } from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';
import { useButtonColor } from '../hooks.js';

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
  color?: 'primary' | 'inherit';
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
  color = 'inherit',
}: Props): JSX.Element => {
  const { color: buttonColor } = useButtonColor(color);

  const icon = showChat ? (
    <MessageSquareOffIcon color={buttonColor} />
  ) : (
    <MessageSquareIcon color={buttonColor} />
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
