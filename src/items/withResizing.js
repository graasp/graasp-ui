import { Box, styled } from '@mui/material';

import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { jsx as _jsx } from 'react/jsx-runtime';

import {
  getIframeResizeHeightCookie,
  setIframeResizeHeightCookie,
} from '@graasp/sdk';

import { IFRAME_MIN_HEIGHT } from '../constants.js';
import ResizingIcon from '../icons/ResizingIcon.js';
import { ITEM_MAX_HEIGHT } from './constants.js';

const iframeCommonStyles = {
  // remove ugly borders
  border: 'none',
  width: '100%',
};
export const StyledIFrame = styled('iframe')(({ isResizable, height }) => ({
  ...iframeCommonStyles,
  maxHeight: !isResizable ? ITEM_MAX_HEIGHT : undefined,
  height: !isResizable ? height : '100%',
}));
export const AppIFrame = styled('iframe')(({ isResizable }) => ({
  ...iframeCommonStyles,
  /**
   * IMPORTANT to not override the height when using dynamic sizing
   * The present styles are applied with higher specificity, so the dynamic height
   * provided by the app using the resizing mechanism is ignored.
   */
  height: !isResizable ? undefined : '100%',
}));
const resizeHandleStyles = {
  resizeHandleComponent: {
    height: '24px',
    bottom: '-32px',
    width: '23px',
    marginRight: 'auto',
    marginLeft: 'auto',
    left: '0',
    right: '0',
  },
};
const withResizing =
  ({ height, component, memberId, itemId }) =>
  () => {
    const [variableHeight, setVariableHeight] = useState(
      getIframeResizeHeightCookie({ memberId, itemId }) ?? height,
    );
    useEffect(() => {
      setIframeResizeHeightCookie({ memberId, itemId }, variableHeight);
    }, [variableHeight]);
    return _jsx(Box, {
      width: '100%',
      sx: {
        paddingBottom: '35px',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      },
      children: _jsx(Rnd, {
        style: { position: 'relative' },
        disableDragging: true,
        enableResizing: { bottom: true },
        default: {
          width: '100%',
          height: variableHeight,
          x: 0,
          y: 0,
        },
        minHeight: IFRAME_MIN_HEIGHT,
        resizeHandleComponent: { bottom: _jsx(ResizingIcon, {}) },
        resizeHandleStyles: {
          bottom: resizeHandleStyles.resizeHandleComponent,
        },
        onResizeStop: (_e, _direction, ref) => {
          setVariableHeight(ref.style.height);
        },
        children: component,
      }),
    });
  };
export default withResizing;
