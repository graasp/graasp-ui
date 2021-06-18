export const DRAWER_WIDTH = 240;
export const DEFAULT_DIRECTION = 'ltr';
export const DRAWER_HEADER_HEIGHT = 55;
export const LOADING_TEXT = '…';

export const MIME_TYPES = {
  IMAGE: ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'],
  VIDEO: ['video/mp4'],
  AUDIO: ['audio/mpeg', 'audio/mp3'],
  PDF: ['application/pdf'],
};

export const TEXT_EDITOR_TOOLBAR = [
  [
    { header: [] },
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
export const APP_ITEM_HEIGHT = 300;
export const APP_ITEM_WIDTH = '100%';
export const APP_ITEM_FRAME_BORDER = 0;
