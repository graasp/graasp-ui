import { RecordOf } from 'immutable';

import { Alert, Typography } from '@mui/material';

import React, { FC } from 'react';

import { DocumentItemType, getDocumentExtra } from '@graasp/sdk';

import TextEditor from '../TextEditor';

export interface DocumentItemProps {
  cancelButtonId?: string;
  cancelButtonText?: string;
  edit?: boolean;
  id?: string;
  item: RecordOf<DocumentItemType>;
  maxHeight?: string | number;
  onCancel?: (text: string) => void;
  onSave: (text: string) => void;
  saveButtonId?: string;
  saveButtonText?: string;
  /**
   * whether a message should be displayed if the text is empty
   */
  showEmpty?: boolean;
  emptyMessage?: string;
}

const DocumentItem: FC<DocumentItemProps> = ({
  cancelButtonId,
  cancelButtonText,
  edit,
  id,
  item,
  maxHeight,
  onCancel,
  onSave,
  saveButtonId,
  saveButtonText,
  showEmpty,
  emptyMessage = 'This document is empty…',
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
      id={id}
      value={extra?.content}
      edit={edit}
      onSave={onSave}
      onCancel={onCancel}
      saveButtonId={saveButtonId}
      saveButtonText={saveButtonText}
      maxHeight={maxHeight}
      cancelButtonText={cancelButtonText}
      cancelButtonId={cancelButtonId}
    />,
  );
};

export default DocumentItem;
