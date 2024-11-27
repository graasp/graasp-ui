import { ThumbnailSize } from '@graasp/sdk';

export const DRAWER_WIDTH = 240;
export const DEFAULT_DIRECTION = 'ltr';
export const DRAWER_HEADER_HEIGHT = 55;

export const DEFAULT_THUMBNAIL_SIZE = ThumbnailSize.Small;
export const DEFAULT_LINK_SHOW_BUTTON = true;

export const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
export const SMALL_AVATAR_SIZE = 40;
export const SHORT_TEXT_WIDTH = 60;
export const IFRAME_MIN_HEIGHT = 200;

export const FLAG_LIST_MAX_HEIGHT = 250;

export const SCREEN_MAX_HEIGHT =
  typeof window !== 'undefined' ? window.innerHeight * 0.8 : 1000;
