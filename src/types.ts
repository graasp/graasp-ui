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

export type IconSizeVariant = 'small' | 'medium' | 'large' | 'inherit';

export type ThumbnailSizeVariant = 'small' | 'medium' | 'large' | 'original';

export enum ActionButton {
  ICON_BUTTON = 'icon',
  MENU_ITEM = 'menuItem',
}

export type ActionButtonVariant = ActionButton | `${ActionButton}`;
