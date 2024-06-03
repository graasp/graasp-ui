import Skeleton from '@mui/material/Skeleton';

import React, { useMemo, useRef, useState } from 'react';

import {
  AppItemType,
  Member,
  appendQueryParamToUrl,
  getAppExtra,
} from '@graasp/sdk';

import withCollapse from '../Collapse/withCollapse';
import { SCREEN_MAX_HEIGHT } from '../constants';
import { ContextPayload, Token, useAppCommunication } from './appItemHooks';
import withCaption from './withCaption';
import withResizing, { AppIFrame } from './withResizing';

const DEFAULT_APP_HEIGHT = 400;
const APP_ITEM_WIDTH = '100%';

type AppItemProps = {
  /**
   * corresponding item of the app
   */
  item: AppItemType;
  /**
   * function to fetch the app token
   */
  requestApiAccessToken: (args: {
    id: string;
    key: string;
    origin: string;
  }) => Promise<{ token: Token }>;
  /**
   * context passed to the app
   */
  contextPayload: ContextPayload;
  /**
   * app height
   */
  height?: number | string;
  /**
   * id prop passed to the iframe
   */
  frameId?: string;
  /**
   * Whether manual resize is enabled (as opposed to automatic resize, default)
   */
  isResizable?: boolean;
  /**
   * id of the member currently signed in
   */
  memberId?: Member['id'];
  /**
   * Whether the caption is shown
   */
  showCaption?: boolean;
  /**
   * Whether the item should be shown in a collapsible element
   */
  showCollapse?: boolean;
};

const AppItem = ({
  item,
  contextPayload,
  requestApiAccessToken,
  height = DEFAULT_APP_HEIGHT,
  frameId,
  memberId,
  isResizable = false,
  showCaption = true,
  showCollapse = false,
}: AppItemProps): JSX.Element => {
  // state
  const [isIFrameLoading, setIsIFrameLoading] = useState(true);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const appUrl = getAppExtra(item.extra)?.url || '';

  useAppCommunication({
    item,
    appUrl,
    iFrameRef,
    contextPayload,
    requestApiAccessToken,
  });

  const onLoad = (): void => setIsIFrameLoading(false);

  const appUrlWithQuery = useMemo(
    () => appendQueryParamToUrl(appUrl, { itemId: item.id }),
    [item],
  );

  const iframe = (
    <AppIFrame
      id={frameId}
      ref={iFrameRef}
      isResizable={isResizable}
      onLoad={onLoad}
      src={appUrlWithQuery}
      sx={{ visibility: isIFrameLoading ? 'hidden' : 'visible' }}
      title={item?.name}
      width={APP_ITEM_WIDTH}
      allow='fullscreen'
    />
  );

  const ResizableIframe = withResizing({
    height,
    memberId: memberId,
    itemId: item.id,
    component: iframe,
  });

  let component = (
    <>
      {isIFrameLoading && (
        <Skeleton
          variant='rectangular'
          width={'100%'}
          height={SCREEN_MAX_HEIGHT}
        />
      )}
      {isResizable ? (
        <div>
          <ResizableIframe />
        </div>
      ) : (
        iframe
      )}
    </>
  );

  if (showCaption) {
    component = withCaption({
      item,
    })(component);
  }

  if (showCollapse) {
    component = withCollapse({ item })(component);
  }

  return component;
};

export default React.memo(AppItem);
