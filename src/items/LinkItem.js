import { Alert, Box, Link as MUILink, styled } from '@mui/material';

import { Fragment, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { getLinkExtra } from '@graasp/sdk';

import LinkCard from '@/Card/LinkCard.js';

import withCollapse from '../Collapse/withCollapse.js';
import { DEFAULT_LINK_SHOW_BUTTON } from '../constants.js';
import { ITEM_MAX_HEIGHT } from './constants.js';
import withCaption from './withCaption.js';
import withResizing, { StyledIFrame } from './withResizing.js';

const IFrameContainer = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: '#eee',
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  height: '100%',
  maxHeight: ITEM_MAX_HEIGHT,
  overflow: 'auto',
}));
const LinkIframe = ({
  id,
  url,
  title,
  height,
  isResizable,
  isLoading,
  onDoneLoading,
  itemId,
  memberId,
  loadingMessage,
}) => {
  const iframe = _jsx(StyledIFrame, {
    sx: { display: isLoading ? 'unset' : 'block' },
    height: height,
    width: '100%',
    id: id,
    isResizable: isResizable,
    onLoad: onDoneLoading,
    src: url,
    title: title,
  });
  const ResizableLink = withResizing({
    height,
    component: iframe,
    memberId,
    itemId,
  });
  return _jsxs(_Fragment, {
    children: [
      _jsx(IFrameContainer, {
        sx: { display: isLoading ? 'flex' : 'none' },
        children: loadingMessage,
      }),
      isResizable ? _jsx(ResizableLink, {}) : iframe,
    ],
  });
};
const LinkItem = ({
  id,
  item,
  thumbnail,
  memberId,
  showCaption = true,
  showIframe = false,
  showButton = DEFAULT_LINK_SHOW_BUTTON,
  loadingMessage = 'Link is Loading...',
  height: defaultHeight = 400,
  errorMessage = 'The link is malformed.',
  isResizable = false,
  showCollapse = false,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState(defaultHeight);
  const { id: itemId, name } = item;
  const extra = getLinkExtra(item.extra);
  const html = extra?.html;
  // default case is an iframe with given link
  const url = extra?.url;
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [url]);
  const CaptionWrapper = withCaption({
    item,
  });
  const getComponent = () => {
    if (!url) {
      return _jsx(Alert, { severity: 'error', children: errorMessage });
    }
    const isExternal = new URL(url).origin !== window.location.origin;
    const linkCard = _jsx(LinkCard, {
      id: id,
      thumbnail: thumbnail ?? item.extra.embeddedLink.icons?.[0],
      title: item.name,
      url: url,
      description: item.extra.embeddedLink.description ?? '',
      onClick: onClick,
      isExternal: isExternal,
    });
    if (showIframe) {
      // for rich media we use the provided html
      // this is highly unsafe, and could allow XSS vulnerability if the backend does not protect this property
      if (html) {
        return _jsx(
          Box,
          // this is allows for the box to not really exist and instead display the children box
          // we can not get rid of this div as we need a way to attach the onClick handler for registering actions
          {
            // this is allows for the box to not really exist and instead display the children box
            // we can not get rid of this div as we need a way to attach the onClick handler for registering actions
            display: 'contents',
            id: id,
            onClick: onClick,
            dangerouslySetInnerHTML: { __html: html },
          },
        );
      }
      return _jsxs(Fragment, {
        children: [
          _jsx(LinkIframe, {
            id: id,
            url: url,
            isResizable: isResizable,
            height: height,
            title: name,
            isLoading: isLoading,
            onDoneLoading: () => setIsLoading(false),
            itemId: itemId,
            memberId: memberId,
            loadingMessage: loadingMessage,
          }),
          showButton && linkCard,
        ],
      });
    }
    if (showButton) {
      return linkCard;
    }
    return _jsx(MUILink, {
      component: Link,
      to: url,
      onClick: onClick,
      children: url,
    });
  };
  let linkItem = getComponent();
  if (showCaption) {
    linkItem = CaptionWrapper(linkItem);
  }
  if (showCollapse) {
    linkItem = withCollapse({ item: { name } })(linkItem);
  }
  return linkItem;
};
export default memo(LinkItem);
