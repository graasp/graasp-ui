import { ItemType } from '@graasp/sdk';

import {
  AppItemExtra,
  AppItemExtraProp,
  DocumentItemExtra,
  DocumentItemExtraProp,
  EmbeddedLinkItemExtra,
  EmbeddedLinkItemExtraProp,
  FileItemExtra,
  FileItemProp,
  S3FileItemExtra,
  S3FileItemExtraProp,
} from '../types';

export const getFileExtra = (extra?: FileItemExtra): FileItemProp | undefined =>
  extra?.[ItemType.LOCAL_FILE];

export const getS3FileExtra = (
  extra?: S3FileItemExtra,
): S3FileItemExtraProp | undefined => extra?.[ItemType.S3_FILE];

export const getEmbeddedLinkExtra = (
  extra?: EmbeddedLinkItemExtra,
): EmbeddedLinkItemExtraProp | undefined => extra?.[ItemType.LINK];

export const getDocumentExtra = (
  extra?: DocumentItemExtra,
): DocumentItemExtraProp | undefined => extra?.[ItemType.DOCUMENT];

export const getAppExtra = (
  extra?: AppItemExtra,
): AppItemExtraProp | undefined => extra?.[ItemType.APP];
