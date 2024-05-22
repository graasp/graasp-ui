import { Link as MUILink, styled } from '@mui/material';
import Alert from '@mui/material/Alert';

import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { LinkItemType, getLinkExtra } from '@graasp/sdk';

import { LinkCard } from '..';
import withCollapse from '../Collapse/withCollapse';
import { DEFAULT_LINK_SHOW_BUTTON } from '../constants';
import { ITEM_MAX_HEIGHT } from './constants';
import withCaption from './withCaption';
import withResizing, { StyledIFrame } from './withResizing';

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
  // openLinkMessage?: string;

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
};

const IFrameContainer = styled('div')({
  position: 'relative',
  maxHeight: ITEM_MAX_HEIGHT,
  overflow: 'auto',
});

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
      <IFrameContainer hidden={!isLoading} style={{ height }}>
        {loadingMessage}
      </IFrameContainer>
      <div hidden={isLoading}>
        {isResizable ? (
          <div>
            <ResizableLink />
          </div>
        ) : (
          iframe
        )}
      </div>
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
  // openLinkMessage = 'Click here to open the link manually',
  height: defaultHeight = 400,
  errorMessage = 'The link is malformed.',
  isResizable = false,
  showCollapse = false,
  onClick,
}: LinkItemProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight);

  const { id: itemId, name } = item;
  const extra = getLinkExtra(item.extra);
  const html = extra?.html;

  // default case is an iframe with given link
  const url = extra?.url;

  const CaptionWrapper = withCaption({
    item,
  });

  const getComponent = (): JSX.Element => {
    if (!url) {
      return <Alert severity='error'>{errorMessage}</Alert>;
    }

    const linkCard = (
      <LinkCard
        thumbnail={thumbnail ?? item.extra.embeddedLink.icons?.[0]}
        title={item.name}
        url={url}
        description={item.extra.embeddedLink.description ?? ''}
        onClick={onClick}
      />
    );

    if (showIframe) {
      // for rich media we use the provided html
      // this is highly unsafe, and could allow XSS vulnerability if the backend does not protect this property
      if (html) {
        return (
          <div
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
          {(isLoading || showButton) && linkCard}
        </Fragment>
      );
    }

    if (showButton) {
      return linkCard;
    }

    return (
      <MUILink component={Link} to={url} onClick={onClick}>
        {url}
      </MUILink>
    );
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

export default React.memo(LinkItem);
