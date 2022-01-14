import { Map, Record } from 'immutable';

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
}

export type Member = {
  id: string;
  name: string;
  email: string;
};

export type ItemMembership = {
  id: string;
};

// todo: better solution?
// conflict between isEmpty which only exists in Map, List of objects and the fact
// we cannot create a Record from data
export type ImmutableItem = Map<string, any>;
export type ImmutableMember = Map<string, any>;
export type ItemLogin = Map<string, any>;
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
  thumbnails: string[];
  html: string;
  url: string;
  icons: string[];
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
