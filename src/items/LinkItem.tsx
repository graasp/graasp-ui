import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/material';
import Alert from '@mui/material/Alert';

import React, { Fragment, useRef, useState } from 'react';

import { LinkItemType, getLinkExtra } from '@graasp/sdk';

import withCollapse from '../Collapse/withCollapse';
import { Button } from '../buttons';
import { DEFAULT_LINK_SHOW_BUTTON } from '../constants';
import { ITEM_MAX_HEIGHT } from './constants';
import withCaption from './withCaption';
import withResizing, { StyledIFrame } from './withResizing';

export type LinkItemProps = {
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
  loadingMessage?: string;
  onSaveCaption?: (text: string) => void;
  onCancelCaption?: (text: string) => void;
  openLinkMessage?: string;
  /**
   * id of the save button
   */
  saveButtonId?: string;
  /**
   * id of the cancel button
   */
  cancelButtonId?: string;
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

const StyledLinkButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: theme.spacing(1),
}));

const LinkItem = ({
  item,
  memberId,
  showCaption = true,
  showIframe = false,
  showButton = DEFAULT_LINK_SHOW_BUTTON,
  loadingMessage = 'Link is Loading...',
  openLinkMessage = 'Click here to open the link manually',
  height: defaultHeight = 400,
  errorMessage = 'The link is malformed.',
  isResizable = false,
  showCollapse = false,
  onClick,
}: LinkItemProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const id = item.id;
  const extra = getLinkExtra(item.extra);
  const html = extra?.html;

  // default case is an iframe with given link
  const url = extra?.url;
  const name = item.name;

  const CaptionWrapper = withCaption({
    item,
  });

  const handleLoad = (): void => {
    setIsLoading(false);
  };

  const renderIframe = (): JSX.Element | null => {
    if (!showIframe) {
      return null;
    }

    const iframe = (
      <StyledIFrame
        height={height}
        id={id}
        isResizable={isResizable}
        onLoad={handleLoad}
        ref={iframeRef}
        src={url}
        title={name}
      />
    );

    const ResizableLink = withResizing({
      height,
      component: iframe,
      memberId,
      itemId: item.id,
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

  const getComponent = (): JSX.Element => {
    // if available, display specific player
    if (html) {
      return (
        <div
          id={id}
          onClick={onClick}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    if (!url) {
      return <Alert severity='error'>{errorMessage}</Alert>;
    }

    const button = (
      <StyledLinkButton
        startIcon={<OpenInNewIcon />}
        href={url}
        target='_blank'
        onClick={onClick}
      >
        {item.name ?? openLinkMessage}
      </StyledLinkButton>
    );

    return (
      <Fragment>
        {renderIframe()}
        {(isLoading || showButton) && button}
      </Fragment>
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
