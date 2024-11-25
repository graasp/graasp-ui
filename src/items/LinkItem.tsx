import { Alert, Box, Link as MUILink, styled } from '@mui/material';

import { Fragment, memo, useEffect, useState } from 'react';

import { LinkItemType, getLinkExtra } from '@graasp/sdk';

import LinkCard from '@/Card/LinkCard.js';

import withCollapse from '../Collapse/withCollapse.js';
import { DEFAULT_LINK_SHOW_BUTTON } from '../constants.js';
import { ITEM_MAX_HEIGHT } from './constants.js';
import { iframeCommonStyles } from './iframeStyles.js';
import withCaption from './withCaption.js';
import withResizing from './withResizing.js';

const StyledIFrame = styled('iframe')<{
  isResizable?: boolean;
  height?: string | number;
}>(({ isResizable, height }) => ({
  ...iframeCommonStyles,
  maxHeight: !isResizable ? ITEM_MAX_HEIGHT : undefined,
  height: !isResizable ? height : '100%',
}));

type LinkItemProps = {
  /**
   * Id of the component used for testing
   */
  id?: string;
  /**
   * Id of the current member used for saving the resizing preferences
   */
  memberId?: string;
  errorMessage?: string;
  height?: number | string;
  /**
   * whether the link can be resized
   */
  isResizable?: boolean;
  item: LinkItemType;
  /**
   * Thumbnail url of the item
   */
  thumbnail?: string;
  loadingMessage?: string;

  /**
   * whether the caption should be displayed
   */
  showCaption?: boolean;
  /**
   * whether the iframe should be displayed
   */
  showIframe?: boolean;
  /**
   * whether the button should be displayed
   */
  showButton?: boolean;
  /**
   * whether the component should be collapse
   */
  showCollapse?: boolean;

  onClick?: () => void;
  onCollapse?: (c: boolean) => void;
};

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

type LinkIframeProps = {
  id?: string;
  title?: string;
  url: string;
  height: string | number;
  isResizable: boolean;
  isLoading: boolean;
  onDoneLoading: () => void;
  itemId: string;
  memberId?: string;
  loadingMessage: string;
};
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
}: LinkIframeProps): JSX.Element | null => {
  const iframe = (
    <StyledIFrame
      sx={{ display: isLoading ? 'unset' : 'block' }}
      height={height}
      width='100%'
      id={id}
      isResizable={isResizable}
      onLoad={onDoneLoading}
      src={url}
      title={title}
    />
  );

  const ResizableLink = withResizing({
    height,
    component: iframe,
    memberId,
    itemId,
  });

  return (
    <>
      <IFrameContainer sx={{ display: isLoading ? 'flex' : 'none' }}>
        {loadingMessage}
      </IFrameContainer>
      {isResizable ? <ResizableLink /> : iframe}
    </>
  );
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
  onCollapse,
}: LinkItemProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight);

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

  const getComponent = (): JSX.Element => {
    if (!url) {
      return <Alert severity='error'>{errorMessage}</Alert>;
    }

    const isExternal = new URL(url).origin !== window.location.origin;
    const linkCard = (
      <LinkCard
        id={id}
        thumbnail={thumbnail ?? item.extra.embeddedLink.icons?.[0]}
        title={item.name}
        url={url}
        description={item.extra.embeddedLink.description ?? ''}
        onClick={onClick}
        isExternal={isExternal}
      />
    );

    if (showIframe) {
      // for rich media we use the provided html
      // this is highly unsafe, and could allow XSS vulnerability if the backend does not protect this property
      if (html) {
        return (
          <Box
            // this is allows for the box to not really exist and instead display the children box
            // we can not get rid of this div as we need a way to attach the onClick handler for registering actions
            display='contents'
            id={id}
            onClick={onClick}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }

      return (
        <Fragment>
          <LinkIframe
            id={id}
            url={url}
            isResizable={isResizable}
            height={height}
            title={name}
            isLoading={isLoading}
            onDoneLoading={() => setIsLoading(false)}
            itemId={itemId}
            memberId={memberId}
            loadingMessage={loadingMessage}
          />
          {showButton && linkCard}
        </Fragment>
      );
    }

    if (showButton) {
      return linkCard;
    }

    return (
      <MUILink href={url} onClick={onClick}>
        {url}
      </MUILink>
    );
  };

  let linkItem = getComponent();

  if (showCaption) {
    linkItem = CaptionWrapper(linkItem);
  }

  if (showCollapse) {
    linkItem = withCollapse({ item: { name }, onCollapse })(linkItem);
  }

  return linkItem;
};

export default memo(LinkItem);
