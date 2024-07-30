import { useEffect } from 'react';

const buildPostMessageKeys = (itemId) => ({
  GET_CONTEXT_SUCCESS: `GET_CONTEXT_SUCCESS_${itemId}`,
  GET_CONTEXT_FAILURE: `GET_CONTEXT_FAILURE_${itemId}`,
  GET_CONTEXT: `GET_CONTEXT_${itemId}`,
  GET_AUTH_TOKEN: `GET_AUTH_TOKEN_${itemId}`,
  GET_AUTH_TOKEN_SUCCESS: `GET_AUTH_TOKEN_SUCCESS_${itemId}`,
  GET_AUTH_TOKEN_FAILURE: `GET_AUTH_TOKEN_FAILURE_${itemId}`,
  POST_AUTO_RESIZE: `POST_AUTO_RESIZE_${itemId}`,
});
const useAppCommunication = ({
  item,
  contextPayload,
  appUrl,
  iFrameRef,
  requestApiAccessToken,
}) => {
  useEffect(() => {
    // receive message from app through MessageChannel
    const setupOnMessage = (port) => async (e) => {
      const { data, origin: requestOrigin } = e;
      const POST_MESSAGE_KEYS = buildPostMessageKeys(item.id);
      // responds only to corresponding app
      if (!appUrl?.includes(requestOrigin)) {
        return;
      }
      const { type, payload } = JSON.parse(data);
      switch (type) {
        case POST_MESSAGE_KEYS.GET_AUTH_TOKEN: {
          // eslint-disable-next-line no-unused-expressions
          port.postMessage(
            JSON.stringify({
              type: POST_MESSAGE_KEYS.GET_AUTH_TOKEN_SUCCESS,
              payload: await requestApiAccessToken({
                id: item.id,
                ...payload,
              }),
            }),
          );
          break;
        }
        case POST_MESSAGE_KEYS.POST_AUTO_RESIZE: {
          // item should not be manually resizable
          if (item.settings.isResizable) {
            return;
          }
          // iframe must be mounted
          if (iFrameRef.current === null) {
            return;
          }
          // payload should be number
          if (typeof payload !== 'number') {
            return;
          }
          iFrameRef.current.height = payload.toString();
          break;
        }
      }
    };
    const windowOnMessage = (e) => {
      const { data, origin: requestOrigin } = e;
      const POST_MESSAGE_KEYS = buildPostMessageKeys(item.id);
      // responds only to corresponding app
      if (!appUrl?.includes(requestOrigin)) {
        return;
      }
      // return context data and message channel port to app
      const { type } = JSON.parse(data);
      if (type === POST_MESSAGE_KEYS.GET_CONTEXT) {
        // create/reset channel and
        // Listen for messages on port1
        const channel = new MessageChannel();
        const { port1 } = channel;
        port1.onmessage = setupOnMessage(port1);
        // ensure to only send the message to the domain where the app is hosted for security reasons
        const targetOrigin = new URL(appUrl).origin;
        // Transfer port2 to the iframe
        // provide port2 to app and item's data
        // eslint-disable-next-line no-unused-expressions
        iFrameRef?.current?.contentWindow?.postMessage(
          JSON.stringify({
            type: POST_MESSAGE_KEYS.GET_CONTEXT_SUCCESS,
            payload: contextPayload,
          }),
          targetOrigin,
          [channel.port2],
        );
      }
    };
    window.addEventListener('message', windowOnMessage);
    return () => window.removeEventListener('message', windowOnMessage);
  }, [item, iFrameRef]);
};
export { useAppCommunication };
