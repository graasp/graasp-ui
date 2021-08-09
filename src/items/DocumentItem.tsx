import React, { FC } from 'react';
import { Record } from 'immutable';
import TextEditor from '../TextEditor';
import { getDocumentExtra } from '../utils/itemExtra';
import type { Item } from '../types';

interface DocumentItemProps {
  item: Record<Item>;
  id?: string;
  edit?: boolean;
  saveButtonId?: string;
  saveButtonText?: string;
  onSave: () => void;
}

const DocumentItem: FC<DocumentItemProps> = ({
  item,
  id,
  edit,
  onSave,
  saveButtonId,
  saveButtonText,
}) => (
  <TextEditor
    id={id}
    value={getDocumentExtra(item.get('extra'))?.content}
    edit={edit}
    onSave={onSave}
    saveButtonId={saveButtonId}
    saveButtonText={saveButtonText}
  />
);

export default DocumentItem;
