import {
  Chat,
  SpeakerNotesOff as SpeakerNotesOffIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { ActionButton } from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';

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
}) => {
  const icon = showChat
    ? _jsx(Chat, { color: color, sx: sx })
    : _jsx(SpeakerNotesOffIcon, { color: color, sx: sx });
  const text = showChat ? hideChatText : showChatText;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsx(MenuItemButton, {
        icon: icon,
        text: text,
        onClick: onClick,
        className: menuItemClassName,
      });
    case ActionButton.ICON_BUTTON:
    default:
      return _jsx(Tooltip, {
        title: tooltip,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            id: id,
            onClick: onClick,
            size: size,
            children: icon,
          }),
        }),
      });
  }
};
export default ChatboxButton;
