import React, { FC, useState, useRef, Fragment } from 'react';
import { Record } from 'immutable';
import Alert from '@mui/material/Alert';
import { redirect } from '@graasp/utils';
import { getEmbeddedLinkExtra } from '../utils/itemExtra';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '../Button';
import withCaption from './withCaption';
import { ITEM_MAX_HEIGHT } from '../constants';
import type { EmbeddedLinkItemExtra, Item } from '../types';
import { styled } from '@mui/material';

interface LinkItemProps {
  item: Record<Item<EmbeddedLinkItemExtra>>;
  height?: number | string;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  saveButtonId?: string;
  loadingMessage?: string;
  openLinkMessage?: string;
  errorMessage?: string;
}

const StyledIFrame = styled('iframe')({
  width: '100%',
  border: 'none',
  maxHeight: ITEM_MAX_HEIGHT,
});

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
  onSaveCaption,
  saveButtonId,
  editCaption = false,
  showCaption = true,
  loadingMessage = 'Link is Loading...',
  openLinkMessage = 'Click here to open the link manually',
  height: defaultHeight,
  errorMessage = 'The link is malformed.',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight ?? '100%');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const id = item.get('id');
  const extra = getEmbeddedLinkExtra(item.get('extra'));

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
  const name = item.get('name');

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

  const component = (
    <Fragment>
      <IFrameContainer hidden={!isLoading} style={{ height }}>
        {loadingMessage}
      </IFrameContainer>
      <IFrameContainer hidden={isLoading} style={{ height }}>
        <StyledIFrame
          id={id}
          title={name}
          src={url}
          onLoad={handleLoad}
          height='100%'
          ref={iframeRef}
        />
      </IFrameContainer>
      {isLoading && (
        <StyledLinkButton onClick={onClick} startIcon={<OpenInNewIcon />}>
          {openLinkMessage}
        </StyledLinkButton>
      )}
    </Fragment>
  );

  if (showCaption) {
    return CaptionWrapper(component);
  }

  return component;
};

export default React.memo(LinkItem);
