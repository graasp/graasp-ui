import { Record, RecordOf } from 'immutable';

import {
  Context,
  Item,
  ItemType,
  Member,
  MemberType,
  UnknownExtra,
} from '@graasp/sdk';

export type UUID = string;

export type ItemRecord = RecordOf<Item>;

export type ItemMembership = {
  id: string;
};

export type MemberExtra = {
  hasAvatar?: boolean;
};

export type MemberExtraRecord = RecordOf<MemberExtra>;

export type MemberRecord = RecordOf<Member>;
export class ImmutableMember extends Record<Member>({
  id: '',
  extra: {},
  name: '',
  createdAt: '',
  updatedAt: '',
  email: '',
  type: MemberType.Individual,
}) {}

export class ImmutableItem extends Record<Item>({
  id: '',
  name: '',
  path: '',
  description: '',
  extra: {},
  settings: {},
  type: ItemType.FOLDER,
  creator: '',
  createdAt: '',
  updatedAt: '',
}) {}

// use any instead of immutable List otherwise it cannot extends UnknownExtra
export type EmbeddedLinkItemExtraProp = {
  thumbnails: any; //List<string>;
  html: string;
  url: string;
  icons: any; //List<string>;
};

export interface EmbeddedLinkItemExtra extends UnknownExtra {
  embeddedLink: EmbeddedLinkItemExtraProp;
}

export type S3FileItemExtraProp = {
  mimetype: string;
  name: string;
};

export interface S3FileItemExtra extends UnknownExtra {
  s3File: S3FileItemExtraProp;
}

export type FileItemProp = {
  mimetype: string;
  name: string;
};

export interface FileItemExtra extends UnknownExtra {
  file: FileItemProp;
}

export type DocumentItemExtraProp = {
  content: string;
};

export interface DocumentItemExtra extends UnknownExtra {
  document: DocumentItemExtraProp;
}

export type AppItemExtraProp = {
  url: string;
  settings: UnknownExtra;
};

export interface AppItemExtra extends UnknownExtra {
  app: AppItemExtraProp;
}

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
  loginSchema: ItemLoginSchema;
};

export type ItemLoginRecord = RecordOf<ItemLogin>;

export class ImmutableItemLogin extends Record({
  loginSchema: ItemLoginSchema.USERNAME,
}) {}

export enum ButtonTypeEnum {
  ICON = 'icon',
  MENU_ITEM = 'menuItem',
}
export type ButtonType = 'icon' | 'menuItem' | ButtonTypeEnum | string;
