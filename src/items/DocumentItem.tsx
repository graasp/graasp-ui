import { RecordOf } from 'immutable';

import { Typography } from '@mui/material';

import React, { FC } from 'react';

import { DocumentItemExtra, Item, getDocumentExtra } from '@graasp/sdk';

import TextEditor from '../TextEditor';

export interface DocumentItemProps {
  cancelButtonId?: string;
  cancelButtonText?: string;
  edit?: boolean;
  id?: string;
  item: RecordOf<Item<DocumentItemExtra>>;
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
  const content = getDocumentExtra(item.extra)?.content;
  if (!content && showEmpty) {
    return (
      <Typography
        variant='body2'
        sx={{ fontStyle: 'italic', color: 'lightgrey' }}
      >
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <TextEditor
      id={id}
      value={content}
      edit={edit}
      onSave={onSave}
      onCancel={onCancel}
      saveButtonId={saveButtonId}
      saveButtonText={saveButtonText}
      maxHeight={maxHeight}
      cancelButtonText={cancelButtonText}
      cancelButtonId={cancelButtonId}
    />
  );
};

export default DocumentItem;
