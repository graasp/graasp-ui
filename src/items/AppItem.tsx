import qs from 'qs';

import Skeleton from '@mui/material/Skeleton';

import React, { useRef, useState } from 'react';

import { Context, PermissionLevel, getAppExtra } from '@graasp/sdk';
import { AppItemTypeRecord, MemberRecord } from '@graasp/sdk/frontend';

import withCollapse from '../Collapse/withCollapse';
import { SCREEN_MAX_HEIGHT } from '../constants';
import { Token, useAppCommunication } from './appItemHooks';
import withCaption from './withCaption';
import withResizing, { StyledIFrame } from './withResizing';

const DEFAULT_APP_HEIGHT = 400;
const APP_ITEM_WIDTH = '100%';

type AppItemProps = {
  /**
   * app api host
   */
  apiHost: string;
  /**
   * corresponding item of the app
   */
  item: AppItemTypeRecord;
  /**
   * function to fetch the app token
   */
  requestApiAccessToken: (args: {
    id: string;
    app: string;
    origin: string;
  }) => Promise<{ token: Token }>;
  /**
   * indicate the platform (builder, player, analyzer ...)
   */
  context?: `${Context}` | Context;
  /**
   * whether the caption is being edited
   */
  editCaption?: boolean;
  /**
   * app height
   */
  height?: number | string;
  id?: string;
  /**
   * whether manual resize is enabled (as opposed to automatic resize, default)
   */
  isResizable?: boolean;
  /**
   * Id of the current member used for saving the resizing preferences
   */
  memberId?: string;
  /**
   * @deprecated Use the `memberId` prop to only pass the id
   */
  member?: MemberRecord;
  onSaveCaption?: (text: string) => void;
  onCancelCaption?: (text: string) => void;
  permission?: string;
  /**
   * whether the caption is shown
   */
  showCaption?: boolean;
  saveButtonId?: string;
  showCollapse?: boolean;
  cancelButtonId?: string;
};

const AppItem = ({
  id,
  item,
  memberId,
  member,
  apiHost,
  context,
  requestApiAccessToken,
  height = DEFAULT_APP_HEIGHT,
  editCaption = false,
  showCaption = true,
  permission = PermissionLevel.Read,
  isResizable = false,
  showCollapse,
  onSaveCaption,
  onCancelCaption,
  saveButtonId,
  cancelButtonId,
}: AppItemProps): JSX.Element => {
  // state
  const [isiFrameLoading, setIsiFrameLoading] = useState(true);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const appUrl = getAppExtra(item.extra)?.url || '';

  useAppCommunication({
    item,
    member,
    appUrl,
    apiHost,
    context,
    permission,
    iFrameRef,
    requestApiAccessToken,
  });

  const onLoad = (): void => setIsiFrameLoading(false);

  const appUrlWithQuery = `${appUrl}${qs.stringify(
    { itemId: item?.id },
    {
      addQueryPrefix: true,
    },
  )}`;

  const iframe = (
    <StyledIFrame
      height={height}
      id={id}
      isResizable={isResizable}
      onLoad={onLoad}
      ref={iFrameRef}
      src={appUrlWithQuery}
      sx={{ visibility: isiFrameLoading ? 'hidden' : 'visible' }}
      title={item?.name}
      width={APP_ITEM_WIDTH}
      allow='fullscreen'
    />
  );

  const ResizableIframe = withResizing({
    height,
    memberId: memberId || member?.id,
    itemId: item.id,
    component: iframe,
  });

  let component = (
    <>
      {isiFrameLoading && (
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
      onSave: onSaveCaption,
      onCancel: onCancelCaption,
      edit: editCaption,
      saveButtonId,
      cancelButtonId,
    })(component);
  }

  if (showCollapse) {
    component = withCollapse({ itemName: item.name })(component);
  }

  return component;
};

export default React.memo(AppItem);
