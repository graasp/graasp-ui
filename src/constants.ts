export const DRAWER_WIDTH = 240;
export const DEFAULT_DIRECTION = 'ltr';
export const DRAWER_HEADER_HEIGHT = 55;
export const LOADING_TEXT = '…';

export const MIME_TYPES = {
  IMAGE: ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'],
  VIDEO: [
    'video/mp4',
    'video/x-m4v',
    'video/ogg',
    'video/quicktime',
    'video/webm',
  ],
  AUDIO: ['audio/mpeg', 'audio/mp3'],
  PDF: ['application/pdf'],
  ZIP: ['application/zip'],
};

export const TEXT_EDITOR_TOOLBAR = [
  [
    { header: [1, 2, 3, 4, 5, 6, false] },
    { font: [] },
    'bold',
    'italic',
    'underline',
    'strike',
    { color: [] }, // default colors depending on theme
    { background: [] }, // default colors depending on theme
  ],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, 'code-block', 'link', 'formula'],
];
export const TEXT_EDITOR_MIN_HEIGHT = 200;
export const TEXT_EDITOR_MAX_HEIGHT = 400;
export const APP_ITEM_WIDTH = '100%';
export const APP_ITEM_FRAME_BORDER = 0;
export const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
export const SMALL_AVATAR_SIZE = 40;
export const SHORT_TEXT_WIDTH = 60;
export const COLLAPSE_MIN_HEIGHT = 56;

export const LINK_BUTTON_CONTAINER_HEIGHT = 50;
export const LINK_BUTTON_CONTAINER_WIDTH = 50;
export const LINK_BUTTON_CONTAINER_BACKGROUND_COLOR = 'rgba(62,62,62,0.55)';

export const LINK_BUTTON_ICON_COLOR = 'white';
export const LINK_BUTTON_ICON_FONT_SIZE = 46;

export const ITEM_ICON_MAX_SIZE = 25;
export const DEFAULT_ITEM_DESCRIPTION = '';

// todo: factor out in graasp constants
export const SETTINGS = {
  ITEM_LOGIN: {
    name: 'item-login',
    OPTIONS: {
      USERNAME: 'username',
      USERNAME_AND_PASSWORD: 'username+password',
    },
    SIGN_IN_MODE: {
      PSEUDONYME: 'pseudonyme',
      MEMBER_ID: 'memberId',
    },
  },
};
export const FORBIDDEN_TEXT = 'You cannot access this item';

export const ITEM_MAX_HEIGHT = '70vh';
export const DEFAULT_CARD_HEIGHT = 130;

export const THUMBNAIL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ORIGINAL: 'original',
};

export const DEFAULT_THUMBNAIL_SIZE = THUMBNAIL_SIZES.SMALL;

export const FLAG_LIST_MAX_HEIGHT = 250;
export const DEFAULT_PERMISSION = 'read';

export enum CC_LICENSE_ADAPTION_OPTIONS {
  ALLOW = 'allow',
  ALIKE = 'alike',
}

export const DEFAULT_LOADER_SIZE = 20;
