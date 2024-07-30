import { styled } from '@mui/material';

import { useRef, useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

import { ITEM_MAX_HEIGHT } from './constants.js';

const StyledEmbed = styled('embed')({
  maxHeight: ITEM_MAX_HEIGHT,
});
const FilePdf = ({
  url,
  id,
  sx,
  height: defaultHeight,
  showCollapse,
  pdfViewerLink,
}) => {
  const embedRef = useRef(null);
  const [height, setHeight] = useState(defaultHeight ?? '100%');
  const onLoad = (e) => {
    // only set pdf height if not using collapse
    if (!showCollapse) {
      // set pdf height -> probably very high
      const newHeight = e.target?.offsetParent?.scrollHeight;
      newHeight && setHeight(newHeight);
    }
  };
  // use custom pdf viewer if defined
  let urlWithPdfViewer = url;
  if (pdfViewerLink) {
    urlWithPdfViewer = `${pdfViewerLink}${encodeURIComponent(url)}`;
  }
  return _jsx(StyledEmbed, {
    ref: embedRef,
    id: id,
    src: urlWithPdfViewer,
    width: '100%',
    height: height || '100%',
    onLoad: onLoad,
    sx: sx,
  });
};
export default FilePdf;
