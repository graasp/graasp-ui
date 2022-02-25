import React, { FC } from 'react';
import { Record } from 'immutable';
import TextEditor from '../TextEditor';
import { getDocumentExtra } from '../utils/itemExtra';
import type { DocumentItemExtra, Item } from '../types';

interface DocumentItemProps {
  item: Record<Item<DocumentItemExtra>>;
  id?: string;
  edit?: boolean;
  saveButtonId?: string;
  saveButtonText?: string;
  onSave: () => void;
  maxHeight?: string | number;
}

const DocumentItem: FC<DocumentItemProps> = ({
  item,
  id,
  edit,
  onSave,
  saveButtonId,
  saveButtonText,
  maxHeight,
}) => (
  <TextEditor
    id={id}
    value={getDocumentExtra(item.get('extra'))?.content}
    edit={edit}
    onSave={onSave}
    saveButtonId={saveButtonId}
    saveButtonText={saveButtonText}
    maxHeight={maxHeight}
  />
);

export default DocumentItem;
