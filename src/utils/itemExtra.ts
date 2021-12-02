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
  extra?.file;

export const getS3FileExtra = (
  extra?: S3FileItemExtra,
): S3FileItemExtraProp | undefined => extra?.s3File;

export const getEmbeddedLinkExtra = (
  extra?: EmbeddedLinkItemExtra,
): EmbeddedLinkItemExtraProp | undefined => extra?.embeddedLink;

export const getDocumentExtra = (
  extra?: DocumentItemExtra,
): DocumentItemExtraProp | undefined => extra?.document;

export const getAppExtra = (
  extra?: AppItemExtra,
): AppItemExtraProp | undefined => extra?.app;
