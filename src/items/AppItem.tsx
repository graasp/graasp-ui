import { RecordOf } from 'immutable';
import qs from 'qs';

import Skeleton from '@mui/material/Skeleton';

import React, { Component } from 'react';

import { AppItemExtra, Item, getAppExtra } from '@graasp/sdk';

import {
  APP_DEFAULT_HEIGHT,
  APP_ITEM_WIDTH,
  DEFAULT_PERMISSION,
  SCREEN_MAX_HEIGHT,
} from '../constants';
import type { MemberRecord, UUID } from '../types';
import withCaption from './withCaption';
import withResizing, { StyledIFrame } from './withResizing';

const buildPostMessageKeys = (
  itemId: UUID,
): {
  [key: string]: string;
} => ({
  GET_CONTEXT_SUCCESS: `GET_CONTEXT_SUCCESS_${itemId}`,
  GET_CONTEXT_FAILURE: `GET_CONTEXT_FAILURE_${itemId}`,
  GET_CONTEXT: `GET_CONTEXT_${itemId}`,
  GET_AUTH_TOKEN: `GET_AUTH_TOKEN_${itemId}`,
  GET_AUTH_TOKEN_SUCCESS: `GET_AUTH_TOKEN_SUCCESS_${itemId}`,
  GET_AUTH_TOKEN_FAILURE: `GET_AUTH_TOKEN_FAILURE_${itemId}`,
  POST_AUTO_RESIZE: `POST_AUTO_RESIZE_${itemId}`,
});

type Token = string;

export interface AppItemProps {
  /**
   * app api host
   */
  apiHost: string;
  /**
   * corresponding item of the app
   */
  item: RecordOf<Item<AppItemExtra>>;
  /**
   * function to fetch the app token
   */
  requestApiAccessToken: (
    args: { id: string; app: string; origin: string },
    queryConfig: { API_HOST: string },
  ) => Promise<{ token: string }>;
  context?: string;
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
  lang?: string;
  /**
   * signed in member
   */
  member?: MemberRecord;
  // todo: one of enum
  mode?: string;
  onSaveCaption?: (text: string) => void;
  permission?: string;
  /**
   * whether the caption is shown
   */
  showCaption?: boolean;
  saveButtonId?: string;
}

interface AppItemState {
  height: number | string;
  iframeIsLoading: boolean;
  channel?: MessageChannel;
  url?: string;
}

export class AppItem extends Component<AppItemProps> {
  static defaultProps = {
    editCaption: false,
    showCaption: true,
    // todo: get this value from common graasp constants
    permission: DEFAULT_PERMISSION,
    isResizable: false, // by default, use auto-resize
  };

  state: AppItemState = {
    iframeIsLoading: true,
    height: this.props.height ?? APP_DEFAULT_HEIGHT,
  };

  iframeRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: AppItemProps) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount(): void {
    window.addEventListener('message', this.windowOnMessage);
    this.setState({ url: getAppExtra(this.props.item?.extra)?.url });
  }

  componentDidUpdate(prevProps: AppItemProps): void {
    const { item } = this.props;
    const { item: nextItem } = prevProps;
    if (item !== nextItem) {
      this.setState({ url: getAppExtra(item?.extra)?.url });
    }
  }

  shouldComponentUpdate(_: AppItemProps, nextState: AppItemState): boolean {
    if (nextState.channel !== this.state.channel) {
      return false;
    }
    return true;
  }

  getToken = async ({
    app,
    origin,
  }: {
    app: string;
    origin: string;
  }): Promise<Token> => {
    const { item, apiHost, requestApiAccessToken } = this.props;

    // get token from backend
    const { token } = await requestApiAccessToken(
      {
        id: item.id,

        // the app should provide this (in the message)
        // this id is "manually" added as a "registered" app id.
        // each app that uses the API needs one.
        app,
        origin,
      },
      { API_HOST: apiHost },
    );

    return token;
  };

  // receive message from app through MessageChannel
  onMessage = async (e: MessageEvent): Promise<void> => {
    const { data, origin: requestOrigin } = e;
    const { channel, url } = this.state;
    const { item } = this.props;

    const POST_MESSAGE_KEYS = buildPostMessageKeys(item.id);

    // responds only to corresponding app
    if (!url?.includes(requestOrigin)) {
      return;
    }

    const { type, payload } = JSON.parse(data);

    switch (type) {
      case POST_MESSAGE_KEYS.GET_AUTH_TOKEN: {
        // eslint-disable-next-line no-unused-expressions
        channel?.port1.postMessage(
          JSON.stringify({
            type: POST_MESSAGE_KEYS.GET_AUTH_TOKEN_SUCCESS,
            payload: {
              token: await this.getToken(payload),
            },
          }),
        );
        break;
      }

      case POST_MESSAGE_KEYS.POST_AUTO_RESIZE: {
        // item should not be manually resizable
        if (this.props.isResizable) {
          return;
        }
        // iframe must be mounted
        if (this.iframeRef.current === null) {
          return;
        }
        // payload should be number
        if (typeof payload !== 'number') {
          return;
        }
        this.iframeRef.current.height = payload.toString();
        break;
      }
    }
  };

  windowOnMessage = (e: MessageEvent): void => {
    const { item, member, apiHost, lang, context, permission } = this.props;
    const { url } = this.state;
    const { data, origin: requestOrigin } = e;

    const POST_MESSAGE_KEYS = buildPostMessageKeys(item.id);

    // responds only to corresponding app
    if (!url?.includes(requestOrigin)) {
      return;
    }

    // return context data and message channel port to app
    const { type } = JSON.parse(data);
    if (type === POST_MESSAGE_KEYS.GET_CONTEXT) {
      // create/reset channel and
      // Listen for messages on port1
      const channel = new MessageChannel();
      const { port1 } = channel;
      this.setState({ channel });
      port1.onmessage = this.onMessage;

      // Transfer port2 to the iframe
      // provide port2 to app and item's data
      // eslint-disable-next-line no-unused-expressions
      this.iframeRef?.current?.contentWindow?.postMessage(
        JSON.stringify({
          type: POST_MESSAGE_KEYS.GET_CONTEXT_SUCCESS,
          payload: {
            apiHost,
            itemId: item.id,
            settings: item.settings,
            memberId: member?.id,
            permission,
            lang,
            context,
          },
        }),
        '*',
        [channel.port2],
      );
    }
  };

  render(): JSX.Element {
    const {
      item,
      member,
      id,
      showCaption,
      onSaveCaption,
      saveButtonId,
      editCaption,
      isResizable,
    } = this.props;
    const { iframeIsLoading, url, height } = this.state;

    const onLoad = iframeIsLoading
      ? () => this.setState({ iframeIsLoading: false })
      : undefined;

    const appUrl = `${url}${qs.stringify(
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
        ref={this.iframeRef}
        src={appUrl}
        sx={{ visibility: iframeIsLoading ? 'hidden' : 'visible' }}
        title={item?.name}
        width={APP_ITEM_WIDTH}
        allow='fullscreen'
      />
    );

    const ResizableIframe = withResizing({
      height,
      memberId: member?.id,
      itemId: item.id,
      component: iframe,
    });

    const component = (
      <>
        {iframeIsLoading && (
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
      return withCaption({
        item,
        onSave: onSaveCaption,
        edit: editCaption,
        saveButtonId,
      })(component);
    }

    return component;
  }
}

export default React.memo(AppItem);
