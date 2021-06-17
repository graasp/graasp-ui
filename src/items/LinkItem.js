import React from 'react';
import { makeStyles } from '@material-ui/core';
import { getEmbeddedLinkExtra } from '../utils/itemExtra';
import withCaption from './withCaption';

const useStyles = makeStyles(() => ({
  iframe: {
    width: '100%',
    border: 'none',
  },
}));

const LinkItem = ({
  item,
  height,
  onSaveCaption,
  editCaption,
  showCaption,
}) => {
  const classes = useStyles();

  const id = item.get('id');
  const extra = getEmbeddedLinkExtra(item.get('extra'));

  const Wrapper = withCaption({
    item,
    onBlur: onSaveCaption,
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
      return Wrapper(component);
    }
    return component;
  }

  // default case is an iframe with given link
  const url = extra?.url;
  const name = item.get('name');

  const component = (
    <iframe
      id={id}
      className={classes.iframe}
      title={name}
      src={url}
      height={height}
    />
  );

  if (showCaption) {
    return Wrapper(component);
  }

  return component;
};

LinkItem.defaultProps = {
  height: '100%',
  onSaveCaption: null,
  editCaption: false,
  showCaption: true,
};

export default LinkItem;
