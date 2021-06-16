import React from 'react';
import TextEditor from '../TextEditor';
import { getDocumentExtra } from '../utils/itemExtra';

const DocumentItem = ({ item, id }) => (
  <TextEditor
    id={id}
    value={getDocumentExtra(item.get('extra'))?.content}
    readOnly
  />
);

export default DocumentItem;
