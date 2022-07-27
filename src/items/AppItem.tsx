import React, { Component } from 'react';
import clsx from 'clsx';
import { Record, RecordOf } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { getAppExtra } from '../utils/itemExtra';
import qs from 'qs';
import Loader from '../Loader';
import withResizing from './withResizing';
import {
  APP_ITEM_FRAME_BORDER,
  APP_ITEM_WIDTH,
  DEFAULT_PERMISSION,
  ITEM_MAX_HEIGHT,
} from '../constants';
import withCaption from './withCaption';
import type { AppItemExtra, Item, Member, UUID } from '../types';
import { UseMutateAsyncFunction } from 'react-query';

const buildPostMessageKeys = (itemId: UUID): { [key: string]: string } => ({
  GET_CONTEXT_SUCCESS: `GET_CONTEXT_SUCCESS_${itemId}`,
  GET_CONTEXT_FAILURE: `GET_CONTEXT_FAILURE_${itemId}`,
  GET_CONTEXT: `GET_CONTEXT_${itemId}`,
  GET_AUTH_TOKEN: `GET_AUTH_TOKEN_${itemId}`,
  GET_AUTH_TOKEN_SUCCESS: `GET_AUTH_TOKEN_SUCCESS_${itemId}`,
  GET_AUTH_TOKEN_FAILURE: `GET_AUTH_TOKEN_FAILURE_${itemId}`,
});

type Token = string;

interface AppItemProps {
  item: RecordOf<Item<AppItemExtra>>;
  member: Record<Member>;
  lang?: string;
  context?: string;
  permission?: string;
  apiHost: string;
  id?: string;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  onSettingsUpdate: UseMutateAsyncFunction<
    Item<AppItemExtra>,
    unknown,
    Partial<Item<AppItemExtra>>,
    unknown
  >;
  // todo: one of enum
  mode?: string;
  saveButtonId?: string;
  classes: {
    iframe: string;
  };
  height?: number | string;
  requestApiAccessToken: (
    args: { id: string; app: string; origin: string },
    queryConfig: { API_HOST: string },
  ) => Promise<{ token: string }>;
  isResizable?: boolean;
}

interface AppItemState {
  channel?: MessageChannel;
  iframeIsLoading: boolean;
  url?: string;
  height: number | string;
}

const styles = {
  iframe: {
    height: ITEM_MAX_HEIGHT,
    maxHeight: ITEM_MAX_HEIGHT,
  },
};

class AppItem extends Component<AppItemProps> {
  static defaultProps = {
    editCaption: false,
    showCaption: true,
    // todo: get this value from common graasp constants
    permission: DEFAULT_PERMISSION,
    isResizable: false,
  };

  state: AppItemState = {
    iframeIsLoading: true,
    height: this.props.height ?? '100%',
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
      // eslint-disable-next-line react/no-did-update-set-state
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
      case POST_MESSAGE_KEYS.GET_AUTH_TOKEN:
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
            memberId: member?.get('id'),
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
      id,
      showCaption,
      onSaveCaption,
      saveButtonId,
      editCaption,
      classes,
      isResizable,
    } = this.props;
    const { iframeIsLoading, url, height } = this.state;

    const onLoad = iframeIsLoading
      ? (): void => {
          this.setState({ iframeIsLoading: false });
          // TODO: set dynamic height
          // if (this.iframeRef?.current?.contentWindow) {
          // this.setState({
          //   height:
          //     this.iframeRef.current.contentWindow.document.body.scrollHeight,
          // });
          // }
        }
      : undefined;

    const appUrl = `${url}${qs.stringify(
      { itemId: item?.id },
      {
        addQueryPrefix: true,
      },
    )}`;

    const iframe = (
      <iframe
        id={id}
        title={item?.name}
        onLoad={onLoad}
        ref={this.iframeRef}
        width={APP_ITEM_WIDTH}
        height='100%'
        src={appUrl}
        frameBorder={APP_ITEM_FRAME_BORDER}
        className={clsx({ [classes.iframe]: !isResizable })}
      />
    );

    const component = (
      <>
        {iframeIsLoading && <Loader />}
        {isResizable ? (
          <div>
            {withResizing({
              height,
            })(iframe)}
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

export default withStyles(styles)(React.memo(AppItem));
