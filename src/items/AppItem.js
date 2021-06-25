import React, { Component } from 'react';
import { getAppExtra } from '../utils/itemExtra';
import Loader from '../Loader';
import {
  APP_ITEM_FRAME_BORDER,
  APP_ITEM_HEIGHT,
  APP_ITEM_WIDTH,
} from '../constants';
import withCaption from './withCaption';

export const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN';
export const GET_AUTH_TOKEN_SUCCEEDED = 'GET_AUTH_TOKEN_SUCCEEDED';
export const GET_ITEM_DATA = 'GET_ITEM_DATA';
export const GET_ITEM_DATA_SUCCEEDED = 'GET_ITEM_DATA_SUCCEEDED';
export const GET_CONTEXT = 'GET_CONTEXT';
export const GET_CONTEXT_SUCCEEDED = 'GET_CONTEXT_SUCCEEDED';

const requestApiAccessToken = async ({ id, origin, app, apiHost }) => {
  const res = await fetch(`${apiHost}/items/${id}/app-api-access-token`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin, app }),
  });

  return res.json();
};

class AppItem extends Component {
  static defaultProps = {
    onSaveCaption: null,
    editCaption: false,
    showCaption: true,
    saveButtonId: null,
  };

  state = {
    channel: null,
    iframeIsLoading: true,
    url: null,
  };

  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('message', this.windowOnMessage);
    this.setState({ url: getAppExtra(this.props.item?.get('extra'))?.url });
  }

  componentDidUpdate(prevProps) {
    const { item } = this.props;
    const { item: nextItem } = prevProps;
    if (item !== nextItem) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ url: getAppExtra(item?.get('extra'))?.url });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.channel !== this.state.channel) {
      return false;
    }
    return true;
  }

  getToken = async ({ app, origin }) => {
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
  onMessage = async (e) => {
    const { data, origin: requestOrigin } = e;
    const { channel, url } = this.state;

    // responds only to corresponding app
    if (!url.includes(requestOrigin)) {
      return;
    }

    const { type, payload } = JSON.parse(data);
    if (type === GET_AUTH_TOKEN) {
      const token = await this.getToken(payload);
      channel.port1.postMessage(
        JSON.stringify({ type: GET_AUTH_TOKEN_SUCCEEDED, payload: { token } }),
      );
    }
  };

  windowOnMessage = async (e) => {
    const { item, user, apiHost } = this.props;
    const { url } = this.state;
    const { data, origin: requestOrigin } = e;

    // responds only to corresponding app
    if (!url.includes(requestOrigin)) {
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
      this.iframeRef.current.contentWindow.postMessage(
        {
          type: GET_CONTEXT_SUCCEEDED,
          payload: {
            itemId: item.get('id'),
            userId: user?.get('id'),
            apiHost,
            mode: 'student', // todo: to change
          },
        },
        '*',
        [channel.port2],
      );
    }
  };

  render() {
    const { item, id, showCaption, onSaveCaption, saveButtonId, editCaption } =
      this.props;
    const { iframeIsLoading, url } = this.state;

    const onLoad = iframeIsLoading
      ? () => {
          this.setState({ iframeIsLoading: false });
        }
      : null;

    const component = (
      <React.Fragment>
        {iframeIsLoading && <Loader />}
        <iframe
          id={id}
          title={item?.get('name')}
          onLoad={onLoad}
          ref={this.iframeRef}
          width={APP_ITEM_WIDTH}
          // todo: dynamic height depending on app
          height={APP_ITEM_HEIGHT}
          src={url}
          frameBorder={APP_ITEM_FRAME_BORDER}
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

export default AppItem;
