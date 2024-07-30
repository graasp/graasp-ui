import { Typography } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { getDocumentExtra } from '@graasp/sdk';

import TextDisplay from '@/TextDisplay/TextDisplay.js';
import { withFlavor } from '@/TextDisplay/withFlavor.js';

import withCollapse from '../Collapse/withCollapse.js';

const DocumentItem = ({
  id,
  item,
  emptyMessage = 'This document is empty…',
  showEmpty,
  showCollapse,
  showTitle,
}) => {
  let component;
  const extra = getDocumentExtra(item.extra);
  if (!extra?.content && showEmpty) {
    component = _jsx(Typography, {
      variant: 'body2',
      sx: { fontStyle: 'italic', color: 'lightgrey' },
      children: emptyMessage,
    });
  } else {
    component = withFlavor({
      content: _jsx(TextDisplay, { id: id, content: extra?.content }),
      flavor: extra?.flavor,
      title: showTitle ? item?.name : undefined,
    });
  }
  if (showCollapse) {
    component = withCollapse({ item })(component);
  }
  return component;
};
export default DocumentItem;
