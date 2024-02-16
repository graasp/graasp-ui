import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { SvgIconOwnProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import {
  ActionButton,
  ActionButtonVariant,
  IconSizeVariant,
} from '../../types';
import MenuItemButton from '../MenuItemButton';

export type PinButtonProps = {
  color?: SvgIconOwnProps['color'];
  iconClassName?: string;
  id?: string;
  isPinned?: boolean;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconSizeVariant;
  pinText?: string;
  unPinText?: string;
  type?: ActionButtonVariant;
};

const PinButton = ({
  type,
  onClick,
  menuItemClassName,
  iconClassName,
  isPinned,
  pinText = 'Pin',
  unPinText = 'Unpin',
  size,
  color,
}: PinButtonProps): JSX.Element => {
  const icon = isPinned ? (
    <PushPinIcon color={color} />
  ) : (
    <PushPinOutlinedIcon color={color} />
  );
  const text = isPinned ? unPinText : pinText;

  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItemButton
          icon={icon}
          onClick={onClick}
          text={text}
          className={menuItemClassName}
        />
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              size={size}
              aria-label={text}
              className={iconClassName}
              onClick={onClick}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default PinButton;
