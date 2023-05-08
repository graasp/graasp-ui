import { Alert, Typography } from '@mui/material';

import React, { FC } from 'react';

import { DocumentItemType, getDocumentExtra } from '@graasp/sdk';
import { DocumentItemTypeRecord } from '@graasp/sdk/frontend';

import withCollapse from '../Collapse/withCollapse';
import TextEditor from '../TextEditor';

export type DocumentItemProps = {
  cancelButtonId?: string;
  cancelButtonText?: string;
  edit?: boolean;
  emptyMessage?: string;
  id?: string;
  maxHeight?: string | number;
  onCancel?: (text: string) => void;
  onChange?: (text: string) => void;
  onSave?: (text: string) => void;
  placeholderText?: string;
  saveButtonId?: string;
  saveButtonText?: string;
  showActions?: boolean;
  showEmpty?: boolean;
  styles?: React.CSSProperties;
} & (
  | { showCollapse: true; item: DocumentItemTypeRecord }
  | { showCollapse?: false; item: Pick<DocumentItemType, 'extra'> }
);

const DocumentItem: FC<DocumentItemProps> = ({
  cancelButtonId,
  cancelButtonText,
  edit,
  emptyMessage = 'This document is empty…',
  id,
  item,
  maxHeight,
  onCancel,
  onChange,
  onSave,
  placeholderText,
  saveButtonId,
  saveButtonText,
  showActions,
  showEmpty,
  showCollapse,
  styles,
}) => {
  let component: JSX.Element;
  const extra = getDocumentExtra(item.extra);

  const withFlavor = (textView: React.ReactElement): React.ReactElement => {
    return (
      <>
        {extra?.flavor ? (
          <Alert severity={extra.flavor}>{textView}</Alert>
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
    component = withFlavor(
      <TextEditor
        cancelButtonId={cancelButtonId}
        cancelButtonText={cancelButtonText}
        edit={edit}
        id={id}
        maxHeight={maxHeight}
        onCancel={onCancel}
        onChange={onChange}
        onSave={onSave}
        placeholderText={placeholderText}
        saveButtonId={saveButtonId}
        saveButtonText={saveButtonText}
        showActions={showActions}
        value={extra?.content}
        styles={
          // hack: if document is in read mode and has flavor, remove padding
          edit !== true && extra?.flavor
            ? {
                padding: 0,
                ...styles,
              }
            : undefined
        }
      />,
    );
  }

  if (showCollapse) {
    component = withCollapse({ itemName: item.name })(component);
  }

  return component;
};

export default DocumentItem;
