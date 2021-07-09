import React from 'react';
import TextEditor from '../TextEditor';
import { getDocumentExtra } from '../utils/itemExtra';

const DocumentItem = ({
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
