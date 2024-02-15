import { Alert, Typography } from '@mui/material';

import React, { FC } from 'react';

import { DocumentItemType, getDocumentExtra } from '@graasp/sdk';

import { TextDisplay } from '..';
import withCollapse from '../Collapse/withCollapse';

export type DocumentItemProps = {
  id?: string;
  emptyMessage?: string;
  showEmpty?: boolean;
} & (
  | { showCollapse: true; item: DocumentItemType }
  | { showCollapse?: false; item: Pick<DocumentItemType, 'extra'> }
);

const DocumentItem: FC<DocumentItemProps> = ({
  id,
  item,
  emptyMessage = 'This document is empty…',
  showEmpty,
  showCollapse,
}) => {
  let component: JSX.Element;
  const extra = getDocumentExtra(item.extra);

  const withFlavor = (textView: React.ReactElement): React.ReactElement => {
    return (
      <>
        {extra?.flavor ? (
          <Alert
            // TODO: fix this with the flavor PR
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            severity={extra.flavor}
          >
            {textView}
          </Alert>
        ) : (
          textView
        )}
      </>
    );
  };

  if (!extra?.content && showEmpty) {
    component = (
      <Typography
        variant='body2'
        sx={{ fontStyle: 'italic', color: 'lightgrey' }}
      >
        {emptyMessage}
      </Typography>
    );
  } else {
    component = withFlavor(<TextDisplay id={id} content={extra?.content} />);
  }

  if (showCollapse) {
    component = withCollapse({ item })(component);
  }

  return component;
};

export default DocumentItem;
