import { ThumbnailSize } from '@graasp/sdk';

export const DRAWER_WIDTH = 240;
export const DEFAULT_DIRECTION = 'ltr';
export const DRAWER_HEADER_HEIGHT = 55;

export const DEFAULT_THUMBNAIL_SIZE = ThumbnailSize.Small;
export const DEFAULT_LINK_SHOW_BUTTON = true;
export const DEFAULT_LOADER_SIZE = 20;

export const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
export const SMALL_AVATAR_SIZE = 40;
export const SHORT_TEXT_WIDTH = 60;
export const COLLAPSE_MIN_HEIGHT = 56;
export const IFRAME_MIN_HEIGHT = 200;

// todo: factor out in graasp constants
export const SETTINGS = {
  ITEM_LOGIN: {
    name: 'item-login',
    OPTIONS: {
      USERNAME: 'username',
      USERNAME_AND_PASSWORD: 'username+password',
    },
    SIGN_IN_MODE: {
      PSEUDONYM: 'pseudonym',
      MEMBER_ID: 'memberId',
    },
  },
};

export const FLAG_LIST_MAX_HEIGHT = 250;

export enum CCLicenseAdaption {
  ALLOW = 'allow',
  ALIKE = 'alike',
}

export const SCREEN_MAX_HEIGHT = window.innerHeight * 0.8;
