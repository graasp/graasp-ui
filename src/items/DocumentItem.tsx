import { RecordOf } from 'immutable';

import { Alert, Typography } from '@mui/material';

import React, { FC } from 'react';

import { DocumentItemType, getDocumentExtra } from '@graasp/sdk';

import TextEditor from '../TextEditor';

export interface DocumentItemProps {
  cancelButtonId?: string;
  cancelButtonText?: string;
  edit?: boolean;
  emptyMessage?: string;
  id?: string;
  item: Pick<RecordOf<DocumentItemType>, 'extra'>;
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
}

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
  styles,
}) => {
  const extra = getDocumentExtra(item.extra);
  if (!extra?.content && showEmpty) {
    return (
      <Typography
        variant='body2'
        sx={{ fontStyle: 'italic', color: 'lightgrey' }}
      >
        {emptyMessage}
      </Typography>
    );
  }

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

  return withFlavor(
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
        edit === true && extra?.flavor
          ? undefined
          : {
              padding: 0,
              ...styles,
            }
      }
    />,
  );
};

export default DocumentItem;
