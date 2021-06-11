import React, { useRef, useEffect, useState } from 'react';
import { getAppExtra } from '../utils/itemExtra';
import Loader from '../Loader';

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

const AppItem = ({ id, item, user, apiHost }) => {
  const iframeRef = useRef();
  const [iframeIsLoading, setIframeIsLoading] = useState(true);
  const url = getAppExtra(item?.get('extra'))?.url;

  const channel = new MessageChannel();
  const { port1 } = channel;

  const getToken = async ({ app, origin }) => {
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
  const onMessage = async (e) => {
    const { data, origin: requestOrigin } = e;

    // responds only to corresponding app
    if (!url.includes(requestOrigin)) {
      return;
    }

    const { type, payload } = JSON.parse(data);
    if (type === GET_AUTH_TOKEN) {
      const token = await getToken(payload);
      port1.postMessage(
        JSON.stringify({ type: GET_AUTH_TOKEN_SUCCEEDED, payload: { token } }),
      );
    }
  };

  const windowOnMessage = async (e) => {
    const { data, origin: requestOrigin } = e;

    // responds only to corresponding app
    if (!url.includes(requestOrigin)) {
      return;
    }

    // return context data and message channel port to app
    const { type } = JSON.parse(data);
    if (type === GET_CONTEXT) {
      // Listen for messages on port1
      port1.onmessage = onMessage;

      // Transfer port2 to the iframe
      // provide port2 to app and item's data
      iframeRef.current.contentWindow.postMessage(
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

    // further communication will pass through message channel
    // so we can stop listening on message
    window.removeEventListener('message', windowOnMessage);
  };

  useEffect(() => {
    window.addEventListener('message', windowOnMessage);
  }, []);

  return (
    <React.Fragment>
      {iframeIsLoading && <Loader />}
      <iframe
        id={id}
        title={item?.get('name')}
        onLoad={() => setIframeIsLoading(false)}
        ref={iframeRef}
        width='100%'
        height={300}
        src={url}
        frameBorder={0}
      />
    </React.Fragment>
  );
};

export default AppItem;
