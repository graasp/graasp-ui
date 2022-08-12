import { List, Record, RecordOf } from 'immutable';
import { Context } from '@graasp/utils';

export type UUID = string;

export type Anything =
  | string
  | number
  | boolean
  | null
  | undefined
  | Anything[]
  | { [key: string]: Anything };

export interface UnknownExtra {
  [key: string]: Anything;
}

// create immutable items using record
// https://medium.com/@dyskplus/not-sure-if-that-wasnt-possible-as-of-writing-this-article-but-right-now-i-think-you-could-simply-ecafc50d06
// we won't need Item anymore once all levels are immutable (List<Record<Item>>)
export interface Item<T = UnknownExtra> {
  id: UUID;
  name: string;
  path: string;
  extra: T;
  description?: string;
  type: string;
  creator: string;
  settings?: unknown;
}

export type ItemRecord = RecordOf<Item>;

export type ItemMembership = {
  id: string;
};

export type MemberExtra = {
  hasAvatar?: boolean;
};

export type MemberExtraRecord = RecordOf<MemberExtra>;

export type Member = {
  id: UUID;
  name: string;
  email: string;
  extra: MemberExtraRecord;
};

export type MemberRecord = RecordOf<Member>;

export class ImmutableItemClass extends Record({
  id: '',
  name: '',
  path: '',
  description: '',
  extra: {},
  type: '',
  creator: '',
}) {}

export type EmbeddedLinkItemExtraProp = {
  thumbnails: List<string>;
  html: string;
  url: string;
  icons: List<string>;
};
export interface EmbeddedLinkItemExtra {
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
  RECT = 'rect',
  CIRCLE = 'circle',
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

export type ButtonVariant = 'text' | 'contained' | 'outlined';

export type HostMap = { [name in Context]: string };

export enum ITEM_LOGIN_SCHEMAS {
  USERNAME = 'username',
  USERNAME_AND_PASSWORD = 'username+password',
}

export type ItemLogin = {
  loginSchema: ITEM_LOGIN_SCHEMAS;
};

export type ItemLoginRecord = RecordOf<ItemLogin>;
