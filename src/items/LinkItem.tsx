import React, { FC, useState, useRef } from 'react';
import { Record } from 'immutable';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { getEmbeddedLinkExtra } from '../utils/itemExtra';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import withCaption from './withCaption';
import {
  ITEM_MAX_HEIGHT,
  LINK_BUTTON_CONTAINER_BACKGROUND_COLOR,
  LINK_BUTTON_CONTAINER_WIDTH,
  LINK_BUTTON_ICON_COLOR,
  LINK_BUTTON_ICON_FONT_SIZE,
} from '../constants';
import type { Item } from '../types';

interface LinkItemProps {
  item: Record<Item>;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  saveButtonId?: string;
  loadingMessage?: string;
  openLinkMessage?: string;
}

const useStyles = makeStyles((theme) => ({
  iframe: {
    width: '100%',
    border: 'none',
    maxHeight: ITEM_MAX_HEIGHT,
  },
  linkButtonContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: LINK_BUTTON_CONTAINER_WIDTH,
    backgroundColor: LINK_BUTTON_CONTAINER_BACKGROUND_COLOR,
  },
  linkButton: {
    padding: theme.spacing(0.25),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  linkButtonIcon: {
    color: LINK_BUTTON_ICON_COLOR,
    fontSize: LINK_BUTTON_ICON_FONT_SIZE,
  },
  iframeContainer: {
    position: 'relative',
    maxHeight: ITEM_MAX_HEIGHT,
    overflow: 'auto',
  },
}));

const LinkItem: FC<LinkItemProps> = ({
  item,
  onSaveCaption,
  saveButtonId,
  editCaption = false,
  showCaption = true,
  loadingMessage = 'Link is Loading.',
  openLinkMessage = 'Click here to open link manually.',
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState<string | number>('100%');
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
    // eslint-disable-next-line react/no-danger
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

  const handleLoad = (): void => {
    setIsLoading(false);
    // set dynamic height
    if (iframeRef?.current?.contentWindow) {
      setHeight(iframeRef.current.contentWindow.document.body.scrollHeight);
    }
  };

  const component = (
    <React.Fragment>
      <div
        hidden={!isLoading}
        className={classes.iframeContainer}
        style={{ height: height || '100%' }}
      >
        {loadingMessage}
        <a href={url}>{openLinkMessage}</a>
      </div>
      <div
        hidden={isLoading}
        className={classes.iframeContainer}
        style={{ height: height || '100%' }}
      >
        <iframe
          id={id}
          className={classes.iframe}
          title={name}
          src={url}
          onLoad={handleLoad}
          height='100%'
          ref={iframeRef}
        />
        <div className={classes.linkButtonContainer}>
          <IconButton className={classes.linkButton}>
            <a href={url} target='_blank' rel='noreferrer'>
              <OpenInNewIcon className={classes.linkButtonIcon} />
            </a>
          </IconButton>
        </div>
      </div>
    </React.Fragment>
  );

  if (showCaption) {
    return CaptionWrapper(component);
  }

  return component;
};

export default LinkItem;
