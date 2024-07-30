import { Stack } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import {
  Alignment,
  DescriptionPlacement,
  MimeTypes,
  getMimetype,
} from '@graasp/sdk';

import TextDisplay from '@/TextDisplay/TextDisplay.js';

export const getDefaultFileAlignmentSetting = (mimetype) => {
  if (!mimetype) {
    return Alignment.Left;
  }
  switch (true) {
    case MimeTypes.isImage(mimetype):
    case MimeTypes.isAudio(mimetype):
    case MimeTypes.isVideo(mimetype):
    case MimeTypes.isPdf(mimetype):
      return Alignment.Center;
    // unknown mimetype is left aligned
    default:
      return Alignment.Left;
  }
};
const getAlignItemsFromAlignmentSetting = (alignment) => {
  switch (alignment) {
    case Alignment.Right:
      return 'flex-end';
    case Alignment.Left:
      return 'flex-start';
    case Alignment.Center:
      return 'center';
  }
};
const normalizeDescription = (value) => {
  // description may be null or undefined, we return empty string
  if (!value) {
    return '';
  }
  // empty description from quill is a paragraph with an empty line inside,
  // we do not want to display this, so we return empty string
  if (value === '<p><br></p>') {
    return '';
  }
  return value;
};
export const CaptionWrapper = ({ item, children }) => {
  const descriptionPlacement = item.settings?.descriptionPlacement ?? 'below';
  const direction =
    descriptionPlacement === DescriptionPlacement.ABOVE
      ? 'column-reverse'
      : 'column';
  const alignment =
    item.settings?.alignment ??
    getDefaultFileAlignmentSetting(
      item.extra ? getMimetype(item.extra) : undefined,
    );
  const alignItems = getAlignItemsFromAlignmentSetting(alignment);
  const description = normalizeDescription(item.description);
  return _jsxs(Stack, {
    direction: direction,
    gap: 0.5,
    alignItems: alignItems,
    width: '100%',
    children: [children, _jsx(TextDisplay, { content: description })],
  });
};
export function withCaption({ item }) {
  return (component) => {
    return _jsx(CaptionWrapper, { item: item, children: component });
  };
}
export default withCaption;
