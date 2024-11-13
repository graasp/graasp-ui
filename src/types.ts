import { Direction } from '@mui/material';

import { Context, UnionOfConst } from '@graasp/sdk';

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

export const ColorVariants = {
  Inherit: 'inherit',
  Primary: 'primary',
  Secondary: 'secondary',
  Error: 'error',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Builder: 'builder',
  Player: 'player',
  Library: 'library',
  Analytics: 'analytics',
  Auth: 'auth',
} as const;

export type ColorVariantsType = UnionOfConst<typeof ColorVariants>;

export type IconSizeVariant = 'small' | 'medium' | 'large';

export enum ActionButton {
  ICON = 'icon',
  ICON_BUTTON = 'iconButton',
  MENU_ITEM = 'menuItem',
}

export type ActionButtonVariant = ActionButton | `${ActionButton}`;

export type AllowedContext = Exclude<Context, Context.Unknown>;

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
