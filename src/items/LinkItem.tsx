import React, { FC, useState, useRef, Fragment } from 'react';
import clsx from 'clsx';
import { RecordOf } from 'immutable';
import Alert from '@material-ui/lab/Alert';
import { redirect } from '@graasp/sdk';
import { makeStyles } from '@material-ui/core/styles';
import { getEmbeddedLinkExtra } from '../utils/itemExtra';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '../Button';
import withCaption from './withCaption';
import { ITEM_MAX_HEIGHT } from '../constants';
import type { EmbeddedLinkItemExtra, Item } from '../types';
import withResizing from './withResizing';

interface LinkItemProps {
  item: RecordOf<Item<EmbeddedLinkItemExtra>>;
  height?: number | string;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  saveButtonId?: string;
  loadingMessage?: string;
  openLinkMessage?: string;
  errorMessage?: string;
  isResizable?: boolean;
}

const useStyles = makeStyles((theme) => ({
  iframe: {
    width: '100%',
    border: 'none',
  },
  iframeWithoutResizer: {
    maxHeight: ITEM_MAX_HEIGHT,
    height: ITEM_MAX_HEIGHT,
  },
  linkButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(1),
  },
  iframeContainer: {
    position: 'relative',
    overflow: 'auto',
  },
  iframeContainerWithoutResizer: {
    maxHeight: ITEM_MAX_HEIGHT,
  },
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
  isResizable = false,
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight ?? '100%');
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

  const iframe = (
    <iframe
      id={id}
      className={clsx(classes.iframe, {
        [classes.iframeWithoutResizer]: !isResizable,
      })}
      title={name}
      src={url}
      onLoad={handleLoad}
      height='100%'
      ref={iframeRef}
    />
  );

  const component = (
    <Fragment>
      <div
        hidden={!isLoading}
        className={classes.iframeContainer}
        style={{ height: height }}
      >
        {loadingMessage}
      </div>
      <div
        hidden={isLoading}
        className={clsx(classes.iframeContainer, {
          [classes.iframeContainerWithoutResizer]: !isResizable,
        })}
      >
        {isResizable ? (
          <div>
            {withResizing({
              height,
            })(iframe)}
          </div>
        ) : (
          iframe
        )}
      </div>
      {isLoading && (
        <Button
          onClick={onClick}
          className={classes.linkButton}
          startIcon={<OpenInNewIcon />}
        >
          {openLinkMessage}
        </Button>
      )}
    </Fragment>
  );

  if (showCaption) {
    return CaptionWrapper(component);
  }

  return component;
};

export default React.memo(LinkItem);
