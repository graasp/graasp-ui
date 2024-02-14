import { Direction } from '@mui/material';

export enum Variant {
  TEXT = 'text',
  RECT = 'rectangular',
  CIRCLE = 'circular',
}

export type TooltipPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export type ColorVariants =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export type IconSizeVariant = 'small' | 'medium' | 'large';

export enum ActionButton {
  ICON = 'icon',
  ICON_BUTTON = 'iconButton',
  MENU_ITEM = 'menuItem',
}

export type ActionButtonVariant = ActionButton | `${ActionButton}`;

export enum CCSharing {
  YES = 'yes',
  NO = 'no',
  ALIKE = 'alike',
}

export type CCSharingVariant = CCSharing | `${CCSharing}`;

export type I18nInstance = {
  language: string;
  t: (s: string) => string;
  dir: (l: string) => Direction;
  changeLanguage: (lang: string) => void;
};
