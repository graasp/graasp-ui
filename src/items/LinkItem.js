import React, { useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { getEmbeddedLinkExtra } from '../utils/itemExtra';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import withCaption from './withCaption';
import {
  LINK_BUTTON_CONTAINER_BACKGROUND_COLOR,
  LINK_BUTTON_CONTAINER_HEIGHT,
  LINK_BUTTON_CONTAINER_WIDTH,
  LINK_BUTTON_ICON_COLOR,
  LINK_BUTTON_ICON_FONT_SIZE,
} from '../constants';

const useStyles = makeStyles((theme) => ({
  iframe: {
    width: '100%',
    border: 'none',
  },
  linkButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: LINK_BUTTON_CONTAINER_WIDTH,
    height: LINK_BUTTON_CONTAINER_HEIGHT,
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
  },
}));

const LinkItem = ({
  item,
  height,
  onSaveCaption,
  editCaption,
  showCaption,
  saveButtonId,
  loadingMessage,
  openLinkMessage,
}) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);

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

  const handleLoad = () => {
    setIsLoading(false);
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

LinkItem.defaultProps = {
  height: '100%',
  onSaveCaption: null,
  editCaption: false,
  showCaption: true,
  saveButtonId: null,
  loadingMessage: 'Link is Loading.',
  openLinkMessage: 'Click here to open link manually.',
};

export default LinkItem;
