import { RecordOf } from 'immutable';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/material';
import Alert from '@mui/material/Alert';

import React, { FC, Fragment, useRef, useState } from 'react';

import { Item, redirect } from '@graasp/sdk';

import Button from '../buttons/Button';
import { ITEM_MAX_HEIGHT } from '../constants';
import type { EmbeddedLinkItemExtra, MemberRecord } from '../types';
import { getEmbeddedLinkExtra } from '../utils/itemExtra';
import withCaption from './withCaption';
import withResizing, { StyledIFrame } from './withResizing';

export interface LinkItemProps {
  member?: MemberRecord;
  editCaption?: boolean;
  errorMessage?: string;
  height?: number | string;
  /**
   * whether the link can be resized
   */
  isResizable?: boolean;
  item: RecordOf<Item<EmbeddedLinkItemExtra>>;
  loadingMessage?: string;
  onSaveCaption?: (text: string) => void;
  openLinkMessage?: string;
  /**
   * id of the save button
   */
  saveButtonId?: string;
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
}

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

const LinkItem: FC<LinkItemProps> = ({
  item,
  member,
  onSaveCaption,
  saveButtonId,
  editCaption = false,
  showCaption = true,
  showIframe = true,
  showButton = false,
  loadingMessage = 'Link is Loading...',
  openLinkMessage = 'Click here to open the link manually',
  height: defaultHeight = 400,
  errorMessage = 'The link is malformed.',
  isResizable = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const id = item.id;
  const extra = getEmbeddedLinkExtra(item.extra);

  const CaptionWrapper = withCaption({
    item,
    onSave: onSaveCaption,
    saveButtonId,
    edit: editCaption,
  });

  // if available, display specific player
  const html = extra?.html;
  if (html) {
    const component = (
      <div id={id} dangerouslySetInnerHTML={{ __html: html }} />
    );
    if (showCaption) {
      return CaptionWrapper(component);
    }
    return component;
  }

  // default case is an iframe with given link
  const url = extra?.url;
  const name = item.name;

  if (!url) {
    return <Alert severity='error'>{errorMessage}</Alert>;
  }

  const handleLoad = (): void => {
    setIsLoading(false);
    // TODO: set dynamic height
    // if (iframeRef?.current?.contentWindow) {
    //   setHeight(iframeRef.current.contentWindow.document.body.scrollHeight);
    // }
  };

  const onClick = (): void => {
    redirect(url, { openInNewTab: true });
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
      memberId: member?.id,
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

  const button = (
    <StyledLinkButton onClick={onClick} startIcon={<OpenInNewIcon />}>
      {item.name ?? openLinkMessage}
    </StyledLinkButton>
  );

  const component = (
    <Fragment>
      {renderIframe()}
      {(isLoading || showButton) && button}
    </Fragment>
  );

  if (showCaption) {
    return CaptionWrapper(component);
  }

  return component;
};

export default React.memo(LinkItem);
