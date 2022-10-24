import { styled } from '@mui/material';

import React, { FC, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

import {
  getIframeResizeHeightCookie,
  setIframeResizeHeightCookie,
} from '@graasp/sdk';

import { IFRAME_MIN_HEIGHT, ITEM_MAX_HEIGHT } from '../constants';
import ResizingIcon from '../icons/ResizingIcon';
import { UUID } from '../types';

export const StyledIFrame = styled('iframe')<{
  isResizable?: boolean;
  height: string | number;
}>(({ isResizable, height }) =>
  isResizable
    ? {
        width: '100%',
        border: 'none',
        maxHeight: !isResizable ? ITEM_MAX_HEIGHT : undefined,
        height: !isResizable ? height : '100%',
      }
    : {},
);

export interface WithResizingProps {
  height: string | number;
  component: JSX.Element;
  memberId?: UUID;
  itemId: UUID;
}

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
  resizableContainer: {
    paddingBottom: '35px',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
};

const withResizing =
  <P extends object>({
    height,
    component,
    memberId,
    itemId,
  }: WithResizingProps): FC<P> =>
  () => {
    const [variableHeight, setVariableHeight] = useState<number | string>(
      getIframeResizeHeightCookie({ memberId, itemId }) ?? height,
    );

    useEffect(() => {
      setIframeResizeHeightCookie({ memberId, itemId }, variableHeight);
    }, [variableHeight]);

    return (
      <div style={resizeHandleStyles.resizableContainer}>
        <Rnd
          style={{ position: 'relative' }}
          disableDragging
          enableResizing={{ bottom: true }}
          default={{
            width: '100%',
            height: variableHeight,
            x: 0,
            y: 0,
          }}
          minHeight={IFRAME_MIN_HEIGHT}
          resizeHandleComponent={{ bottom: <ResizingIcon /> }}
          resizeHandleStyles={{
            bottom: resizeHandleStyles.resizeHandleComponent,
          }}
          onResizeStop={(_e, _direction, ref) => {
            setVariableHeight(ref.style.height);
          }}
        >
          {component}
        </Rnd>
      </div>
    );
  };

export default withResizing;
