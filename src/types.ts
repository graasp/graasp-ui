import { Record, RecordOf } from 'immutable';

import { Context } from '@graasp/sdk';

export type UUID = string;

export type ItemMembership = {
  id: string;
};

export enum Variant {
  TEXT = 'text',
  RECT = 'rectangular',
  CIRCLE = 'circular',
}

export type ItemFlag = {
  id: string;
  flagId: string;
  itemId: string;
  creator: string;
  createdAt: string;
};

export type Flag = {
  id: string;
  name: string;
};

export type FlagRecord = RecordOf<Flag>;
export class ImmutableFlag extends Record({
  id: '',
  name: '',
}) {}

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

export type HostMap = { [name in Context]: string };

export enum ItemLoginSchema {
  USERNAME = 'username',
  USERNAME_AND_PASSWORD = 'username+password',
}

export type ItemLogin = {
  loginSchema: `${ItemLoginSchema}`;
};

export type ItemLoginRecord = RecordOf<ItemLogin>;

export const ImmutableItemLoginFactory = Record({
  loginSchema: ItemLoginSchema.USERNAME,
});

export enum ButtonTypeEnum {
  ICON = 'icon',
  MENU_ITEM = 'menuItem',
}
export type ButtonType = 'icon' | 'menuItem' | ButtonTypeEnum | string;
