import { RecordOf } from 'immutable';

import React, { FC } from 'react';

import { Item } from '@graasp/sdk';

import TextEditor from '../TextEditor';
import type { DocumentItemExtra } from '../types';
import { getDocumentExtra } from '../utils/itemExtra';

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
}) => (
  <TextEditor
    id={id}
    value={getDocumentExtra(item.extra)?.content}
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

export default DocumentItem;
