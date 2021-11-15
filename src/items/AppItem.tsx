import React, { Component } from 'react';
import { Record } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { getAppExtra } from '../utils/itemExtra';
import Loader from '../Loader';
import {
  APP_ITEM_FRAME_BORDER,
  APP_ITEM_WIDTH,
  ITEM_MAX_HEIGHT,
} from '../constants';
import withCaption from './withCaption';
import type { AppItemExtra, Item, Member, UUID } from '../types';

export const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN';
export const GET_AUTH_TOKEN_SUCCEEDED = 'GET_AUTH_TOKEN_SUCCEEDED';
export const GET_ITEM_DATA = 'GET_ITEM_DATA';
export const GET_ITEM_DATA_SUCCEEDED = 'GET_ITEM_DATA_SUCCEEDED';
export const GET_CONTEXT = 'GET_CONTEXT';
export const GET_CONTEXT_SUCCEEDED = 'GET_CONTEXT_SUCCEEDED';

type Token = string;

type TokenResponse = {
  token: Token;
};

interface AppItemProps {
  item: Record<Item<AppItemExtra>>;
  user: Record<Member>;
  apiHost: string;
  id?: string;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  // todo: one of enum
  mode?: string;
  saveButtonId?: string;
  classes: {
    iframe: string;
  };
}

interface AppItemState {
  channel?: MessageChannel;
  iframeIsLoading: boolean;
  url?: string;
  height: number | string;
}

const styles = {
  iframe: {
    maxHeight: ITEM_MAX_HEIGHT,
  },
};

const requestApiAccessToken = async ({
  id,
  origin,
  app,
  apiHost,
}: {
  id: UUID;
  origin: string;
  app: string;
  apiHost: string;
}): Promise<TokenResponse> => {
  const res = await fetch(`${apiHost}/app-items/${id}/api-access-token`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin, app }),
  });

  return res.json();
};

class AppItem extends Component<AppItemProps> {
  static defaultProps = {
    onSaveCaption: null,
    editCaption: false,
    showCaption: true,
    saveButtonId: null,
    // todo: get this value from common graasp constants
    mode: 'student',
  };

  state: AppItemState = {
    iframeIsLoading: true,
    height: '100%',
  };

  iframeRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: AppItemProps) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount(): void {
    window.addEventListener('message', this.windowOnMessage);
    this.setState({ url: getAppExtra(this.props.item?.get('extra'))?.url });
  }

  componentDidUpdate(prevProps: AppItemProps): void {
    const { item } = this.props;
    const { item: nextItem } = prevProps;
    if (item !== nextItem) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ url: getAppExtra(item?.get('extra'))?.url });
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
    const { item, apiHost } = this.props;

    // get token from backend
    const { token } = await requestApiAccessToken({
      id: item.get('id'),
      apiHost,
      // the app should provide this (in the message)
      // this id is "manually" added as a "registered" app id.
      // each app that uses the API needs one.
      app,
      origin,
    });

    return token;
  };

  // receive message from app through MessageChannel
  onMessage = async (e: MessageEvent): Promise<void> => {
    const { data, origin: requestOrigin } = e;
    const { channel, url } = this.state;

    // responds only to corresponding app
    if (!url?.includes(requestOrigin)) {
      return;
    }

    const { type, payload } = JSON.parse(data);
    if (type === GET_AUTH_TOKEN) {
      const token = await this.getToken(payload);
      // eslint-disable-next-line no-unused-expressions
      channel?.port1.postMessage(
        JSON.stringify({ type: GET_AUTH_TOKEN_SUCCEEDED, payload: { token } }),
      );
    }
  };

  windowOnMessage = (e: MessageEvent): void => {
    const { item, user, apiHost, mode } = this.props;
    const { url } = this.state;
    const { data, origin: requestOrigin } = e;

    // responds only to corresponding app
    if (!url?.includes(requestOrigin)) {
      return;
    }

    // return context data and message channel port to app
    const { type } = JSON.parse(data);
    if (type === GET_CONTEXT) {
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
        {
          type: GET_CONTEXT_SUCCEEDED,
          payload: {
            itemId: item.get('id'),
            userId: user?.get('id'),
            apiHost,
            mode,
          },
        },
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
    } = this.props;
    const { iframeIsLoading, url, height } = this.state;

    const onLoad = iframeIsLoading
      ? (): void => {
          this.setState({ iframeIsLoading: false });
          if (this.iframeRef?.current?.contentWindow) {
            this.setState({
              height:
                this.iframeRef.current.contentWindow.document.body.scrollHeight,
            });
          }
        }
      : undefined;

    const component = (
      <React.Fragment>
        {iframeIsLoading && <Loader />}
        <iframe
          id={id}
          title={item?.get('name')}
          onLoad={onLoad}
          ref={this.iframeRef}
          width={APP_ITEM_WIDTH}
          height={height}
          src={url}
          frameBorder={APP_ITEM_FRAME_BORDER}
          className={classes.iframe}
        />
      </React.Fragment>
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

export default withStyles(styles)(AppItem);
