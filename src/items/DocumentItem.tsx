import React, { FC } from 'react';
import { RecordOf } from 'immutable';
import TextEditor from '../TextEditor';
import { getDocumentExtra } from '../utils/itemExtra';
import type { DocumentItemExtra, Item } from '../types';

interface DocumentItemProps {
  item: RecordOf<Item<DocumentItemExtra>>;
  id?: string;
  edit?: boolean;
  saveButtonId?: string;
  saveButtonText?: string;
  cancelButtonText?: string;
  cancelButtonId?: string;
  onSave: (text: string) => void;
  onCancel?: (text: string) => void;
  maxHeight?: string | number;
}

const DocumentItem: FC<DocumentItemProps> = ({
  item,
  id,
  edit,
  onSave,
  onCancel,
  saveButtonId,
  saveButtonText,
  cancelButtonText,
  cancelButtonId,
  maxHeight,
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
